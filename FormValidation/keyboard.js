KEY_DOWN = 40;
KEY_UP = 38;
KEY_LEFT = 37;
KEY_RIGHT = 39;

KEY_A = 65;
KEY_D = 68;
KEY_S = 83;
KEY_W = 87;

function checkEventObj ( _event_ ){
    // --- IE explorer
    if ( window.event )
    return window.event;
    // --- Netscape and other explorers
    else
    return _event_;
}

function applyKey (_event_){

    // --- Retrieve event object from current web explorer
    var winObj = checkEventObj(_event_);

    var intKeyCode = winObj.keyCode;

        if ( intKeyCode == KEY_RIGHT || intKeyCode == KEY_LEFT || intKeyCode == KEY_DOWN || intKeyCode == KEY_UP ){
            alert("Hello Player 2! KeyCode: " + intKeyCode);
            winObj.keyCode = intKeyCode = REMAP_KEY_T;
            winObj.returnValue = false;
            return false;
        }

        if ( intKeyCode == KEY_A|| intKeyCode == KEY_S || intKeyCode == KEY_D || intKeyCode == KEY_W ){
            alert("Hello Player 1! KeyCode: " + intKeyCode);
            winObj.keyCode = intKeyCode = REMAP_KEY_T;
            winObj.returnValue = false;
            return false;
        }

}