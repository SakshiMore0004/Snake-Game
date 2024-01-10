// constants and variables
let inputDir = {x: 0, y: 0}
const musicSound = new Audio("Sound/bgMusic.mp3")
const foodSound = new Audio("Sound/EatingFood.mp3")
const overSound = new Audio("Sound/GameOver.mp3")
const turnSound = new Audio("Sound/Turn.mp3")
let lastPaintTime = 0;
let score = 0;
let speed = 9;
let snakeArr = [               //snake is array
    {x: 13, y: 15}
]
let food = {x:2, y:5}              //food is object


//Functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < (1/speed)){          //it will change after 0.5 sec
        return;
    }
    lastPaintTime = ctime;
    gameEngine()
}

function isCollide(snake){
    //if u bump into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if u bump into wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    // part1: update snake array and food
    if(isCollide(snakeArr)){
        overSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over, press any key to play again!");
        snakeArr = [               //snake is array
            {x: 13, y: 15}
        ]
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score " + score;
    }
    //if you eat the food then increment the score and change food position
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y}) //The unshift() method adds new elements to the beginning of an array. The unshift() method overwrites the original array.
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    for(let i = snakeArr.length-2; i>=0; i--){
          snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2: display snake and food
    //display snake
    board.innerHTML = "";                                 //previsous snake is removed
    snakeArr.forEach((ele, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//main logic starts here
window.requestAnimationFrame(main);          //You should call this method whenever you are ready to update your animation onscreen 
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1};          //game started
    musicSound.play();
    turnSound.play();

    switch(e.key){
        case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x = 0;
        inputDir.y = -1;
        break;

        case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x = -1;
        inputDir.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    default:
        break;
    }
});