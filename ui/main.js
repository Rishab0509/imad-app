console.log('Loaded!');


var img = document.getElementById('madi');

var marginLeft = 0;

var animate = function()
{
    newlocation += 1;
    img.css.marginLeft = marginLeft + 'px';
};

img.onclick = function()
{
    setInterval(animate , 50);
};