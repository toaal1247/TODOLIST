
var backgroundTag = document.getElementById("background");

var imgArray=['0.jpg','1.jpg','2.jpg','3.jpg','4.jpg'];
//var imgArray=['2.jpg','4.jpg'];
var arrayNum = Math.floor(Math.random()*imgArray.length); //Math.floor: 소수점 이하 버림, Math.random: 0~1사이의 값을 뽑는다
backgroundTag.style.backgroundImage = "url('"+imgArray[arrayNum]+"')";

