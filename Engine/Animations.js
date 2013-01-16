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

File name : Animations.js
File Description : Contains classes that represents animations
=========================================================================*/


/** Class Animation
Method : Constructor
What : Apply linear interpolation between a srouce and a target , the interpolation is done
over a time duration.

param from : The source value
param to : the target value
param duraiton : the duration of the animation , in milliseconds
param object : an object on which 
*/
function Animation(from, to, duration, object, propertyName) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.currentAnimationTime = 0;
    this.initialAbsuluteTime = Date.now();
    this.done = false;
    this.object = object;
    this.propertyName = propertyName; 
}

/** Class Animation
Method : performNextStep
What : Perform the next step of the animation.
*/
Animation.prototype.performNextStep = function () {
    if (this.done) {
        return this.current;
    }
    this.currentAnimationTime = Date.now() - this.initialAbsuluteTime;
    var currentAnimationFraction = this.currentAnimationTime / this.duration;
    this.current = this.from + currentAnimationFraction * (this.to - this.from);

    this.object[this.propertyName] = this.current;
    if (currentAnimationFraction >= 1) {
        this.current = this.to;
        this.done = true;
    }
    return this.current;
}