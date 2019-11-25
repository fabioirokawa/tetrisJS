function tPiece(){
    this.tMaster = function(x,y,rot,grid){
        if (rot == 1){
            grid[x][y].color = 2;
            grid[x][y - 1].color = 2;
            grid[x][y + 1].color = 2;
            grid[x + 1][y].color = 2;
            return grid;
        }
    }
}