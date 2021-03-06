var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score = 0
function preload(){

  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
banana_img = loadImage("banana.png")
stone_img = loadImage("stone.png")

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  backgr.depth = -1
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup = new Group()
  stoneGroup = new Group()
}

function draw() { 
  background(0);
  textSize(10)
  fill(255)
text(score,700,30)
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnRock()
    spawnFood()
  }
if(stoneGroup.isTouching(player)){
  gameState = END
}
if(gameState === END){
backgr.velocityX = 0
player.visible = false

foodGroup.destroyEach()
stoneGroup.destroyEach()


}
  if(player.isTouching(foodGroup)){
  foodGroup.destroyEach()
  score = score + 2
  player.scale = player.scale + 0.1
}
drawSprites();
textSize(10)
fill(255)
text(score,700,30)
if(gameState === END){
  textSize(30)
fill(0)
text("Game Over!!!",300,220)
}

}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(800,250,40,10)
    banana.y = random(120,200)
    banana.addImage(banana_img)
    banana.scale = 0.05
    banana.velocityX = -4

    banana.lifetime = 300
   player.depth = banana.depth + 1
   foodGroup.add(banana)
  }
}
function spawnRock(){
  if(frameCount % 100 === 0){
    var rock = createSprite(600,325,40,10)
  rock.x = random(800,825)
  rock.addImage(stone_img)
  rock.scale = 0.1
  rock.velocityX = -4

  rock.lifetime = 300
   player.depth = rock.depth + 1
   stoneGroup.add(rock)
  }
}
