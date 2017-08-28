var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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


app.get('/:article' , function(req,res) {
    
   var article_name = req.params.article ;
   res.send(createTemplate(articles.article_name));
   
});


/*app.get('/article-one' , function(req,res){
   
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
    
});

app.get('/article-two' , function(req,res){
   
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
    
});

app.get('/article-three' , function(req,res){
   
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
    
});*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
