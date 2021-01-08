var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions=[];
var divisionHeight=300;
var score =0;
var turn=0;
var particle;
var gameState ="start";
function setup() {

  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);
  

  for(var k=0 ; k<=width ; k=k+80 ){
    divisions.push(new Divisions (k,height-divisionHeight/2,10,divisionHeight));
  }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko (j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(30);
  fill ("red");
  text("Score: "+score,620,30)
  fill("white");
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);
  Engine.update(engine);
  
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
     particles.push(new Particle(random(width+80, width+30), 10,10));
     
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   if(turn>=5){
    textSize(60)
    fill ("red")
        text("GameOver",300,450)
    gameState="end";
  }
   if(particle!=null){
    particle.display();

    if(particle.body.position.y > 750){
      if(particle.body.position.y > 100 && particle.body.position.x < 300){
        score=score+500;
        particle=null;
        if(turn>=5) gameState="end";
      }
      else if(particle.body.position.x < 600 && particle.body.position.x > 300){
        score=score+100;
        particle=null;
        if(turn>=5) gameState="end";
      
      }
      else if(particle.body.position.x < 800 && particle.body.position.x > 600){
        score=score+200;
        particle=null;
        if(turn>=5) gameState="end";
      }
      
    }
    
   }

   ground.display();
}

function mousePressed(){
  if(gameState!=="end"){
    turn++;
    particle=new Particle(mouseX,10,10,10);
  }

}