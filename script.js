let inputDir={x:0,y:0};
let foodSound=new Audio('food.mp3')
let gameOver=new Audio('end.mp3')
let move=new Audio('moveSound.mp3')
let game=new Audio('sound.mp3')
let speed=10
let score=0
let lastPaintTime=0
let snakeArr=[{x:12,y:8}]
food={x:7,y:10}


//game function
function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
            return
    }
    lastPaintTime=ctime;
    gameEngine()
}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
            return true;
        }
    }
    if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0){
            return true
        }
        
    
}
function gameEngine(){
    //update nake
    if(isCollide(snakeArr)){
        gameOver.play();
        game.pause();
        inputDir={x:0,y:0}
        alert("game over ")
        snakeArr=[{x:12,y:8}]
        game.play();
        score=0;
    }

    //if you eat
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score +=1;
        if(score>HighVal){
            HighVal=score;
            localStorage.setItem("highScore:",JSON.stringify(HighVal))
            highScoreBox.innerHTML="highScore:"+HighVal;
        }
        scoreBox.innerHTML=("score:"+score)
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}

    }

    //moving snake
    for (let i = snakeArr.length-2; i >=0; i--){
        // const element = array[i];
        snakeArr[i+1]={...snakeArr[i]}
       
    }
    snakeArr[0].x +=inputDir.x
    snakeArr[0].y +=inputDir.y



    //display snake 
        let board=document.querySelector('.board')
         board.innerHTML=""
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div')
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        // snakeElement.classList.add('snake')
        if(index===0){
            snakeElement.classList.add('head')
        }else{
        snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)   

    });
    //display food
        foodElement=document.createElement('div')
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement)
}













//game logic
let highScore=localStorage.getItem("highScore");
if(highScore===null){
    HighVal=0;
    localStorage.setItem("highScore:",JSON.stringify(HighVal))
}else{
    HighVal=JSON.parse(highScore)
    highScoreBox.innerHTML="highScore:"+highScore;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e=>{
    inputDir={x:0,y:1}
    move.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x=0;
                inputDir.y=1;
                break;
        case "ArrowLeft":
                    console.log("ArrowLeft");
                    inputDir.x=-1;
                    inputDir.y=0;
                    break;
        case "ArrowRight":
                        console.log("ArrowRight");
                        inputDir.x=1;
                        inputDir.y=0;
                        break;
        default:
            break;
            
    }
})
