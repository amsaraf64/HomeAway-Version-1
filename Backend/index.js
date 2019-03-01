//import the require dependencies
var express = require('express');
var app = express();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

var pool = mysql.createPool(
{
    connectionLimit :" 100",
    port : '3306' ,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'homeaway_db'
}
)

module.exports = pool;

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {

      const newFilename = `${file.originalname}`;
      cb(null, newFilename);
    },
  });
  
  const upload = multer({ storage });


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
 


//Bcrypt
app.post('/login',function(req,res){
   
    console.log("Inside Login Post Request");
        var emailid = req.body.emailid;
        var password = req.body.password;
       
        console.log("emailid " + emailid + " "  + "password " + password);


        var sql = "SELECT *  FROM homeaway_usertable WHERE emailid = " + 
                mysql.escape(emailid) ;

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    if(result[0].password)
                    {
                        bcrypt.compare(req.body.password, result[0].password, function(err, results) {
                            console.log('Entered password ', password)
                            console.log('Password in db ', result[0].password)
                            if(results) {
                                res.cookie('cookie', emailid, {maxAge: 900000, httpOnly: false, path : '/'});
                                req.session.user = result;
                                    res.writeHead(200,{
                                        'Content-Type' : 'text/plain'
                                    })
                                 return res.send();
                            }
                            else {
                                 return res.status(400).send();
                            }
                          })
                    }
                    
                }
            });
        }
    });
    
}); 


//signup
app.post('/signup',function(req,res){
    console.log("Inside Create Request Handler");
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(req.body.password, salt);
    var count_sql ="SELECT COUNT(1) AS cnt FROM homeaway_usertable where emailid = " + mysql.escape(req.body.emailid)
    var insert_sql = "INSERT INTO `homeaway_usertable`(`emailid`, `password`, `firstname`, `lastname`, `usertype`) VALUES ( " + 
    mysql.escape(req.body.emailid) + " , " + mysql.escape(hashedpassword) + " , "+
    mysql.escape(req.body.firstname) + ", "  + mysql.escape(req.body.lastname) + " , "+
    mysql.escape(req.body.usertype) + ")";
       
       pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(count_sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    if(result[0].cnt==0){
                        con.query(insert_sql,function(err,insertresult){
                            if(err){
                                res.writeHead(400,{
                                    'Content-Type' : 'text/plain'
                                })
                                res.end("Could Not Get Connection Object");   
                            }else{
                                res.writeHead(200,{
                                    'Content-Type' : 'application/json'
                                })
                                res.end(JSON.stringify(insertresult));
                        }
                        
                    });
                }
                else {
                    res.writeHead(202,{
                        'Content-Type' : 'application/json'
                    })
                    res.end("Email already exists! Please use another");         
                }
            
        }
        })
        }
        })
});

//update profile
app.post('/updateprofile',function(req,res){
    console.log("Inside Profile Update")

    console.log("Inside Update Profile Request");
        var emailid = req.body.emailid;
        var aboutme = req.body.aboutme;
        var citycountry = req.body.citycountry;
        var company = req.body.company;
        var hometown = req.body.hometown;
        var school = req.body.school;
        var languages = req.body.languages;
        var gender = req.body.gender;
        var profilepic = req.body.profilepic;

        console.log("aboutme " + aboutme);
        console.log("citycountry " + citycountry);
        console.log("company " + company);
        console.log("hometown " + hometown);
        console.log("school " + school);
        console.log("languages " + languages);
        console.log("gender " + gender);
        console.log("profilpic " + profilepic);

        var sql = "UPDATE homeaway_usertable SET aboutme = " + 
                mysql.escape(aboutme) + " ,citycountry = "  + 
                mysql.escape(citycountry) + " ,company = "  + 
                mysql.escape(company) + " ,hometown = "  + 
                mysql.escape(hometown) + " ,languages = "  + 
                mysql.escape(languages) + " ,school = "  + 
                mysql.escape(school) + " ,gender = "  + 
                mysql.escape(gender) +  " ,profilepic = "  + 
                mysql.escape(profilepic) + 
                " WHERE emailid = " + "'" + emailid + "'";

                console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error While Updating Profile");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end('Profile updated Successfully');
                }
                });
            }
            });
});

//Get Profile
app.get('/getProfile/:emailid', function(req,res){
    console.log("Get Profile of user" + req.params.emailid )
    var emailid = req.params.emailid;
    var sql = "SELECT * FROM homeaway_usertable WHERE emailid =  '"
    + emailid + "'";
    console.log(sql)
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

//Get Location

app.get('/getAddress/:oemailid', function(req,res){
    console.log("Inside Get Address");
    console.log(req.params.oemailid);
    var sql = "SELECT address FROM homeaway_propertytable WHERE oemailid = " + req.params.oemailid;
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(result);
                    res.end(result);
                }
            });
        }
    })
    
})

//Insert Location details - address in the db 

 app.post('/addProperty',function(req,res){
     console.log("Inside add property")
    console.log(req.body.oemailid);  
    console.log(req.body.address)  
    console.log(req.body.headline)  
    console.log(req.body.type)  
    console.log(req.body.description)  
    console.log(req.body.bedroom)  
    console.log(req.body.accomodate)  
    console.log(req.body.bathroom) 
    console.log(req.body.images) 
    console.log(req.body.startdate)  
    console.log(req.body.enddate)  
    console.log(req.body.baserate)  



        var sql = "INSERT INTO homeaway_propertytable(oemailid,address,headline,type,description,bedroom,accomodates,bathroom,startdate,enddate,baserate,picturelist) VALUES ( " + 
        mysql.escape(req.body.oemailid) + " , " + 
        mysql.escape(req.body.address) + " , " + 
        mysql.escape(req.body.headline) + " , " + 
        mysql.escape(req.body.type) + " , " + 
        mysql.escape(req.body.description) + " , " + 
        mysql.escape(req.body.bedroom) + " , " + 
        mysql.escape(req.body.accomodate) + " , " + 
        mysql.escape(req.body.bathroom) + " , " + 
        mysql.escape(req.body.startdate) + " , " + 
        mysql.escape(req.body.enddate) + " , " + 
        mysql.escape(req.body.baserate)  + " , " + 
        mysql.escape(req.body.images)  + 
        " ) ";    
    

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error While Updating Profile");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end('Property added Successfully');
                }
                });
            }
            });
}); 

app.post('/searchproperties', function(req,res){
    console.log("Inside search");
    console.log(req.body.destination);
    var sql = "SELECT * FROM homeaway_propertytable WHERE address = " + 
    mysql.escape(req.body.destination) + " AND startdate <=" + 
    mysql.escape(req.body.start_date) + " AND enddate >= " + 
    mysql.escape(req.body.end_date) + " AND accomodates >= "+ 
    mysql.escape(req.body.accomodates);

    console.log(sql);
    
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})


//Fetch property details
app.get('/fetchpropertydetails/:pid', function(req,res){
    console.log("Inside fetch property details");
    console.log(req.params.pid);
    var sql = "SELECT * FROM homeaway_propertytable WHERE pid = "
                + mysql.escape(req.params.pid) ;
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

app.post('/addBooking',function(req,res){

    console.log("Inside Add Booking Request");
    console.log(req.body.pid);  
    console.log(req.body.temailid);
    console.log(req.body.oemailid);   
    console.log(req.body.start_date);  
    console.log(req.body.end_date);  
    console.log(req.body.accomodates);  


        var sql = "INSERT INTO homeaway_bookingtable(pid,oemailid,temailid,startdate,enddate,accomodates) VALUES ( " + 
        mysql.escape(req.body.pid) + " , " + 
        mysql.escape(req.body.oemailid) + " , " + 
        mysql.escape(req.body.temailid) + " , " + 
        mysql.escape(req.body.start_date) + " , " + 
        mysql.escape(req.body.end_date) + " , " + 
        mysql.escape(req.body.accomodates) + ")";  
    
        console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error While adding booking");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end('Booking added Successfully');
                }
                });
            }
            });
}); 

//Upload property photos
app.post('/photos', upload.array('selectedFile'), (req, res) => {
    var images = 'images';
    images =  req.files[0].filename;
    for(let i=1 ; i < req.files.length  ; i++)
    {
        console.log("Req : ", req.files[i].filename);
        images = images + "," + req.files[i].filename; 
    }
        
    res.end(images);

});


//Fetch photos

app.post('/download/:file(*)',(req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads',file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(base64img);
  });


  //Fetch my trips
  app.get('/getmytrips/:temailid', function(req,res){
      console.log("Get trips")
    var temailid = req.params.temailid;
    var sql = "SELECT * FROM homeaway_bookingtable INNER JOIN homeaway_propertytable ON homeaway_bookingtable.pid = homeaway_propertytable.pid  WHERE homeaway_bookingtable.temailid =  '"
    + temailid + "'";
    console.log(sql)
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(JSON.stringify(result))
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})


//Get owner dashbord
app.get('/getownerdashboard/:oemailid', function(req,res){
    console.log("Inside Get Owner Dashboard")
    var oemailid = req.params.oemailid;
    console.log(oemailid);
    var sql = "SELECT * FROM homeaway_bookingtable INNER JOIN homeaway_propertytable ON homeaway_bookingtable.pid = homeaway_propertytable.pid  WHERE homeaway_bookingtable.oemailid =  '"
    + oemailid + "'";
    console.log("d" + sql)
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(JSON.stringify(result))
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})

//Owner 
app.get('/getusertype/:emailid', function(req,res){
    console.log("Inside Get User Type");
    console.log(req.params.emailid);
    var sql = "SELECT usertype FROM homeaway_usertable WHERE emailid = "
                + mysql.escape(req.params.emailid) ;
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    })
    
})


//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");