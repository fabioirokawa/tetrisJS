function tPiece() {
    const colorID = 2;
    this.tMaster = function (xt, yt, rott, gridt, removet) {
        if (removet == 1) {
            return this.tPoses(xt, yt, rott, gridt, 0);
        }
        else {
            return this.tPoses(xt, yt, rott, gridt, colorID);
        }
    }

    this.tPoses = function (x, y, rot, grid, final) {
        if (rot == 1) {
            grid[x][y].color =
                grid[x][y - 1].color =
                grid[x][y + 1].color =
                grid[x + 1][y].color = final;
            return grid;
            //  0 0 0
            //    0
        }
        else if (rot == 2) {
            grid[x][y].color =
            grid[x][y - 1].color =
            grid[x][y + 1].color =
            grid[x + 1][y].color = final;
            return grid;
            //    0
            //  0 0
            //    0
        }
        else if (rot == 3) {
            grid[x][y].color =
            grid[x][y - 1].color =
            grid[x][y + 1].color =
            grid[x + 1][y].color = final;
            return grid;
            //    0
            //  0 0 0
        }
        else if (rot == 4) {
            grid[x][y].color =
            grid[x][y - 1].color =
            grid[x][y + 1].color =
            grid[x + 1][y].color = final;
            return grid;
            //  0
            //  0 0
            //  0
        }
    }
}