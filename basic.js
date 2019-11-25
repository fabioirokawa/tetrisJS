var stage = document.getElementById('stage');
var ctx = stage.getContext("2d");
document.addEventListener("keydown", keyPush);

//
//ctx.fillRect(quantos pixels do eixo x para começar o desenho, idem porém com eixo y,
//            ,tamanho da largura do bloco, tamanho da altura do bloco)
//

//posição X e Y inicial para o jogo todo, sujeito a mudança
const startPosX = 50; 
const startPosY = 50;

var gridX = startPosX;
var gridY = startPosY;

//bloco de teste
var dummyX = startPosX;
var dummyY = startPosY;
//

const StartSpeed = 800;
var speed = 800;

//qual rotação das 4 possíveis
var rotationMain = 1;

//"respawn" das peças / / / / (PX,PY,color,type)
const blockMaster = new singleBlock(0,4,0,"empty");
//bloco de referência para as peças
var blockNow = new singleBlock(0,4,0,"empty"); 
//

//GRID 15x10

var gridMain = new gridT();

window.onload = function () { //o que será carregado na tela
    
    setInterval(game, 50);
    setInterval(this.fall_speed, speed);
}

function game() { //ta mais pra função desenhar mas ok

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    drawBoard(); //desenha grid do Tetris

    /*
    ctx.fillStyle = "red";
    ctx.fillRect(dummyX, dummyY, 39, 39); //não usar número no lugar do startPosX e startPosY
    */

    pieceOnGrid(); //peça descendo no grid agora

    gridMain.updateGrid();
}

function pieceOnGrid(){ 
    if (blockNow.PY == -1){
        blockNow = blockMaster;
    }

    blockNow.type = "t";
    //blockNow.rotation?

    if (blockNow.type == "t"){
        gridMain.tMove(blockNow.PX,blockNow.PY,1);
    }
    //random peças aqui talvez

}

function fall_speed(){
    gridMain.tRemove(blockNow.PX,blockNow.PY,1);
    blockNow.PX = blockNow.PX + 1;
}

function keyPush(event){ //implementa a função de cada seta
    switch (event.keyCode) {
        case 37: // Left
        gridMain.tRemove(blockNow.PX,blockNow.PY,1);
        blockNow.PY = blockNow.PY - 1;
            break;
        case 38: // up
        dummyY = dummyY + 100;
            break;
        case 39: // right
        gridMain.tRemove(blockNow.PX,blockNow.PY,1);
        blockNow.PY = blockNow.PY + 1;
            break;
        case 40: // down
        dummyX = --dummyX;
            break;			
        default:
            break;
    }
}

function drawBoard() { 
    // Box width
    var bw = 400;
    // Box height
    var bh = 600;
    // Padding
    var p = 49;

    for (var x = 0; x <= bw; x += 40) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 40) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "white";
    ctx.stroke();
}
