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

File name : Transforms.js
File Description : Contains classes that represent 2d transforms
=========================================================================*/

function scaleTransform(x, y) {
    this.x = x;
    this.y = y;
}

function translateTransform(x, y) {
    this.x = x;
    this.y = y
}

function rotateTransform(angel) {
    this.angel = angel;
    //TODO : add transform origin
}

