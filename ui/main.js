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

var button = document.getElementById('click');

button.onclick = function()
{
    xhttp.onreadystatechange = function(){
      
      if(xhttp.readyState == 4)
      {
          if(xhttp.status == 200)
          {
              var counter = xhttp.responseText;
              var span = document.getElementById('span');
              span.innerHtml = counter;
          }
      }
    };
}

xhttp.open('GET' , 'http://rshbbamrara.imad.hasura-app.io/counter' , true);
xhttp.send();