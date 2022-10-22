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
    y: (0 * box)  // Туловище змейки (вроде)
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
let gameInt1 = setInterval(drawSnake);
let gameInt3 = setInterval(moovSnake, [600-LVLup]);
let gameInt2 = setInterval(drawGame);

createUser(1);

let scoreKolichestvo = 1;
let scoreProshloe = 0;
let scoreAll = [0];

let leaderBoard = [];
leaderBoard[0] = {
    name,
    score
};

let nameUser = leaderBoard[0].name;
let scoreUser = leaderBoard[0].score;

let newUser = {
    "name": nameUser,
    "score": scoreUser
};

let thisIsNewUser = true;


//leaderBoard.pop()
dialogLeaderBoard.close();

let aa = 0;







function loadResult(){

    if (localStorage.getItem(`aa`) == NaN || localStorage.getItem(`aa`) == null){aa = 0}else{aa = parseInt(localStorage.getItem(`aa`));};
  
  for(let r = 0; r < aa; r++ ){
    
  }

   if (aa > 0){
    for(let r = 0; r < aa; r++ ){

       
    let labelReset = document.getElementById(`top${r+1}`);
   
    let brrbr =  document.getElementById(`brrb${r+1}`);
    if (labelReset != null){
    labelReset.remove(); //Мы можем использовать необязательный оператор цепочки (?.) для вызова remove(), чтобы избежать возникновения ошибки, если нет элемента DOM с идентификатором.
    brrbr.remove();
    }
    };
   };


    for (let i = 0; i < aa; i++){  
        // nameUser = 
        // scoreUser = ;
        
              
            newUser = {
                "name": localStorage.getItem(`name ${i}`),
                "score": parseInt(localStorage.getItem(`score ${i}`))
            };
            leaderBoard.unshift(newUser);            
       
        
    let label = document.createElement('label');
    let br =  document.createElement('br');
    label.setAttribute('id', `top${i+1}`);
    let content = document.createTextNode(`${i+1}:${localStorage.getItem(`name ${parseInt(localStorage.getItem(`aa`))-i-1}`)}:${localStorage.getItem(`score ${parseInt(localStorage.getItem(`aa`))-i-1}`)}`);
    
    
    let top1 = document.getElementById('top0');
    let br1 = document.getElementById('top0');
    label.setAttribute('id', `top${i+1}`);
    br.setAttribute('id', `brrb${i+1}`);
    label.appendChild(content);
    
    br1.parentNode.appendChild(br);
    top1.parentNode.appendChild(label);
    console.log(leaderBoard);
    
    
    
    
    }
    
}

function direction(event){                              //Нажатие клавиш
   // console.log("1_direction");
    if((event.keyCode == 65 || event.keyCode == 37) && dir != "right"  ){dir = "left";
    }else if((event.keyCode == 87 || event.keyCode == 38) && dir != "down" ){dir = "up"; 
    }else if((event.keyCode == 68 || event.keyCode == 39) && dir != "left" ){dir = "right";  
    }else if((event.keyCode == 83 || event.keyCode == 40) && dir != "up" ){dir = "down";  
    }else if(event.keyCode == 13){
        buttonNewGame.onclick();
        button.onclick();
    }else if(event.keyCode == 27){localStorage.clear();}  
}
function moovSnake(){ //Движение змеи                    
    if(dir == "left"){snakeX -= box;}
    if(dir == "right"){snakeX += box;}
    if(dir == "up") {snakeY -= box;}
    if(dir == "down"){snakeY += box;}
    
    newHead = {
        x: snakeX,
        y: snakeY
    };  
    
    snake.unshift(newHead);
   
    if(snakeX < 0){
        newHead.x = box * (canvaswidth-1);
        snakeX = box * (canvaswidth-1);     
    }
    if(snakeX > box * (canvaswidth-1)){
        newHead.x = 0;
        snakeX = 0;    
    }
    if(snakeY > box * (canvasheight-1)){
        newHead.y = box * 1;
        snakeY = box * 1;       
    }
    if(snakeY < box  * 1){
        newHead.y = box * (canvasheight-1);
        snakeY = box * (canvasheight-1);                    
    }
    if(snakeX == food.x-16 && snakeY == food.y-16){
        score++;  
        foodCreate(snake);     
    }else{snake.pop();
    } 
}
function drawSnake(){                               //Отрисовка Змеи
    //console.log("2_drawSnake");
 
    gameOver(newHead, snake);

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
             //console.log("ЖОПА");
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
    clearInterval(gameInt3);  
    gameInt3 = setInterval(moovSnake, [400-LVLup*17]);
    
    
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
    document.getElementById('labelScoreProshloe').innerHTML = `Прошлый результат: ${scoreProshloe}`;
    document.getElementById('labelScoreKolichestvo').innerHTML = `Количество попыток: ${scoreKolichestvo}`; 
    document.getElementById('labelScoreMax').innerHTML = `Максимум очков: ${scoreAll[(scoreAll.length-1)]}`; 
                  
 
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

    for(let i = 0; i < snake.length; i++){ //отрисовка змеи
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
function gameOver(head, arr){  
                    //Проверка "съела ли себя змея"
   // console.log("6_eatTail");
    for(let i = 1; i < arr.length; i++ ) {
        if(head.x == arr[i].x && head.y == arr[i].y){
            let check = 0;
            check++;
            for(let i = 0; i < leaderBoard.length; i++){
               
               
                localStorage.clear(`name ${i}`);
                localStorage.clear(`score ${i}`);
            };
            
            
            localStorage.clear('aa'); 


            scoreProshloe = score;
            scoreKolichestvo++;
            scoreAll.unshift(scoreProshloe);
            scoreAll.sort(function(a, b) {return a - b;});
            canvas.width = 0;
            delete snake[0];
            
            newHead.x = 0;
            newHead.y = box * 2;
            snakeX = 0;
            snakeY = 0;     
            canvaswidth = canvas.width/64;
            canvasheight = canvas.height/64;
            food ={
                x: (1*box)+16,
                y: (2*box)+16
            };
            dir = "";
            LVLdown = 0;
            LVLup = 1;
            snake.length = 0;
            score = 0;
            LVL(1); 
            clearInterval(gameInt1);
            clearInterval(gameInt2);
            clearInterval(gameInt3); 
            if (inputNewGame.value == 'Ника'){
                dialog.show();
                nikaMath (1);
            }else{newGame(1);}; 
            scoreMax = scoreAll[(scoreAll.length-1)];
           
           
            scoreUser = scoreMax;
            if(check = 1){
                let proverka = 0;
                proverka++;
            console.log('proverka',proverka)
            if(thisIsNewUser == true){
                newUser = {
                    "name": nameUser,
                    "score": scoreUser
                };
                
             console.log(nameUser);
             let ujeest = 0;
            for(let i = 0; i < leaderBoard.length; i++){
                if (newUser.name == leaderBoard[i].name){
                    ujeest++
                    break; 
                };
                console.log(`${i}`,leaderBoard[i].name);

            };
            if (ujeest == 0){leaderBoard.unshift(newUser); }


              
            };
           
            




            leaderBoard = leaderBoard.filter(function (el) {
                return (el.name != null && el.name != "" || el.name === 0);   
         });
        

       
         for(let i = 0; i < leaderBoard.length; i++){
             for(let y = 0; y < leaderBoard.length; y++){
              if(leaderBoard[i].score < leaderBoard[y].score){
                 let peremenaScore = leaderBoard[i].score;
                 let peremenaUser = leaderBoard[i].name;
                 leaderBoard[i].score = leaderBoard[y].score;
                 leaderBoard[i].name = leaderBoard[y].name;
                 leaderBoard[y].score = peremenaScore;
                 leaderBoard[y].name = peremenaUser;
              }
            
         }
         }
         console.log(leaderBoard);


            for (let i = 0; i < leaderBoard.length; i++){
                if(leaderBoard[i].name == inputNewGame.value){leaderBoard[i].score = scoreMax;};
                
            };
        
           
           
            for (let b = 0; b < leaderBoard.length; b++){
                
                
                localStorage.setItem(`name ${b}`,leaderBoard[b].name);
                localStorage.setItem(`score ${b}`,leaderBoard[b].score);
                //console.log(`name ${b}`,localStorage.getItem(`name ${b}`,leaderBoard[b].name));
            };
           
            localStorage.setItem(`aa`, leaderBoard.length);
            aa = leaderBoard.length;
           
             delete leaderBoard[0];
             leaderBoard.length = 0;
            //console.log('gameOver: leaderBoard.length',leaderBoard.length);
            loadResult(1)
          
            
        };
    };
}
  
    
  
};
function newXYforLVLup(arrS){               //Смещает всю змею при повышении уровня
    for (let i = 0; i < arrS.length; i++){
        arrS[i].x = arrS[i].x + 64; 
        arrS[i].y = arrS[i].y + 64;
       // console.log(arrS[i].x, arrS[i].y, "Snake");
    };
    snakeX = snakeX + 64;
    snakeY = snakeY + 64;
   
    
   //drawGame(1);
   //drawSnake(1);
};
function nikaMath (){
dialog.show();
canvas.width = 0;  
nikaA = Math.floor(Math.random() * 10 + 1);
nikaB = Math.floor(Math.random() * 10 + 1);
nikaC = nikaA + nikaB;
document.getElementById('label').innerHTML = `${nikaA} + ${nikaB} =` ;
    button.onclick = function(){
        if (input.value != ""){
            if (parseInt(input.value) === nikaC){
                newGame (1); 
                input.value = '';
                dialog.close();
            }else{
                document.getElementById('label2').innerHTML = `Неверно, давай еще раз.` ;
                input.value = '';
            };
        };
    
    };
};
function newGame (){
    delete snake[0];
    newHead.x = 0;
    newHead.y = 0;
    snakeX = 0;
    snakeY = 0;     
    canvas.width = 4 * box;
    canvas.height = 5 * box; 
    canvaswidth = canvas.width/64;
    canvasheight = canvas.height/64;
    food ={
        x: (1*box)+16,
        y: (2*box)+16
    };  
    dir = "";
    LVLdown = 0;
    LVLup = 1;
    snake.length = 0;
    score = 0;
    LVL(1);
    snake[0] = {      // Туловище змейки (вроде)
        x: (0 * box), // Туловище змейки (вроде)
        y: (0 * box)  // Туловище змейки (вроде)
    };
 
    gameInt1 = setInterval(drawSnake); 
    gameInt2 = setInterval(drawGame);
    dialogPlayer.show(); 
    dialogLeaderBoard.show(); 
 };
 function createUser(){
    dialogNewGame.show();
    dialogLeaderBoard.show();
    document.getElementById('labelNewGame').innerHTML = ``;
    document.getElementById('hh2').innerHTML = `Введи свое имя`;
    buttonNewGame.onclick = function(){ 

        if (inputNewGame.value != ''){
           // loadResult(1)
            nameUser = inputNewGame.value;
           // newGame (1);
            document.getElementById('labelPlayer').innerHTML = `Игрок: ${inputNewGame.value}`;
            dialogNewGame.close();
        };
        for (let i = 0; i < parseInt(localStorage.getItem('aa')); i++){
            if (inputNewGame.value == localStorage.getItem(`name ${i}`)){
                
                scoreMax = localStorage.getItem(`score ${i}`);
                scoreAll.unshift(scoreMax);
                
                thisIsNewUser = false;
            }else{scoreMax = 0;}
        };
    };

};