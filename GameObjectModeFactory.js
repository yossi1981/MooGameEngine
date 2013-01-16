/**=======================================================================
Yossi Mozgerashvily January 2013
--------------------------------------------------------------------------

File name : GameModel.js
File Description : Part of the test application for the MOO game engine
=========================================================================*/


/*factory method for various types of objects that exist in the game*/
//TODO : Give every type its own freaking class
function CreateGameObjectModel(type, id, bounds, center) {
    switch (type) {
        case 'GUN':
            gameObject = new GameObjectModel(id, bounds);
            var x = center.x - 15;
            var y = center.y - 15;
            var width = 30;
            var height = 30;
            gameObject.geometryPrimitives.push(new Rect(x, y, width, height));
            gameObject.RecalcBounds();
            return gameObject;
            break;
        case 'BULLET':
            gameObject = new GameObjectModel(id, bounds);
            var radius = 3;
            gameObject.geometryPrimitives.push(new Circle(center, radius));
            gameObject.RecalcBounds();
            var animation = new Animation(0, -center.y, 2000, gameObject.translate, 'y');
            gameObject.animation.push(animation);
            return gameObject;
            break;
        case 'FLYING_THING':
            gameObject = new GameObjectModel(id, bounds);
            var radius = 15;
            var y = GenerateRandomInteger(bounds.y, bounds.y + bounds.height);
            var x = GenerateRandomInteger(1, 2) == 1 ? bounds.x : bounds.x + bounds.width;

            var duration = GenerateRandomInteger(1000, 5000);
            var center = new Point(x, 0);
            gameObject.translate.y = y;
            gameObject.geometryPrimitives.push(new Circle(center, radius));
            var animation = null;
            if (center.x == bounds.x) {
                animation = new Animation(0, (bounds.width + 20), duration, gameObject.translate, 'x');
            }
            else {
                animation = new Animation(0, -(bounds.width + 20), duration, gameObject.translate, 'x');
            }
            gameObject.animation.push(animation);
            gameObject.RecalcBounds();
            return gameObject;
            break;
        case 'SCORE':
            gameObject = new GameObjectModel(id, bounds);
            gameObject.geometryPrimitives.push(new Label(new Point(bounds.x, bounds.y), "0"));
            gameObject.RecalcBounds();
            return gameObject;
            break;
        case 'BLOOD_SPLATTER':
            gameObject = new GameObjectModel(id, bounds);
            gameObject.geometryPrimitives.push(new Sprite(center.x - 20, center.y - 20, 40, 40, "bloodsplatter3.jpg"));
            gameObject.RecalcBounds();
            var animation = new Animation(1, 0.1, 3000, gameObject, 'opacity');
            gameObject.animation.push(animation);
            return gameObject;
            break;
        case 'BACKGROUND':
            gameObject = new GameObjectModel(id, bounds);
            gameObject.geometryPrimitives.push(new Sprite(bounds.x, bounds.y, bounds.width, bounds.height, "bg.jpg"));
            gameObject.RecalcBounds();
            return gameObject;
            break;
        default:
            return null;
            break;
    }
}