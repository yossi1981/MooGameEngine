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
-------------------------------------------------------------------------
File name : Geometry.js
File Description : Contains classes that represents geometric entities.
Rendering is not done here. The visitor design pattern is being used to allow
external renderers to render the shapes. I wanted to allow this flexibility,for 
two reasons:
1. It makes a code that is a bit more portable.
2. Exposing the visitor pattern also allows other types of visitors
such as serializers or whatever will be needed at the future
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
function Size(width, height) {
    this.width = width;
    this.height = height;

    this.accept = function (visitor) {
        visitor.visitSize(this);
    }
}


/**
class Point
A geometric representation of a two dimensional point
*/
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.accept = function (visitor) {
        visitor.visitPoint(this);
    }
}

/**
class Rect
A geometric representation of a rectangle
*/
function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.accept = function (visitor) {
        visitor.visitRect(this);
    }

    this.getBounds = function () {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}

/**
class Label
A geometric representation of a rectangle
*/
function Label(position, text) {
    this.position = position;
    this.text = text;

    this.accept = function (visitor) {
        visitor.visitLabel(this);
    }

    this.getBounds = function () {
        return new Rect(this.position.x, this.position.y, 100, 30);
    }
}

/**
Class name : Circle
Geometric representation of a Circle
*/
function Circle(center, radius) {
    this.center = center;
    this.radius = radius;

    this.accept = function (visitor) {
        visitor.visitCircle(this);
    }

    this.getBounds = function () {
        return new Rect(this.center.x - this.radius, this.center.y - this.radius, radius * 2, radius * 2);
    }
}

/**
class Image
A geometric representation of a rectangle
*/
function Sprite(x, y, width, height,source) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.source = source;

    this.accept = function (visitor) {
        visitor.visitImage(this);
    }

    this.getBounds = function () {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}

