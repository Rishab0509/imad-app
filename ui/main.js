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
             var list = JSON.parse(xhttp.responseText);
             
             for(var i=0 ; i<list.length ; i++){
                 
                 inner+="<li>" + list[i] + "</li>";
                 
             }
             
             var ulist = document.getElementById("list");
             ulist.innerHTML = inner;
          }
      }
    };

    var name = document.getElementById('name');
    xhttp.open('GET', 'http://rshbbamrara.imad.hasura-app.io/submit/' + name , true);
    xhttp.send();
  
    
};