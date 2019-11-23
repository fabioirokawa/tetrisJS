var stage = document.getElementById('stage');
var ctx = stage.getContext("2d");
document.addEventListener("keydown", keyPush);
var level = [5][5] = 0;

var sqrX = 51;
var sqrY = 51;

const StartSpeed = 800;
var speed = 800;

window.onload = function () {
    setInterval(game, 50);
    setInterval(this.fall_speed, speed);
}

function game() {
    //sqrX = --sqrX;
    //sqrY = ++sqrY;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    drawBoard();

    ctx.fillStyle = "red";
    ctx.fillRect(sqrX, sqrY, 39, 39); //não usar número no lugar do sqrX e sqrY

}

async function fall_speed(){
    sqrY = sqrY + 40;
}

function keyPush(event){
    switch (event.keyCode) {
        case 37: // Left
            sqrX = sqrX - 40;
            break;
        case 38: // up
            sqrY = sqrY + 100;
            break;
        case 39: // right
            sqrX = sqrX + 40;
            break;
        case 40: // down
            sqrX = --sqrX;
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
    var p = 50;

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
