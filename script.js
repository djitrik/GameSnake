const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let dir; // Директория для клавиш

let food0 = new Image(); // Загрузка еды
let food1 = new Image(); // Загрузка еды
let food2 = new Image(); // Загрузка еды
let food3 = new Image(); // Загрузка еды
let arrFood = [food0, food1, food2, food3];
let foodNumber = Math.floor(Math.random() * 4);
food0.src="food0.png";     // Загрузка еды
food1.src="food1.png";     // Загрузка еды
food2.src="food2.png";     // Загрузка еды
food3.src="food3.png";     // Загрузка еды

let box = 64; // Размерность клетки
let score = 0; //Количество очков

let snake = [];   // Туловище змейки (вроде)
snake[0] = {      // Туловище змейки (вроде)
    x: (0 * box), // Туловище змейки (вроде)
    y: (1 * box)  // Туловище змейки (вроде)
};

let snakeX = snake[0].x;  // Голова змейки (вроде)
let snakeY = snake[0].y;  // Голова змейки (вроде)

let newHead = {     // Еще одна голова змейки (вроде)
    x: snakeX,      // Еще одна голова змейки (вроде)
    y: snakeY       // Еще одна голова змейки (вроде)
};                  // Еще одна голова змейки (вроде)

let food = {        //Еда
  x: (1*box)+16,    //Еда
  y: (2*box)+16     //Еда
};                  //Еда

canvas.width = 4 * box;     // Размер поля
canvas.height = 5 * box;    // Размер поля

let LVLdown = 0;    //Уровни (для увеличения поля)
let LVLup = 1;      //Уровни (для увеличения поля)

let canvaswidth = canvas.width/64;      //Переменная для размера поля 
let canvasheight = canvas.height/64;    //Переменная для размера поля 

document.addEventListener("keydown",direction);

drawPole (1); //Отрисовка начального поля
////drawGame(1);  //Отрисовка начального поля




function direction(event){                              //Нажатие клавиш
   // console.log("1_direction");
    if(event.keyCode == 37 && dir != "right" ){
        dir = "left";
       // moovSnake(1);
       // drawGame (1);
        //eatTail(newHead, snake);
       // testArr(snake);
    }
    else if(event.keyCode == 38 && dir != "down"){
        dir = "up"; 
        //moovSnake(1);
       // drawGame (1);
        //eatTail(newHead, snake);
       // testArr(snake);
    } 
    else if(event.keyCode == 39 && dir != "left"){
        dir = "right";  
       // moovSnake(1);
       // drawGame (1);
       // eatTail(newHead, snake);
       // testArr(snake);
    } 
    else if(event.keyCode == 40 && dir != "up"){
        dir = "down";  
       // moovSnake(1);
      //  drawGame (1);
       // eatTail(newHead, snake);
       // testArr(snake);
    }
    else if(event.keyCode == 32){
        newXYforLVLup(snake);
    }

}

function moovSnake(){ 
                         //Движение змеи
    if(dir == "left"){ 
        snakeX -= box;
      //  drawSnake(1);
        }
        if(dir == "right"){ 
        snakeX += box;
       // drawSnake(1);
        }
        if(dir == "up") {
        snakeY -= box;
        //drawSnake(1);
        }
        if(dir == "down"){ 
        snakeY += box;
       // drawSnake(1);
        }
        newHead = {
            x: snakeX,
            y: snakeY
        };    
        snake.unshift(newHead);

        if(snakeX == food.x-16 && snakeY == food.y-16){
            score++;  
            foodCreate(snake);
            
        }else{snake.pop();
        } 

}




function drawSnake(){                               //Отрисовка Змеи
    //console.log("2_drawSnake");
 
    eatTail(newHead, snake);
   

    if(snakeX < 0){
        newHead.x = box * (canvaswidth-1);
        snakeX = box * (canvaswidth-1);
       // drawSnake(1);
          
    }
    if(snakeX > box * (canvaswidth-1)){
        newHead.x = 0;
        snakeX = 0;
        //drawSnake(1);
         
    }
    if(snakeY > box * (canvasheight-1)){
        newHead.y = box * 1;
        snakeY = box * 1;
       // drawSnake(1);
        
    }
    if(snakeY < box  * 1){
        newHead.y = box * (canvasheight-1);
        snakeY = box * (canvasheight-1);
       // drawSnake(1);
                
    }

}

function foodCreate (arrk){
    //console.log("3_foodCreate");
 
    if(score == Math.pow(canvaswidth, 2)-5){
        LVLup = LVLup + 2;
        LVL(1);
    };

    for(let n = 0; n < arrk.length; n++ ) { 
        if (food.x-16 == arrk[n].x && food.y-16 == arrk[n].y ||
        food.x-16 == snakeX && food.y-16 == snakeY){      
            food = {
                x: Math.floor(Math.random() * canvaswidth) * box + 16,
                y: Math.floor(Math.random() * (canvasheight - 1) + 1) * box + 16 
            };
            foodNumber = Math.floor(Math.random() * 4);
             console.log("ЖОПА");
            foodCreate(snake);     
            break;
        }
    };
}
                
function LVL (){                                    // Повышения уровня
   // console.log("4_LVL");
    if (LVLdown < LVLup){   
    LVLdown = LVLup;
    canvas.width = 3 * box + box * LVLdown;
    canvas.height = 4 * box + box * LVLdown;
    canvaswidth = canvas.width/box;
    canvasheight = canvas.height/box;
    newXYforLVLup(snake); 
    drawPole (1);
    
    } 
};

function drawPole (){                            //Отрисовка контура поля
    for(let i = 0; i <= canvasheight; i++){
        ctx.beginPath();
        
        ctx.strokeStyle = 'black';
        ctx.moveTo(i*64, 64); 
        ctx.lineTo(i*64, canvasheight*64);
        ctx.moveTo(0, i*64); 
        ctx.lineTo(canvasheight*64, i*64); 
        ctx.lineWidth = 4;
        ctx.stroke();   
    }

}



function drawGame(){   
    //console.log("5_drawGame");
                     
 
    for(let i = 0; i <= canvaswidth; i++){          //Отрисовка внутренних клеток для обновления поля
        for(let y = 0; y <= canvasheight; y++){
            ctx.beginPath();
            ctx.moveTo(i*box-20, y*box-40);
            ctx.lineTo(i*box-44, y*box-40);
            ctx.lineTo(i*box-44, y*box-24);
            ctx.lineTo(i*box-24, y*box-24);
            ctx.lineTo(i*box-24, y*box-56);
            ctx.lineWidth = 32;
            ctx.fill();
            ctx.strokeStyle = '#a8abff';  
            ctx.stroke();
        }
    }

    for(let i = 0; i < snake.length; i++){
        ctx.beginPath();
        ctx.fillStyle = i == 0 ? "#a8ffab" : "#7bfbe8";
        ctx.fillRect(snake[i].x+8, snake[i].y+8, box-16, box-16);
        ctx.stroke();
    };

    
    ctx.drawImage(arrFood[foodNumber], food.x, food.y);  //Отрисовка еды------------------
     
        
        ctx.clearRect(8, 8, canvaswidth * box, 50);  //Отрисовка количества очков
        ctx.fillStyle = "black";                     //Отрисовка количества очков
        ctx.font = "48px Arial";                     //Отрисовка количества очков
        ctx.fillText(score, box-64+16, box-16);      //Отрисовка количества очков
}

function eatTail(head, arr){                    //Проверка "съела ли себя змея"
   // console.log("6_eatTail");
    for(let i = 3; i < arr.length; i++ ) {
        if(head.x == arr[i].x && head.y == arr[i].y){
            delete snake[0];
            newHead.x = 0;
            newHead.y = box * 2;
            snakeX = 0;
            snakeY = 0;     
            canvas.width = 3 * box;
            canvas.height = 4 * box; 
            canvaswidth = canvas.width/64;
            canvasheight = canvas.height/64;
            food ={
                x: (1*box)+16,
                y: (2*box)+16
            };
            LVLdown = 0;
            LVLup = 1;
            snake.length = 0;
            score = 0;
            LVL(1);
           // drawSnake(1);
           // drawGame(1);            
        }
    }
}
function newXYforLVLup(arrS){               //Смещает всю змею при повышении уровня
    for (let i = 0; i < arrS.length; i++){
        arrS[i].x = arrS[i].x + 64; 
        arrS[i].y = arrS[i].y + 64;
        console.log(arrS[i].x, arrS[i].y, "Snake");
    };
    snakeX = snakeX + 64;
    snakeY = snakeY + 64;
   
    
   //drawGame(1);
   //drawSnake(1);
};


let PlayGame0 = setInterval(drawSnake, );
let PlayGame1 = setInterval(moovSnake, 300);
let PlayGame2 = setInterval(drawGame, );

