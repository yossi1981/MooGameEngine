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
File name : Collision.js
File Description : Contains collision detection utilities
=========================================================================*/

/** NONCLASS
Method : RectanglesColliding
What : test whether two recatangles overlap each other
*/
function RectanglesColliding(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y);
}