$(document).ready(function () {
    setTimeout('$("#container").css("opacity", 1)', 1000);
    // Prevents running this script more than once
    if($('#descTable').length<1){
        bodyLoad();
    }
})

var imgArray = ["images/toronto.jpg",
"images/colloseum.jpg",
"images/sanFrancisco.jpg",
"images/tajMahal.jpg",
"images/japan.jpg"];
var descArray = ["Toronto, ON, Canada",
"Colloseum, Rome, Italy",
"San Francisco, CA, USA",
"Taj Mahal, Agra, India",
"Golden Temple, Kyoto, Japan"];
var urlArray = ["https://www.tripadvisor.ca/Home-g155019",
"https://www.tripadvisor.ca/Attraction_Review-g187791-d192285-Reviews-Colosseum-Rome_Lazio.html",
"https://www.tripadvisor.ca/Home-g60713?fid=8db55262-7f28-4147-933a-292323397350",
"https://www.tripadvisor.ca/Attraction_Review-g297683-d317329-Reviews-Taj_Mahal-Agra_Agra_District_Uttar_Pradesh.html",
"https://www.tripadvisor.ca/Attraction_Review-g298564-d321400-Reviews-Kinkakuji_Temple-Kyoto_Kyoto_Prefecture_Kinki.html"];



function bodyLoad() {
    populateDescTable();
    bouncingImgPath="images/bouncing_earth.png";
    checkImage(bouncingImgPath,function(){startBouncingImage(bouncingImgPath)},function(){});
}

function checkImage(imageSrc, loadedFunc, errorFunc) {
    var img = new Image();
    img.onload = loadedFunc; 
    img.onerror = errorFunc;
    img.src = imageSrc;
}

function startBouncingImage(path) {
    var mainBody = document.getElementsByTagName("main")[0];
    var imageNode = document.createElement("img");
    imageNode.src = path;
    imageNode.id = "bouncingImg";

    var imgWidth = 100;
    var windowHeight = $(document).height();
    var windowWidth = $(document).width();
    // alert(windowHeight);
    imageNode.style.maxWidth = imgWidth + "px";
    imageNode.style.position = "absolute";
    var pxi =Math.floor(Math.random() * (windowHeight / 2));
    var pyi = Math.floor(Math.random() * (windowWidth - imgWidth));
    imageNode.style.top = pxi + "px";
    imageNode.style.left = pyi + "px";
    var speed = 20;
    var randomAngle = Math.random()*2*Math.PI;
    var vxi = Math.floor(speed*Math.cos(randomAngle));
    var vyi = Math.floor(speed*Math.sin(randomAngle));
    var image={node:imageNode, px:pxi, py:pyi, vx: vxi, vy:vyi, width:imgWidth}
    imageNode.addEventListener("mouseover",function(){mouseOverBouncingImg(image)},false);
    mainBody.appendChild(imageNode);
    moveBouncingImage(image);
}

function mouseOverBouncingImg(image){
    var windowHeight = $(document).height();
    var windowWidth = $(document).width();
    image.px=Math.floor(Math.random() * (windowHeight-10));
    image.py=Math.floor(Math.random() * (windowWidth - image.width-10));
    image.node.style.top = image.px + "px";
    image.node.style.left = image.py + "px";
}

function moveBouncingImage(image) {
    // imageNode.addEventListener("click",function(){alert(this.height)},false);
    var windowHeight = $(document).height();
    var windowWidth = $(document).width();
    var imgWidth = image.node.width;
    var imgHeight = image.node.height;
    if (image.px < 0 || image.px > (windowWidth - imgWidth - image.vx)) {
        image.vx = -image.vx;
    }
    if (image.py < 0 || image.py > (windowHeight - imgHeight - image.vy)) {
        image.vy = -image.vy;
    }
    image.px = image.px + image.vx;
    image.py = image.py + image.vy;
    image.node.style.left = image.px + "px";
    image.node.style.top = image.py + "px";
    setTimeout(function(){moveBouncingImage(image)},20);
}

// Loads all the descriptions
function populateDescTable() {
    var section = document.getElementById("travelImageSection");
    // Create empty table with 2 column formatting and header, give it an id we can reference
    var table = document.createElement("table");
    table.id = "descTable";
    table.className += "col-2"
    table.innerHTML = "<th class = \"pt-3 pl-1 pr-1\"><h2>Destinations</h2></th>";
    // Create empty div to hold image, give it an id we can reference
    var imageDiv = document.createElement("div");
    imageDiv.id = "imageDiv";
    imageDiv.className += "col";
    // Add both table and div to section holding travel images
    section.appendChild(table);
    section.appendChild(imageDiv);
    // Add random image as default image (so website doesnt look empty on open)
    var randomInt = Math.floor(Math.random() * imgArray.length);
    imageDiv.innerHTML = "<img src =" + imgArray[randomInt] + " class=\"col mx-auto index-image pointer-cursor\" onclick=\"openURL(" + randomInt + ")\")>";
    // Build the table
    for (i = 0; i < descArray.length; i++) {
        populateDescTableItem(descArray[i], i);
    }
}

// Loads each description individually and applies appropriate styling
function populateDescTableItem(description, index) {
    // Create all elements to populate table
    var table = document.getElementById("descTable");
    var trNode = document.createElement("tr");
    var tdNode = document.createElement("td");
    var textNode = document.createTextNode(description);
    var pNode = document.createElement("p");
    // Format paragraph element
    pNode.style.padding = "5px";
    pNode.style.backgroundColor = "#1d3557";
    // pNode.style.border = "2px solid #1d3557";
    pNode.style.borderRadius = "10px";
    pNode.className += "centered";
    pNode.style.verticalAlign = "middle";
    pNode.style.fontSize = "20px";
    pNode.style.fontWeight = "700";

    // Add mouseover and mouseclick events
    trNode.addEventListener("mouseover", function () {
        showImg(index)
    }, false);
    trNode.addEventListener("click", function () {
        openURL(index)
    }, false);
    // trNode.addEventListener("mouseout",function(){hideImg()},false);

    // Style table row
    tdNode.className += "m-xs-2 m-md-3 m-lg-4";
    trNode.style.textAlign = "center";
    trNode.className += "justify-center pointer-cursor";
    trNode.style.verticalAlign = "middle";
    trNode.style.display = "flex";
    trNode.style.alignItems = "center";
    trNode.style.borderTop = "3px solid #F1FAEE";
    trNode.bgColor = "#1d3557";
    // Adds desc to text node, text to p, p to cell, cell to row, and row to table
    pNode.appendChild(textNode);
    tdNode.append(pNode);
    trNode.appendChild(tdNode);
    table.appendChild(trNode);
}

// Mouseover event to show description for image
function showImg(index) {
    var divNode = document.getElementById("imageDiv");
    divNode.innerHTML = "<img src =" + imgArray[index] + " class=\"col mx-auto index-image pointer-cursor\" onclick=\"openURL(" + index + ")\")>";
}

// Mouseout event to delete description
function hideImg() {
    // Checks that the p element exists before deleting it
    document.getElementById("imageDiv").innerHTML = "";
}

function openURL(index) {
    var myWindow = window.open(urlArray[index], "myWindow");
    // Close after 10 seconds
    setTimeout(function () {
        myWindow.close()
    }, 10000);
}