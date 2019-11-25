function gridT() {

    this.restart = function () {
        gridTetris = new Array(15);
        for (var i = 0; i < 15; i++) {
            gridTetris[i] = new Array(10);
            for (j = 0; j < 10; j++){
                gridTetris[i][j] = new singleBlock(0, 0, 0, "empty");
            }
        }
        tGrid = new tPiece();
    }

    this.updateGrid = function () {
        for (var i = 0; i < 15; i++) {
            for (j = 0; j < 10; j++) {
                if (gridTetris[i][j].color == 0) {
                    ctx.fillStyle = "grey";
                    ctx.fillRect(gridX + 40 * j, gridY + 40 * i, 39, 39);
                }
                else if (gridTetris[i][j].color == 1){
                    ctx.fillStyle = "red";
                    ctx.fillRect(gridX + 40 * j, gridY + 40 * i, 39, 39);
                }
                else if (gridTetris[i][j].color == 2){
                    ctx.fillStyle = "yellow";
                    ctx.fillRect(gridX + 40 * j, gridY + 40 * i, 39, 39);
                }
                else if (gridTetris[i][j].color == 3){
                    ctx.fillStyle = "blue";
                    ctx.fillRect(gridX + 40 * j, gridY + 40 * i, 39, 39);
                }
                else if (gridTetris[i][j].color == 4){
                    ctx.fillStyle = "green";
                    ctx.fillRect(gridX + 40 * j, gridY + 40 * i, 39, 39);
                }
                //pinta cada posição do GRID, onde cada posição
                //distanciam 40 pixels em ambos eixos X e Y
            }
        }
    }

    this.tMove = function(x,y,rot){
        gridTetris = tGrid.tMaster(x,y,rot,gridTetris);
    }

    this.restart(); //passa aqui na primeira vez e dps nunca
}