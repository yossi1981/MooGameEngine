/**=======================================================================
Yossi Mozgerashvily January 2013
--------------------------------------------------------------------------

File name : Application.js
File Description : Part of the test application for the MOO game engine
=========================================================================*/


/**
class to represent the application
The root of everything.
*/
function Application(canvas) {

    this.myCanvas = canvas;
    this.context = this.myCanvas.getContext("2d");
    this.gameModel = new GameModel(new Size(canvas.width, canvas.height));
    var inputManager = new InputManager();
    InputManager().setCanvas(canvas);
    

    this.update = function (app) {
        app.gameModel.update();
    }

    this.render = function (app) {
        app.gameModel.render(app.context);
    }

    this.nextFrame = function (app) {
        app.update(app);
        app.render(app);
    }

    this.start = function () {
        var snd = new Audio("Strangled.mp3"); // buffers automatically when created
        snd.play();
        
        setInterval(this.nextFrame,20,this);
    }
}

