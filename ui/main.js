console.log('Loaded!');


var img = document.getElementById('madi');

var newlocation = 0;

var animate = function()
{
    newlocation += 1;
    img.css.marginLeft = newlocation + 'px';
};

img.onclick = function()
{
    setInterval(animate , 50);
};