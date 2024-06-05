//getting element
const wallboard =document.getElementById('wallboard');
const context = wallboard.getContext('2d');

// scroe card setting
const scoreDot = document.getElementById('scoreVal')
//this methods are using to automatically occupy actual size in program
const Width=wallboard.width;
const Height=wallboard.height;
const UNIT = 25;

//random calculating value food
let food1;
let food2;
//snake speed
let xVel=25;
let yVel=0;
// adding score or initial score
let score=0;
//gameover logic 
let active=true;
//initail start
let started=false;

//creating a snake intial structure 
let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0},
];

//setting a arrow button for this game
window.addEventListener('keydown',keypress)

StartGame();

function StartGame(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,Width,Height)
     createFood();
     displayFood();
     drawsnake();
    // moveSnake();
    // clearBoard();
    nextTick();
}

// setting the time for snake movement
function clearBoard(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,Width,Height)
}
//creating a food option
function createFood(){
    food1=Math.floor(Math.random()*Width/UNIT)*UNIT;
    food2=Math.floor(Math.random()*Height/UNIT)*UNIT;
}
function displayFood(){
    context.fillStyle='red';
    context.fillRect(food1,food2,UNIT,UNIT);
}
//draw a snake body
function drawsnake(){
    context.fillStyle='limegreen';
    context.strokestyle='#212121';
    snake.forEach((snakeBody) => {
       context.fillRect(snakeBody.x,snakeBody.y,UNIT,UNIT);
       context.strokeRect(snakeBody.x,snakeBody.y,UNIT,UNIT);
    })
}
//snake moves algorithm
function moveSnake(){
  const head ={x:snake[0].x+xVel,y:snake[0].y+yVel}
  snake.unshift(head)

  if(snake[0].x==food1 && snake[0].y==food2){
    score += 1;
    scoreDot.textContent=score;
    createFood();
  }
  else
  snake.pop();
}                              

// Setting the time
function nextTick() {
  if(active){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawsnake();
        checkGameover();
        nextTick();
    },300);
  }
  else{
    clearBoard();
    context.font="bold 70px serif";
    context.fillStyle='white';
    context.textAlign="center";
    context.fillText('GameOver....',Width/2,Height/2);
  }
}

//giving some condition for moving arrow from using switch case
function keypress(e){
    if(!started){
        started=true;
    }
    const UP=38;
    const DOWN=40;
    const LEFT=37;
    const RIGHT=39;

    switch(true){
        case(e.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        case(e.keyCode==DOWN && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT;
            break;
        case(e.keyCode==LEFT && xVel!=UNIT):
            xVel=-UNIT;
            yVel=0;
            break;
        case(e.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;       
    }
}
// Game over
function checkGameover(){
switch(true){
    case(snake[0].x<0):
    case(snake[0].x>=Width):
    case(snake[0].y<0):
    case(snake[0].y>Height):
    active=false;
    break;
 }
}


