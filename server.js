var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');
var session = require('express-session');

var config = {
    
    user : 'rshbbamrara',
    database : 'rshbbamrara',
    host : 'db.imad.hasura-app.io',
    port :'5432',
    password : process.env.DB_PASSWORD
};

var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(session ({
    
    secret : "SomeRandomValue",
    cookie : {maxAge : 1000*30*60*24*30}
}));

var hash = function(secretvalue , salt){
   var hashedvalue = crypto.pbkdf2Sync(secretvalue,salt,10000,512,'sha512');
   
   return ["pbkdf2" , "10000" , salt , hashedvalue.toString('hex')].join("$");
    
} ;


app.post('/login' , function(req,res){
   
   var username = req.body.username;
   var password = req.body.password;
    
    pool.query('SELECT * FROM userinfo WHERE username = $1' , [username] , function(err,data){
        
        if(err){
           res.status(500).send(err.toString());
       }
       
       else
       {
           if(data.rows.length === 0)
           {
               console.log("No user found");
           }
           
           else
           {
               var dbstring = data.rows[0].password;
               
               var salt = dbstring.split('$')[2];
               
               var hashedpasswd = hash(password , salt);
               
               if(hashedpasswd === dbstring){
                   
                   req.session.auth = {userId : result.rows[0].id};
                   
                   res.send("Credentials correct...");
               }
               else{
                   res.status(403).send('invalid usename/password');
               }
               
           }
       }
       
    });
    
});


app.get('/check' , function(req,res)
{
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send("You are successfully logged in");
    }
    else{
        res.send("You are logged off...");
    }
    
});

app.post('/create-user' , function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbvalue = hash(password , salt);
    
    pool.query('INSERT INTO userinfo (username,password) VALUES ($1,$2)' , [username,dbvalue] , function(err,data){
        
        if(err){
           res.status(500).send(err.toString());
       }
       
       else
       {
           res.send("User created successfully...");
       }
       
    });
});


/*

This is no longer needed cause we have copied everything in the database......

var articles = {
    
    'article-one' : {
        
        title : 'This is Article one' ,
        heading : ' This is Article One', 
        date : '28 Aug 2017' , 
        para : ` <p> This is very first paragraph <br/> Please like it</p>
                <p> This is the second paragraph <br/> Make sure to like it as well
                </p>`
    } ,
    
    'article-two' : {
        
        title : 'This is Article two' ,
        heading : ' This is Article Two', 
        date : '28 Aug 2017' , 
        para : ` <p> This is very first paragraph <br/> Please like it</p>
                <p> This is the second paragraph <br/> Make sure to like it as well
                </p>`
    } ,
    
    'article-three' : {
        
        title : 'This is Article three' ,
        heading : ' This is Article Three', 
        date : '28 Aug 2017' , 
        para : ` <p> This is very first paragraph <br/> Please like it</p>
                <p> This is the second paragraph <br/> Make sure to like it as well
                </p>`
    }
    
};

*/

var createTemplate = function(data){

    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var para = data.para;
    
    var template = 
     `<html>
        <head> 
          <title> 
            ${title}
          </title> 
          <meta name='viewport' content="width = device-width , initial-scale =1 " />
          <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
            <div class = "container">
                <div>
                    <h1>${heading}</h1>
                </div>
                <hr/>
                <div>
                    ${date}
                </div>
                <div>
                    ${para}
                </div>
            </div>    
        </body>
        
    </html>`;

    return template;
} ;   


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/test/:articlename' , function(req,res){
    
    pool.query("SELECT * FROM article WHERE name = '" + req.params.articlename + "'" ,  function(err,result){
       
       if(err){
           res.status(500).send(err.toString());
       }
       
       else
       {
           res.send(createTemplate(result.rows[0]));
       }
        
    });
    
});


var counter = 0;
app.get('/counter' , function(req,res){
   
   counter +=1;
   res.send(counter.toString());
});


var list = [];

app.get('/submit/:name' , function(req,res){
    
    var myname = req.params.name;
    
    list.push(myname);
    res.send(JSON.stringify(list));
    res.end();
});




app.get('/:article' , function(req,res) {
    
   var article_name = req.params.article ;
   res.send(createTemplate(articles[article_name]));
   res.end();
   
});


/*
NOT REQUIRED ANYMORE!!!! HAHAHAHAHHA

app.get('/article-one' , function(req,res){
   
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
    
});

app.get('/article-two' , function(req,res){
   
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
    
});

app.get('/article-three' , function(req,res){
   
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
    
});


*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
