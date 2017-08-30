console.log('Loaded!');


var img = document.getElementById('madi');

var newlocation = 0;

var animate = function()
{
    newlocation += 1;
    img.style.marginLeft = newlocation + 'px';
};

img.onclick = function()
{
    setInterval(animate , 50);
};



// Counter Code

var button = document.getElementById('counter');

button.onclick = function()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      
      if(xhttp.readyState == 4)
      {
          if(xhttp.status == 200)
          {
              var counter = xhttp.responseText;
              var span = document.getElementById('span');
              span.innerHTML = counter;
          }
      }
    };


    xhttp.open('GET', 'http://rshbbamrara.imad.hasura-app.io/counter' , true);
    xhttp.send();
};


//Get value back

var Click = document.getElementById('submit');

Click.onclick = function(){
    
  var xhttp = new XMLHttpRequest();
  var inner = '';
    xhttp.onreadystatechange = function(){
      
      if(xhttp.readyState == 4)
      {
          if(xhttp.status == 200)
          {
             var list = xhttp.responseText;
             list = JSON.parse(list);
             
             for(var i=0 ; i<list.length ; i++){
                 
                 console.log(list[i]);
                 
                 inner+="<li>" + list[i].toString() + "</li>";
                 
             }
             
             var ulist = document.getElementById("list");
             ulist.innerHTML = inner;
          }
      }
    };

    var name = document.getElementById('name');
    nvalue = name.value;
    xhttp.open('GET', 'http://rshbbamrara.imad.hasura-app.io/submit/' + nvalue , true);
    xhttp.send();
  
};

//Login Page

window.onload = function(){
    var login = document.getElementById('log');
    console.log("yeah");
    
    login.onclick = function(){
        
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function(){
          
          if(xhttp.readyState == 4)
          {
              if(xhttp.status == 200)
              {
                      alert("user logged in successfully!!");
              }
              else
              {
                  alert("oooo.....");
              }
                 
          }
        };
    
        var name = document.getElementById('username').value;
        var passwd = document.getElementById('password').value;
        console.log(name);
        console.log(passwd);
        xhttp.open('POST', 'http://rshbbamrara.imad.hasura-app.io/login', true);
        xhttp.setRequestHeader('Content-Type' , 'application/json');
        xhttp.send(JSON.stringify({username : name , password : passwd}));
        
    };

};