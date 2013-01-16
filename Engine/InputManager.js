/**=======================================================================

 __  __  _____  _____  ___  ____ 
(  \/  )(  _  )(  _  )/ __)( ___)
 )    (  )(_)(  )(_)(( (_-. )__) 
(_/\/\_)(_____)(_____)\___/(____)
                                 
    ,           ,
   /             \
  ((__-^^-,-^^-__))
   `-_---' `---_-'
    <__|o` 'o|__>
       \  `  /
        ): :(
        :o_o:
         "-"   ----> "Mooooooooooooooooooooooooooo"


The "Moo" Game Egine

Yossi Mozgerashvily January 2013
--------------------------------------------------------------------------

File name : Collision.js
File Description : Contains collision detection utilities
=========================================================================*/

/**
class MouseState
Represents a mouse state
*/
function MouseState() {
    this.positionX = null;
    this.positionY = null;
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    this.middleButtonDown = false;
}

/**
<<Singleton>>
class InputManager
This class capture and holds the mouse and keyboard state
*/
function InputManager() {
    //singleton
    if (InputManager.prototype._singletonInstance) {
        return InputManager.prototype._singletonInstance;
    }
    InputManager.prototype._singletonInstance = this;
    //singletton

    this.keys = new Array(256);
    for (var i = 0; i < 256; i++) {
        this.keys[i] = false;
    }
    this.mouseState = new MouseState();

    this.setCanvas = function (canvas) {
        this.canvas = canvas;
        canvas.onmousedown = onMouseDownEventHandler;
        canvas.onmouseup = onMouseUpEventHandler;
        canvas.onmousemove = onMouseMoveEventHandler;
        window.onkeydown = onKeyDownEventHandler;
        window.onkeyup = onKeyUpEventHandler;
    }

    return InputManager.prototype._singletonInstance;
}

function onMouseMoveEventHandler(e){
    InputManager().mouseState.positionX = e.x;
    InputManager().mouseState.positionY = e.y;
}

function onMouseDownEventHandler(e){
    switch (e.button) {
        case 0:
            InputManager().mouseState.leftButtonDown = true;
            break;
        case 1:
            InputManager().mouseState.middleButtonDown = true;
            break;
        case 2:
            InputManager().mouseState.rightButtonDown = true;
            break;
    }
};

function onMouseUpEventHandler(e){
    switch (e.button) {
        case 0:
            InputManager().mouseState.leftButtonDown = false;
            break;
        case 1:
            InputManager().mouseState.middleButtonDown = false;
            break;
        case 2:
            InputManager().mouseState.rightButtonDown = false;
            break;
    }
}

function onKeyDownEventHandler(e) {
    InputManager().keys[e.keyCode] = true;
}

function onKeyUpEventHandler(e) {
    InputManager().keys[e.keyCode] = false;
}





