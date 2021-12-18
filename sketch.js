var END = 0
var gameState = END;
var gameState = "play"; 


var cow, cowDead
var backGround

var invisibleGround

var fruitGroup, fruit1, fruit2, fruit3, fruit4;
var hayGroup, hay1, hay2, hay3, hay4;

var jumpSound, checkpointSound;
var score=0;
var gameOver, restart;

//preload
function preload(){
cow_walk = loadAnimation("cow1.png","cow2.png");
cow_dead = loadAnimation("cowDead.png");

backGroundImg = loadImage("farmHouse.jpg");

fruit1 = loadImage("apple.png");
fruit2 = loadImage("pear.png");
fruit3 = loadImage("peach.png");
fruit4 = loadImage("plum.png");

hay1 = loadImage("hay1.png");
hay2 = loadImage("hay2.png");
hay3 = loadImage("hay3.png");
hay4 = loadImage("hay4.png");

cowSound = loadSound("cow_sound.mp3");
backgroundMusic = loadSound("backgroundmusic.mp3");
endMusic = loadSound("sadmusic.mp3");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

//setup
function setup(){
    createCanvas(windowWidth,windowHeight);

      backgroundMusic.play(); 

    
    backGround = createSprite(width/2+300,height/2+30,width,2);
    backGround.addImage(backGroundImg);
    backGround.velocityX = -(6 + 3*score/100);
    backGround.x = backGround.width /2;

    backGround.scale = 2.7;

   

    cow = createSprite(90,height-200,20,50);

    cow.addAnimation("walking",cow_walk);
    cow.addAnimation("dead",cow_dead);
    cow.scale = 0.3;

    invisibleGround = createSprite(width/2,height-80,width,10);
    invisibleGround.visible = false;
    


    gameOver = createSprite(width/2+10,height/2-120);
    gameOver.addImage(gameOverImg);

    restart = createSprite(width/2+5,height/2-50);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.15;

    fruitGroup = new Group();
    hayGroup = new Group()

    cow.setCollider("circle",0,0,50);
    //cow.debug = true;
    

    score = 0;
}

//draw
function draw(){

    gameState = "play"
    background("#62caf9");

    textSize(34);
    stroke("black")
    fill("#f7ee8d")
    text("Score: "+ score, width/2-70,40);

    if (backGround.x < 500){
        backGround.x = width/2+290,height/2+30,width,10
      }

     
    if(gameState === "play"){

      endMusic.stop();
        backGround.visible = true;

        gameOver.visible = false;
        restart.visible = false;

        score = score + Math.round(getFrameRate()/60);
        backGround.velocityX = -(6 + 3*score/100);

        if(touches.length>0 || (keyDown("space") && cow.y >= height-110)) {
            touches=[]
            cow.velocityY = -17.5;
          }

          if(keyDown("space")){
            cowSound.play(0.6);
        }

        if(keyDown("space")){
            cowSound.play(0.6);
        }
        
          cow.velocityY = cow.velocityY + 0.8
          cow.velocityX = 0

          cow.collide(invisibleGround);

          spawnFruits();
          spawnHay();

          
        }

        if(fruitGroup.isTouching(cow)){
            score = score +0.5;
            fruitGroup.visible = false;
        }

        if(hayGroup.isTouching(cow)){
            gameState = END;}

    if (gameState === END) {

       

        gameOver.visible = true;
        restart.visible = true;

        backGround.velocityX = 0;
        cow.velocityY = 0;
        hayGroup.setVelocityXEach(0);
        fruitGroup.setVelocityXEach(0);
        
        cow.changeAnimation("dead",cow_dead);
        
       
        hayGroup.setLifetimeEach(-1);
        fruitGroup.setLifetimeEach(-1);
        
        backgroundMusic.stop();
        endMusic.play();

        if(mousePressedOver(restart)) {
          reset();
        }

        
      }

    drawSprites();
}

function spawnFruits(){

    if(frameCount % 250 === 0) {
        var fruit = createSprite(width/2,120,height/2+390,10);
    fruit.y = Math.round(random(height/2+160,height/2+175));
    fruit.x = Math.round(random(50,width/2+50));

    fruit.velocityX = -(2 + 3*score/100)
   
        
  
        var rand = Math.round(random(1,4));
        switch(rand) {
          case 1: fruit.addImage(fruit1);
                  break;
          case 2: fruit.addImage(fruit2);
                  break;
          case 3: fruit.addImage(fruit3);
                  break;
          case 4: fruit.addImage(fruit4);
                  break;
          default: break;
        }
        
        
        fruit.scale = 0.15;
        fruit.lifetime = 300;
    
        fruitGroup.add(fruit);
}
}

function spawnHay(){

    if(frameCount % 105 === 0) {
        var hay = createSprite(width/2+360,height-109,10,40);
        //obstacle.debug = true;
        hay.velocityX = -(6 + 3*score/100);
        
        //generate random obstacles
        var rand = Math.round(random(1,4));
        switch(rand) {
          case 1: hay.addImage(hay1);
                  break;
          case 2: hay.addImage(hay2);
                  break;
          case 3: hay.addImage(hay3);
                  break;
          case 4: hay.addImage(hay4);
                  break;
          default: break;
        }
        
        
        hay.scale = 0.22;
        hay.lifetime = 350;

        hayGroup.add(hay);

    }

}
  

function reset(){
  endMusic.stop();
  backgroundMusic.play();

    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
  
    hayGroup.destroyEach();
    fruitGroup.destroyEach();
  
   cow.changeAnimation("walking",cow_walk)
   score = 0;
}