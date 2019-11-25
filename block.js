class singleBlock{
    constructor(PX,PY,color,type){
        this._PX = PX;
        this._PY = PY;
        this._color = color;
        this._type = type;
    }

    get PX(){
        return this._PX;
    }
    get PY(){
        return this._PY;
    }
    get color(){
        return this._color;
    }
    get type(){
        return this._type;
    }

    set PX(PX){
         this._PX = PX;
    }
    set PY(PY){
         this._PY = PY;
    }
    set color(color){
        this._color = color;
    }
    set type(type){
        this._type = type;
    }

}