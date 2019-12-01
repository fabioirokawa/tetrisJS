let canvas;
let ctx;
let gBArrayHeight = 20; // Number of cells in array height
let gBArrayWidth = 12; // Number of cells in array width

let startXP1 = 4; // Starting X position for Tetromino
let startYP1 = 0; // Starting Y position for Tetromino
let startXP2 = 4; // Starting X position for Tetromino
let startYP2 = 0; // Starting Y position for Tetromino
let scoreP1 = 0; // Tracks the scoreP1
let scoreP2 = 0; // Tracks the scoreP1
let levelP1 = 1; // Tracks current levelP1
let levelP2 = 1; // Tracks current levelP2
let winOrLoseP1 = "Playing";
let winOrLoseP2 = "Playing";
let player1 = 1;
let player2 = 2;
let specialP1 = 0;
let specialP2 = 0;
let powerDownP1 = 0;
let powerDownP2 = 0;

// Used as a look up table where each value in the array
// contains the x & y position we can use to draw the
// box on the canvas
let coordinateArrayP1 = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));
let coordinateArrayP2 = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

let curTetrominoP1 = [[1,0], [0,1], [1,1], [2,1]];
let curTetrominoP2 = [[1,0], [0,1], [1,1], [2,1]];

// 3. Will hold all the Tetrominos 
let tetrominos = [];
// 3. The tetromino array with the colors matched to the tetrominos array
let tetrominoColors = ['purple','cyan','blue','yellow','orange','green','red', 'black'];
// 3. Holds current Tetromino color
let curTetrominoP1Color;
let curTetrominoP2Color;

// 4. Create gameboard array so we know where other squares are
let gameBoardArrayP1 = [...Array(20)].map(e => Array(12).fill(0));
let gameBoardArrayP2 = [...Array(20)].map(e => Array(12).fill(0));

// 6. Array for storing stopped shapes
// It will hold colors when a shape stops and is added
let stoppedShapeArrayP1 = [...Array(20)].map(e => Array(12).fill(0));
let stoppedShapeArrayP2 = [...Array(20)].map(e => Array(12).fill(0));

// 4. Created to track the direction I'm moving the Tetromino
// so that I can stop trying to move through walls
let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
let direction;

class Coordinates{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// Execute SetupCanvas when page loads
document.addEventListener('DOMContentLoaded', SetupCanvas); 

// Creates the array with square coordinates [Lookup Table]
// [0,0] Pixels X: 11 Y: 9, [1,0] Pixels X: 34 Y: 9, ...
function CreateCoordArray(){
    let xR = 0, yR = 19;
    let i = 0, j = 0;
    for(let y = 9; y <= 446; y += 23){
        // 12 * 23 = 276 - 12 = 264 Max X value
        for(let x = 11; x <= 264; x += 23){
            coordinateArrayP1[i][j] = new Coordinates(x,y);
            coordinateArrayP2[i][j] = new Coordinates(x+468,y);
            // console.log(i + ":" + j + " = " + coordinateArrayP1[i][j].x + ":" + coordinateArrayP1[i][j].y);
            i++;
        }
        j++;
        i = 0;
    }
}

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 800;
    
    ctx.scale(1, 1);

    // Draw Canvas background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    RefreshPlayer(player1);
    RefreshPlayer(player2);
    
    // 2. Handle keyboard presses
    document.addEventListener('keydown', HandleKeyPress);

    // 3. Create the array of Tetromino arrays
    CreateTetrominos();
    // 3. Generate random Tetromino
    CreateTetromino(1,0);
    CreateTetromino(2,0);

    // Create the rectangle lookup table
    CreateCoordArray();

    DrawTetrominoP2();
    DrawTetrominoP1(specialP1);
}

function RefreshPlayer(player){
    // Double the size of elements to fit the screen
    let increment = 0;
    if (player === 2){
        increment = 468;
    }
    
    
    // Draw gameboard rectangle
    ctx.strokeStyle = 'black';
    ctx.strokeRect(8 + increment, 8, 280, 462);

    tetrisLogo = new Image(161, 54);
    tetrisLogo.onload = DrawTetrisLogo;
    tetrisLogo.src = "tetrislogo.png";

    // Set font for scoreP1 label text and draw
    ctx.fillStyle = 'black';
    ctx.font = '21px Arial';

    ctx.fillText("scoreP1", 300, 98);
    // Draw scoreP1 rectangle
    ctx.strokeRect(300 , 107, 161, 24);
    // Draw scoreP1
    ctx.fillText(scoreP1.toString(), 310, 127);    
    // Draw levelP1 label text
    ctx.fillText("levelP1", 300, 157);
    // Draw levelP1 rectangle
    ctx.strokeRect(300, 171, 161, 24);
    // Draw levelP1
    ctx.fillText(levelP1.toString(), 310, 190);


    ctx.fillText("scoreP2", 768, 98);
    // Draw scoreP2 rectangle
    ctx.strokeRect(768, 107, 161, 24);
    // Draw scoreP2
    ctx.fillText(scoreP2.toString(), 778, 127);    
    // Draw levelP2 label text
    ctx.fillText("levelP2", 768, 157);
    // Draw levelP2 rectangle
    ctx.strokeRect(768, 171, 161, 24);
    // Draw levelP2
    ctx.fillText(levelP2.toString(), 778, 190);


    // Draw next label text
    ctx.fillText("WIN / LOSE", 300 + increment, 221);

    // Draw playing condition
    ctx.fillText(winOrLoseP1, 310 + increment, 261);

    // Draw playing condition rectangle
    ctx.strokeRect(300 + increment, 232, 161, 95);
    
    // Draw controls label text
    ctx.fillText("CONTROLS", 300 + increment, 354);

    // Draw controls rectangle
    ctx.strokeRect(300 + increment, 366, 161, 104);

    // Draw controls text
    ctx.font = '19px Arial';
    ctx.fillText("A : Move Left", 310 + increment, 388);
    ctx.fillText("D : Move Right", 310 + increment, 413);
    ctx.fillText("S : Move Down", 310 + increment, 438);
    ctx.fillText("E : Rotate Right", 310 + increment, 463);
}



function DrawTetrisLogo(){
    ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
}

function DrawTetrominoP1(especial){
    tetrisLogo2 = new Image(21, 21);
    tetrisLogo2.src = "tetrislogo2.png";
    // Cycle through the x & y array for the tetromino looking
    // for all the places a square would be drawn
    for(let i = 0; i < curTetrominoP1.length; i++){
        // Move the Tetromino x & y values to the tetromino
        // shows in the middle of the gameboard
        let x = curTetrominoP1[i][0] + startXP1;
        let y = curTetrominoP1[i][1] + startYP1;

        // 4. Put Tetromino shape in the gameboard array
        gameBoardArrayP1[x][y] = 1;
        // console.log("Put 1 at [" + x + "," + y + "]");

        // Look for the x & y values in the lookup table
        let coorX = coordinateArrayP1[x][y].x;
        let coorY = coordinateArrayP1[x][y].y;

        // console.log("X : " + x + " Y : " + y);
        // console.log("Rect X : " + coordinateArrayP1[x][y].x + " Rect Y : " + coordinateArrayP1[x][y].y);

        // 1. Draw a square at the x & y coordinates that the lookup
        // table provides
        ctx.fillStyle = curTetrominoP1Color;
        if(especial === 1 && curTetrominoP1[i][0]===1 && curTetrominoP1[i][1] === 1)
            ctx.drawImage(tetrisLogo2, coorX, coorY, 21, 21);
        else
            ctx.fillRect(coorX, coorY, 21, 21);
    }
}

function DrawTetrominoP2(){
    // Cycle through the x & y array for the tetromino looking
    // for all the places a square would be drawn
    for(let i = 0; i < curTetrominoP2.length; i++){
        // Move the Tetromino x & y values to the tetromino
        // shows in the middle of the gameboard
        let x = curTetrominoP2[i][0] + startXP2;
        let y = curTetrominoP2[i][1] + startYP2;

        // 4. Put Tetromino shape in the gameboard array
        gameBoardArrayP2[x][y] = 1;
        // console.log("Put 1 at [" + x + "," + y + "]");

        // Look for the x & y values in the lookup table
        let coorX = coordinateArrayP2[x][y].x;
        let coorY = coordinateArrayP2[x][y].y;

        // console.log("X : " + x + " Y : " + y);
        // console.log("Rect X : " + coordinateArrayP1[x][y].x + " Rect Y : " + coordinateArrayP1[x][y].y);

        // 1. Draw a square at the x & y coordinates that the lookup
        // table provides
        ctx.fillStyle = curTetrominoP2Color;
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

// ----- 2. Move & Delete Old Tetrimino -----
// Each time a key is pressed we change the either the starting
// x or y value for where we want to draw the new Tetromino
// We also delete the previously drawn shape and draw the new one
function HandleKeyPress(key){
    var edgeP1 = 10;
    var edgeP2 = 10;
    if(curTetrominoP1Color === 'cyan'){
        edgeP1--;
    }
    if(curTetrominoP2Color === 'cyan'){
        edgeP2--;
    }

    if(winOrLoseP1 != "Game Over"){
        // a keycode (LEFT)
        if(key.keyCode === 65){
            // 4. Check if I'll hit the wall
            direction = DIRECTION.LEFT;
            if(!HittingTheWall(curTetrominoP1, 1) && !CheckForHorizontalCollision(curTetrominoP1, 1)){
                DeleteTetromino(1);
                startXP1--;
                DrawTetrominoP1(specialP1);
            } 

        // d keycode (RIGHT)
        } else if(key.keyCode === 68){

            // 4. Check if I'll hit the wall
            direction = DIRECTION.RIGHT;
            if(!HittingTheWall(curTetrominoP1, 1) && !CheckForHorizontalCollision(curTetrominoP1, 1)){
                DeleteTetromino(1);
                startXP1++;
                DrawTetrominoP1(specialP1);
            }

        // s keycode (DOWN)
        } else if(key.keyCode === 83){
            MoveTetrominoDown(1);
            // 9. e keycode calls for rotation of Tetromino
        } else if(key.keyCode === 69 && startXP1 < edgeP1){
            RotateTetromino(curTetrominoP1, 1);
        }
    }

    if(winOrLoseP2 != "Game Over"){
        // a keycode (LEFT)
        if(key.keyCode === 37){
            // 4. Check if I'll hit the wall
            direction = DIRECTION.LEFT;
            if(!HittingTheWall(curTetrominoP2, 2) && !CheckForHorizontalCollision(curTetrominoP2, 2)){
                DeleteTetromino(2);
                startXP2--;
                DrawTetrominoP2();
            } 
        
        // d keycode (RIGHT)
        } else if(key.keyCode === 39){
            
            // 4. Check if I'll hit the wall
            direction = DIRECTION.RIGHT;
            if(!HittingTheWall(curTetrominoP2, 2) && !CheckForHorizontalCollision(curTetrominoP2, 2)){
                DeleteTetromino(2);
                startXP2++;
                DrawTetrominoP2();
            }
        
        // s keycode (DOWN)
        } else if(key.keyCode === 40){
            MoveTetrominoDown(2);
            // 9. e keycode calls for rotation of Tetromino
        } else if(key.keyCode === 38 && startXP2 < edgeP2){
            RotateTetromino(curTetrominoP2, 2);
        }
    }  
}

function MoveTetrominoDown(player){
    // 4. Track that I want to move down
    direction = DIRECTION.DOWN;
    if(player === 1){
        // 5. Check for a vertical collision
        if(!CheckForVerticalCollison(curTetrominoP1, 1)){
            DeleteTetromino(1);
            startYP1++;
            DrawTetrominoP1(specialP1);
        }

    }else{
        if(!CheckForVerticalCollison(curTetrominoP2, 2)){
            DeleteTetromino(2);
            startYP2++;
            DrawTetrominoP2();
        }
    }
}

// 10. Automatically calls for a Tetromino to fall every second

window.setInterval(function(){
    if(winOrLoseP1 != "Game Over"){
        MoveTetrominoDown(1);
    }
    if(winOrLoseP2 != "Game Over"){
        MoveTetrominoDown(2);
    }
  }, 1000);


// Clears the previously drawn Tetromino
// Do the same stuff when we drew originally
// but make the square white this time
function DeleteTetromino(player){
    let x;
    let y;
    let coorX;
    let coorY;

    if (player === 1){
        for(let i = 0; i < curTetrominoP1.length; i++){
            x = curTetrominoP1[i][0] + startXP1;
            y = curTetrominoP1[i][1] + startYP1;
    
            // 4. Delete Tetromino square from the gameboard array
            gameBoardArrayP1[x][y] = 0;
    
            // Draw white where colored squares used to be
            coorX = coordinateArrayP1[x][y].x;
            coorY = coordinateArrayP1[x][y].y;
            ctx.fillStyle = 'white';
            ctx.fillRect(coorX, coorY, 21, 21);
        }
    }else{
        for(let i = 0; i < curTetrominoP2.length; i++){
            x = curTetrominoP2[i][0] + startXP2;
            y = curTetrominoP2[i][1] + startYP2;
    
            // 4. Delete Tetromino square from the gameboard array
            gameBoardArrayP2[x][y] = 0;
    
            // Draw white where colored squares used to be
            coorX = coordinateArrayP2[x][y].x;
            coorY = coordinateArrayP2[x][y].y;
            ctx.fillStyle = 'white';
            ctx.fillRect(coorX, coorY, 21, 21);
        }
    }



}

// 3. Generate random Tetrominos with color
// We'll define every index where there is a colored block
function CreateTetrominos(){
    // Push T 
    tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
    // Push I
    tetrominos.push([[1,1], [0,1], [2,1], [3,1]]);
    // Push J
    tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
    // Push Square
    tetrominos.push([[0,0], [1,0], [1,1], [0,1]]);
    // Push L
    tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
    // Push S
    tetrominos.push([[1,0], [2,0], [1,1], [0,1]]);
    // Push Z
    tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
    // Push +
    tetrominos.push([[1,0], [0,1], [1,2], [2,1]]);
}

function CreateTetromino(player, power){
    let randomTetromino
    if(player === 1){

        // Get a random tetromino index
        randomTetromino = Math.floor(Math.random() * (tetrominos.length-1));
        // Set the one to draw
        curTetrominoP1 = tetrominos[randomTetromino];
        // Get the color for it
        curTetrominoP1Color = tetrominoColors[randomTetromino];
    }else{

        randomTetromino = Math.floor(Math.random() * (tetrominos.length-1));
        // Get the color for it
        if(power >= 1){
            randomTetromino = 7;
        }
        // Set the one to draw
        curTetrominoP2 = tetrominos[randomTetromino];
        curTetrominoP2Color = tetrominoColors[randomTetromino];
    }
}

// 4. Check if the Tetromino hits the wall
// Cycle through the squares adding the upper left hand corner
// position to see if the value is <= to 0 or >= 11
// If they are also moving in a direction that would be off
// the board stop movement
function HittingTheWall(Tetromino, player){
    var startX;

    if(player === 1){
        startX = startXP1;
    }
    else{
        startX = startXP2;
    }

    let tetrominoCopy = Tetromino;
    for(let i = 0; i < tetrominoCopy.length; i++){        
        let newX = tetrominoCopy[i][0] + startX;
        if(newX <= 0 && direction === DIRECTION.LEFT){
            return true;
        } else if(newX >= 11 && direction === DIRECTION.RIGHT){
            return true;
        }  
    }
    return false;
}

// 5. Check for vertical collison
function CheckForVerticalCollison(Tetromino, player){
    // Make a copy of the tetromino so that I can move a fake
    // Tetromino and check for collisions before I move the real
    // Tetromino
    let startX;
    let startY;

    if(player === 1){
        startX = startXP1;
        startY = startYP1;
        stoppedShapeArray = stoppedShapeArrayP1;
    }
    else{
        startX = startXP2;
        startY = startYP2;
        stoppedShapeArray = stoppedShapeArrayP2;
    }


    let tetrominoCopy = Tetromino;
    // Will change values based on collisions
    let collision = false;

    // Cycle through all Tetromino squares
    for(let i = 0; i < tetrominoCopy.length; i++){
        // Get each square of the Tetromino and adjust the square
        // position so I can check for collisions
        let square = tetrominoCopy[i];
        // Move into position based on the changing upper left
        // hand corner of the entire Tetromino shape
        let x = square[0] + startX;
        let y = square[1] + startY;

        // If I'm moving down increment y to check for a collison
        if(direction === DIRECTION.DOWN){
            y++;
        }

        // Check if I'm going to hit a previously set piece
        // if(gameBoardArrayP1[x][y+1] === 1){
        if(typeof stoppedShapeArray[x][y+1] === 'string'){
            // console.log("COLLISON x : " + x + " y : " + y);
            // If so delete Tetromino
            // Increment to put into place and draw
            if(player === 1){
                DeleteTetromino(1);
                startYP1++;
                startY = startYP1;  
                DrawTetrominoP1(specialP1);
            }
            else{
                DeleteTetromino(2);
                startYP2++;
                startY = startYP2;
                DrawTetrominoP2();
            }
            
            collision = true;
            break;
        }
        if(y >= 20){
            collision = true;
            break;
        }
    }

    if(collision){
        // Check for game over and if so set game over text
        if(startY <= 2){
            if(player === 1){
                winOrLoseP1 = "Game Over";
                ctx.fillStyle = 'white';
                ctx.fillRect(310, 242, 140, 30);
                ctx.fillStyle = 'black';
                ctx.fillText(winOrLoseP1, 310, 261);
            }else{
                winOrLoseP2 = "Game Over";
                ctx.fillStyle = 'white';
                ctx.fillRect(778, 242, 140, 30);
                ctx.fillStyle = 'black';
                ctx.fillText(winOrLoseP2, 778, 261);
            }

        } else {

            // 6. Add stopped Tetromino to stopped shape array
            // so I can check for future collisions
            for(let i = 0; i < tetrominoCopy.length; i++){
                let square = tetrominoCopy[i];
                let x = square[0] + startX;
                let y = square[1] + startY;
                // Add the current Tetromino color
                if(player === 1){
                    if(specialP1 === 1 && square[0] === 1 && square[1] === 1){
                        stoppedShapeArrayP1[x][y] = 'black';
                    }else{
                        stoppedShapeArrayP1[x][y] = curTetrominoP1Color;
                    }
                        
                }
                else{
                    stoppedShapeArrayP2[x][y] = curTetrominoP2Color;
                }

            }

            // 7. Check for completed rows
           
            CheckForCompletedRows(player);

            
            specialP1 = 0;
            rand = Math.floor(Math.random() * 3);
            if (rand === 2)
                specialP1 = 1;

            
            if(player === 1){
                CreateTetromino(player, powerDownP1);
                powerDownP1 = 0;
            }else{
                CreateTetromino(player, powerDownP2);
                powerDownP2 = 0;
            }


            // Create the next Tetromino and draw it and reset direction
            direction = DIRECTION.IDLE;

            if(player === 1){
                startXP1 = 4;
                startYP1 = 0;
                DrawTetrominoP1(specialP1);
            }
            else{
                startXP2 = 4;
                startYP2 = 0;
                DrawTetrominoP2();
            }            
        }
    }
}

// 6. Check for horizontal shape collision
function CheckForHorizontalCollision(Tetromino, player){
    // Copy the Teromino so I can manipulate its x value
    // and check if its new value would collide with
    // a stopped Tetromino
    var tetrominoCopy = Tetromino;
    var collision = false;
    var x;
    var y;
    var stoppedShapeVal;

    // Cycle through all Tetromino squares
    for(var i = 0; i < tetrominoCopy.length; i++)
    {
        // Get the square and move it into position using
        // the upper left hand coordinates
        var square = tetrominoCopy[i];
        
        if(player === 1){
            x = square[0] + startXP1;
            y = square[1] + startYP1;
        }
        else{
            x = square[0] + startXP2;
            y = square[1] + startYP2;
        }


        // Move Tetromino clone square into position based
        // on direction moving
        if (direction == DIRECTION.LEFT){
            x--;
        }else if (direction == DIRECTION.RIGHT){
            x++;
        }

        // Get the potential stopped square that may exist
        if(player === 1){
            stoppedShapeVal = stoppedShapeArrayP1[x][y];
        }
        else{
            stoppedShapeVal = stoppedShapeArrayP2[x][y];   
        }

        // If it is a string we know a stopped square is there
        if (typeof stoppedShapeVal === 'string')
        {
            collision=true;
            break;
        }
    }

    return collision;
}

// 7. Check for completed rows
// ***** SLIDE *****
function CheckForCompletedRows(player){

    // 8. Track how many rows to delete and where to start deleting
    let rowsToDelete = 0;
    let startOfDeletion = 0;
    let square;
    let coorX;
    let coorY;
    let powerUp = 0;
    // Check every row to see if it has been completed
    for (let y = 0; y < gBArrayHeight; y++)
    {
        let completed = true;
        // Cycle through x values
        for(let x = 0; x < gBArrayWidth; x++)
        {
            // Get values stored in the stopped block array
            if(player === 1){
                square = stoppedShapeArrayP1[x][y];
            }else{
                square = stoppedShapeArrayP2[x][y];
            }

            if(square === 'black'){
                powerUp++;
            }
            

            // Check if nothing is there
            if (square === 0 || (typeof square === 'undefined'))
            {
                // If there is nothing there once then jump out
                // because the row isn't completed
                completed=false;
                break;
            }
        }

        // If a row has been completed
        if (completed)
        {
            if(powerUp > 0){
                powerDownP2++;
                alert('');
            }
            // 8. Used to shift down the rows
            if(startOfDeletion === 0) startOfDeletion = y;
            rowsToDelete++;

            // Delete the line everywhere
            for(let i = 0; i < gBArrayWidth; i++)
            {
                if(player === 1){
                    stoppedShapeArrayP1[i][y] = 0;
                    gameBoardArrayP1[i][y] = 0;
                    // Look for the x & y values in the lookup table
                    coorX = coordinateArrayP1[i][y].x;
                    coorY = coordinateArrayP1[i][y].y;
                }else{
                    stoppedShapeArrayP2[i][y] = 0;
                    gameBoardArrayP2[i][y] = 0;
                    // Look for the x & y values in the lookup table
                    coorX = coordinateArrayP2[i][y].x;
                    coorY = coordinateArrayP2[i][y].y;
                }
                // Update the arrays by deleting previous squares

                // Draw the square as white
                ctx.fillStyle = 'white';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }

    if(rowsToDelete > 0){
        if(player === 1){
            ctx.fillStyle = 'white';
            ctx.fillRect(310, 109, 140, 19);
            ctx.fillStyle = 'black';
            scoreP1 += 10;
            ctx.fillText(scoreP1.toString(), 310, 127);    
        }else{
            ctx.fillStyle = 'white';
            ctx.fillRect(778, 109, 140, 19);
            ctx.fillStyle = 'black';
            scoreP2 += 10;
            ctx.fillText(scoreP2.toString(), 778, 127);
        }

        MoveAllRowsDown(rowsToDelete, startOfDeletion, player);
    }
}

// 8. Move rows down after a row has been deleted
function MoveAllRowsDown(rowsToDelete, startOfDeletion, player){
    var y2;
    var square;
    var nextSquare;
    let coorX;
    let coorY;

    if(player === 1){
        for (var i = startOfDeletion-1; i >= 0; i--)
        {
            for(var x = 0; x < gBArrayWidth; x++)
            {
                y2 = i + rowsToDelete;
                square = stoppedShapeArrayP1[x][i];
                nextSquare = stoppedShapeArrayP1[x][y2];
    
                if (typeof square === 'string')
                {
                    nextSquare = square;
                    gameBoardArrayP1[x][y2] = 1; // Put block into GBA
                    stoppedShapeArrayP1[x][y2] = square; // Draw color into stopped
    
                    // Look for the x & y values in the lookup table
                    coorX = coordinateArrayP1[x][y2].x;
                    coorY = coordinateArrayP1[x][y2].y;
                    ctx.fillStyle = nextSquare;
                    ctx.fillRect(coorX, coorY, 21, 21);
    
                    square = 0;
                    gameBoardArrayP1[x][i] = 0; // Clear the spot in GBA
                    stoppedShapeArrayP1[x][i] = 0; // Clear the spot in SSA
                    coorX = coordinateArrayP1[x][i].x;
                    coorY = coordinateArrayP1[x][i].y;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(coorX, coorY, 21, 21);
                }
            }
        }
    }else{
        for (var i = startOfDeletion-1; i >= 0; i--)
        {
            for(var x = 0; x < gBArrayWidth; x++)
            {
                y2 = i + rowsToDelete;
                square = stoppedShapeArrayP2[x][i];
                nextSquare = stoppedShapeArrayP2[x][y2];
    
                if (typeof square === 'string')
                {
                    nextSquare = square;
                    gameBoardArrayP2[x][y2] = 1; // Put block into GBA
                    stoppedShapeArrayP2[x][y2] = square; // Draw color into stopped
    
                    // Look for the x & y values in the lookup table
                    coorX = coordinateArrayP2[x][y2].x;
                    coorY = coordinateArrayP2[x][y2].y;
                    ctx.fillStyle = nextSquare;
                    ctx.fillRect(coorX, coorY, 21, 21);
    
                    square = 0;
                    gameBoardArrayP2[x][i] = 0; // Clear the spot in GBA
                    stoppedShapeArrayP2[x][i] = 0; // Clear the spot in SSA
                    coorX = coordinateArrayP2[x][i].x;
                    coorY = coordinateArrayP2[x][i].y;
                    ctx.fillStyle = 'white';
                    ctx.fillRect(coorX, coorY, 21, 21);
                }
            }
        }
    }
}

// 9. Rotate the Tetromino
// ***** SLIDE *****
function RotateTetromino(Tetromino, player)
{
    let newRotation = new Array();
    let tetrominoCopy = Tetromino;
    let curTetrominoBU;
    
    curTetrominoBU = [...Tetromino];

    if (curTetrominoP1Color === 'yellow' && player === 1)
        return;
    if (curTetrominoP2Color === 'yellow' && player === 2)
        return;    
 
        
    if (curTetrominoP1Color === 'cyan' && player === 1 || 
        curTetrominoP2Color === 'cyan' && player === 2 ){

        let x = tetrominoCopy[0][0];
        let y = tetrominoCopy[0][1];
        
        if (x === 1 && y === 1){
            newRotation.push([1,2], [1,0], [1,1], [1,3]);
        }else if (x === 1 && y === 2){
            newRotation.push([2,2], [0,2], [1,2], [3,2]);
        }else if (x === 2 && y === 1){
            newRotation.push([1,1], [2,1], [0,1], [3,1]);
        }else if (x === 2 && y === 2){
            newRotation.push([2,1], [2,0], [2,2], [2,3]);
        }
        
    }else{

        for(let i = 0; i < tetrominoCopy.length; i++)
        {
            // Here to handle a error with a backup Tetromino
            // We are cloning the array otherwise it would 
            // create a reference to the array that caused the error
            //curTetrominoBU = [...Tetromino];
    
            // Find the new rotation by getting the x value of the
            // last square of the Tetromino and then we orientate
            // the others squares based on it [SLIDE]
            let x = tetrominoCopy[i][0];
            let y = tetrominoCopy[i][1];
            //let newX = (GetLastSquareX() - y);
            //let newY = x;
            newRotation.push([1, 1]);
    
            if(x ===0 && y===0)
                newRotation.push([0, 2]);
            else if(x ===0 && y===1)
                newRotation.push([1, 2]);
            else if(x ===0 && y===2)
                newRotation.push([2, 2]);
            
            else if(x ===0 && y===2)
                newRotation.push([2, 2]);
            else if(x ===1 && y===2)
                newRotation.push([2, 1]);
            else if(x ===2 && y===2)
                newRotation.push([2, 0]);
            
            else if(x ===2 && y===0)
                newRotation.push([0, 0]);
            else if(x ===2 && y===1)
                newRotation.push([1, 0]);
            else if(x ===2 && y===2)
                newRotation.push([2, 0]);
    
            else if(x ===0 && y===0)
                newRotation.push([0, 2]);
            else if(x ===1 && y===0)
                newRotation.push([0, 1]);
            else if(x ===2 && y===0)
                newRotation.push([0, 0]);
        }

    }

    if(CheckForHorizontalCollision(newRotation, player) || HittingTheWall(newRotation, player)){
        return;
    }
    
    if (player === 1){
        DeleteTetromino(1);
    }else{
        DeleteTetromino(2);
    }

    // Try to draw the new Tetromino rotation
    try{
        if (player === 1){
            curTetrominoP1 = newRotation;
            DrawTetrominoP1(specialP1);
        }else{
            curTetrominoP2 = newRotation;
            DrawTetrominoP2();
        }
    }  
    // If there is an error get the backup Tetromino and
    // draw it instead
    catch (e){ 
        if(e instanceof TypeError) {
            if (player === 1){
                curTetrominoP1 = curTetrominoBU;
                DeleteTetromino(1);
                DrawTetrominoP1(specialP1);
            }else{
                curTetrominoP2 = curTetrominoBU;
                DeleteTetromino(2);
                DrawTetrominoP2();
            }
        }
    }
}

// Gets the x value for the last square in the Tetromino
// so we can orientate all other squares using that as
// a boundary. This simulates rotating the Tetromino
function GetLastSquareX()
{
    let lastX = 0;
     for(let i = 0; i < curTetrominoP1.length; i++)
    {
        let square = curTetrominoP1[i];
        if (square[0] > lastX)
            lastX = square[0];
    }
    return lastX;
}