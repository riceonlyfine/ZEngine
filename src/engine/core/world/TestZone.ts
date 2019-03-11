/// <reference path="./zone.ts" />

namespace ZE{
    export class TestZone extends Zone{

        private _testObject : SimObject;
        private _testSprite : SpriteComponent;


        
        public load() : void{

            this._testObject = new SimObject(0, "test object");
            this._testSprite = new SpriteComponent("test sprite component", "create");
            this._testObject.addComponent(this._testSprite);

            this._testObject.transform.position.x = 300;
            this._testObject.transform.position.y = 300;

            this.scene.addObject(this._testObject);

            super.load();
        }
    }
}