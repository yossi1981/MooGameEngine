/**=======================================================================
Yossi Mozgerashvily January 2013
--------------------------------------------------------------------------

File name : GameModel.js
File Description : Part of the test application for the MOO game engine
=========================================================================*/


//Holds the game data
//TODO : Serious refactoring is needed here
function GameModel(size) {

    //render the game
    this.render = function (context) {
        context.clearRect(0, 0, this.size.width, this.size.height);
        context.save();
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].render(context);
        }
        context.restore();
    }

    //capture collision between bullets and flying things
    this.CaptureCollisions = function () {
        var flyingThings = new Array();
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id == 'FlyingThing') {
                flyingThings.push(this.objects[i]);
            }
        }

        var bullets = new Array();
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id == 'Bullet') {
                bullets.push(this.objects[i]);
            }
        }

        for (var i = 0; i < bullets.length; i++) {
            for (var j = 0 ; j < flyingThings.length; j++) {
                var bullet = bullets[i];
                var flyingThing = flyingThings[j];
                var collide = RectanglesColliding(bullet.bounds, flyingThing.bounds);
                if (collide) {
                    var blood = CreateGameObjectModel(
                        'BLOOD_SPLATTER',
                        'BloodSplatter',
                        new Rect(0, 0, this.size.width, this.size.height),
                        new Point(flyingThing.bounds.x, flyingThing.bounds.y));

                    var snd = new Audio("http://www.sounds.beachware.com/2illionzayp3may/wlvwslvd/DYING7.mp3"); // buffered automatically when created
                    snd.play();

                    this.objects.push(blood);
                    flyingThing.dead = true;
                    this.score.score += 1;
                }
            }
        }
    }

    this.updateObjects = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update();
        }
    }

    this.RemoveDeadObjects = function () {
        var tmpObjects = new Array();
        for (var i = 0; i < this.objects.length; i++) {
            if (!this.objects[i].dead == true) {
                tmpObjects.push(this.objects[i]);
            }
        }
        this.objects = tmpObjects;
    }

    //update the game state
    this.update = function () {
        this.CaptureCollisions();
        this.updateObjects();
        this.RemoveDeadObjects();
    }

    this.emitFlyingThing = function (gameModel) {
        var flyingThing = CreateGameObjectModel('FLYING_THING', "FlyingThing", new Rect(-20, 20, gameModel.size.width + 20, gameModel.size.height - 80), null);
        gameModel.objects.push(flyingThing);
    }

    this.objects = new Array();
    this.size = size;
    this.bg = CreateGameObjectModel('BACKGROUND', 'background', new Rect(0, 0, this.size.width, this.size.height), null);
    this.objects.push(this.bg);

    this.gun = CreateGameObjectModel('GUN', 'Gun', new Rect(0, 0, this.size.width, this.size.height), new Point(this.size.width / 2, this.size.height - 15));
    this.gun.RegisterOnShootEventHandler(this.onShoot);
    this.objects.push(this.gun);

    this.score = CreateGameObjectModel('SCORE', 'Score', new Rect(0, 0, this.size.width, this.size.height), null);
    this.objects.push(this.score);

    setInterval(this.emitFlyingThing, 1000, this);
}