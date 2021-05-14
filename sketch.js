var PLAY=1;
var END=0;
var gameState=1;
var sword,swordImage;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup,r;
var monster,monsterImage;
var score=0;
var gameOver,gameOverImage;
var knifeSwooshSound,gameover;

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameover = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(500,500);
 sword=createSprite(40,200,20,20); 
 sword.addImage(swordImage); 
 sword.scale= 0.7;

  
  fruitGroup = new Group();
  enemyGroup = new Group();


  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        //gameover sound
        gameover.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameOverImage);
        sword.scale=2;
        sword.x=250;
        sword.y=250;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  textSize(20);
  text("Score : "+ score,360,50);
}


function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    position = Math.round(random(1,2));
    if(position=1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));      
    }
    else
     {if(position=2){
      fruit.x=0;
      fruit.velocityX=-(7+(score/4));      
    }
       
     } 
    
     fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(500,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

 
