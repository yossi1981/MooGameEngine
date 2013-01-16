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

File name : Utilities.js
File Description : Contains generic utilities
=========================================================================*/


function GenerateRandomInteger(from,to){
    if(from>=to){
        throw 'from must be smaller than to';
    }

    var range = to-from + 1;
    return Math.floor(Math.random()*range) + from;
}