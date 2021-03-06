//Create variables here

var dog, happyDog;
var database;
var foodS;
var foodStock;
var dogImage, happyDogImage;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();

  createCanvas(800, 500);
  foodObject = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  dog = createSprite(700, 400, 150, 150);

  dog.addImage(dogImage);
  dog.scale = 0.25;

  feed = createButton("Feed The Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFoods = createButton("Add Food");
  addFoods.position(800, 95);
  addFoods.mousePressed(addFood);
}


function draw() {  
  background(46, 139, 87);

  currentTime = hour();
  foodObject.display();
  
  drawSprites();
  //add styles here

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM", 360, 30);
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 30);
  }
  else{
    text("Last Feed: " + lastFed + "AM", 350, 30);
  }
}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food : foodS,
  });
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObject.updateFoodStock(foodObject.getFoodStock() - 1);
  database.ref('/').update({
    Food : foodObject.getFoodStock(),
    FeedTime : hour(),
  });
}

function writeStock(x){
  fill("white");
  textSize(10);
  text("Drago Milks Left: " + x, 150, 150);

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x,
  });
}



