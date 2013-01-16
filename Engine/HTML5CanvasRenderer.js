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
File name : HTML5CanvasRenderer.js
File Description : Contains a renderer for geometric entities. It binds to 
the geometric entities as a visitor.
=========================================================================*/


function HTML5CanvasRenderer(context) {
    this.context = context;

    this.render = function (geometry) {
        geometry.accept(this);
    }

    this.visitLabel = function (label) {
        context.save();
        context.font = "20px Impact";//TODO : Remove hardcode
        context.fillText(label.text, label.position.x, label.position.y + 23);//TODO: Remove hardcode
        context.restore();
    }

    this.visitCircle = function (circle) {
        context.save();
        context.beginPath();
        context.arc(
            circle.center.x,
            circle.center.y,
            circle.radius,
            0,
            2 * Math.PI);
        context.stroke();
        context.restore();
    }

    this.visitRect = function (rect) {
        context.save();
        context.beginPath();
        context.rect(rect.x, rect.y, rect.width, rect.height);
        context.stroke();
        context.restore();
    }

    this.visitImage = function (image) {
        context.save();
        var img = new Image();
        img.src = image.source;
        context.drawImage(img, image.x, image.y, image.width, image.height);
        context.restore();
    }
}