namespace ZE{

    export class TestZone extends Zone{

        private _sprite : Sprite;

        public load() : void{


            this._sprite = new Sprite('test', "create");
            this._sprite.load();
            this._sprite.positon.x = 200;
            this._sprite.positon.y = 200;


            super.load();
        }


        public render(shader : Shader) : void{

             // draw sprite
             this._sprite.draw(shader);

             super.render(shader);
        }
    }
}