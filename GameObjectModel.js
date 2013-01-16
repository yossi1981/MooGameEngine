/**=======================================================================
Yossi Mozgerashvily January 2013
--------------------------------------------------------------------------

File name : GameObjectModel.js
File Description : Part of the test application for the MOO game engine
=========================================================================*/

/** Class GameObjectModel
Method : Constructor
A generic representation of a Game object
TODO : Refactor this disgusting class to an object Hirarchy
TOOD : Afetr refactoring , GameObjectModel should be part of the engine
*/
function GameObjectModel(id, worldBounds) {

    //The id of the object
    this.id = id;

    //Rendering state that is applied on the canvas before rendering
    this.scale = new scaleTransform(1, 1);
    this.translate = new translateTransform(0, 0);
    this.rotate = new rotateTransform(0);
    this.opacity = 1;

    //The geometries that compose this object. Geometries are rendered when the game object is rendered
    this.geometryPrimitives = new Array();

    //animation
    this.animation = new Array();

    //Bounds of the object , used for collision detections
    this.bounds = new Rect(0, 0, 0, 0);

    //The bounds of the world in which the object lives (usually the bound of the canvas)
    this.worldBounds = worldBounds;

    //true means that the object should be removed from the game (in other words , removed from memory)
    this.dead = false;

    //TODO : I have to move 
    this.canShoot = true; //gun only
    this.score = 0; //score only
    this.onShootEvent = new Array();//gun only
    
    
    //Calculate the bounding rectangles of the object. Used for collision detection
    //Iterate over all geometries , find the extreme points and compose the final bounds
    this.RecalcBounds = function(){
        var x =null;
        var y =null;
        var width =null;
        var height =null;
        for (var i = 0; i < this.geometryPrimitives.length; i++) {
            var current = this.geometryPrimitives[i];
            var currentBounds = current.getBounds();
            if( x == null || currentBounds.x + this.translate.x < x)
            {
                x = currentBounds.x + this.translate.x;
            }

            if( y == null || currentBounds.y + this.translate.y < y)
            {
                y = currentBounds.y + this.translate.y;
            }

            if (width == null ||
                currentBounds.x + currentBounds.width + this.translate.x < x + width)
            {
                width = currentBounds.x + currentBounds.width + this.translate.x - x;
            }

            if (height == null ||
                currentBounds.y + currentBounds.height + this.translate.y < y + height)
            {
                height = currentBounds.y + currentBounds.height + this.translate.y - y;
            }
        }

        this.bounds.x = x;
        this.bounds.y = y;
        this.bounds.width = width;
        this.bounds.height = height;
    }

    //Render the object.
    //Iterate over all geometries and render them one-by-one , no ZOrder for now.
    this.render = function (context) {
        context.save();

        context.translate(this.translate.x, this.translate.y);
        context.scale(this.scale.x, this.scale.y);
        context.rotate((this.rotate.angel * Math.PI) / 180);
        context.globalAlpha = this.opacity;

        for (var i = 0; i < this.geometryPrimitives.length; i++) {
            var renderer =new HTML5CanvasRenderer(context);
            renderer.render(this.geometryPrimitives[i]);
        }
        context.restore();
    }

    this.RegisterOnShootEventHandler = function (handler) {
        this.onShootEvent.push(handler);
    }

    this.OnShoot = function (positionX) {
        for (var i = 0; i < this.onShootEvent.length; i++) {
            this.onShootEvent[i](positionX);
        }
    }

    //Update the state of the object.
    //TODO : Refactor to sub-classes
    this.update = function () {
        if (this.id == 'Score') {
            this.geometryPrimitives[0].text = this.score.toString();
        }
        else if (this.id == 'Gun') {
            var mouseState = InputManager().mouseState;
            var leftButtonDown = mouseState.leftButtonDown;
            var x = mouseState.positionX;
            var y = mouseState.positionY;

            //hit test
            if (leftButtonDown == true) {

                if (y >= this.bounds.y && y <= this.bounds.y + this.bounds.height) {
                    if (x < this.bounds.x) {
                        this.translate.x -= 10;
                    }
                    else if (x > this.bounds.x + this.bounds.width && x + 10 < this.worldBounds.width) {
                        this.translate.x += 10;
                    }
                    this.RecalcBounds();
                    this.canShoot = true;
                }
                else if (y > this.bounds.y - 20 && y < this.bounds.y) {
                    if (this.canShoot) {
                        this.OnShoot(x);
                        console.log("SHOT");
                        this.canShoot = false;
                    }
                }
            }
            else {
                this.canShoot = true;
            }
        }
        else if (this.id == 'Bullet') {
            if (this.bounds.y <= 0) {
                this.dead = true;
            }
        }

        for (var i = 0; i < this.animation.length; i++) {
            this.animation[i].performNextStep();
            this.RecalcBounds(); // optimize this!
        }
    }
    
}