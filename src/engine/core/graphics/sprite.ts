namespace ZE{

    export class Sprite{

        private _width : number;
        private _height : number;
        private _name : string;


        private _bufffer : GLBuffer;

        public positon : Vector3 = new Vector3();

        public constructor(name : string, width : number = 100, height : number = 100){
            this._name = name;
            this._width = width;
            this._height =  height;

        }

        public load() : void{
            this._bufffer = new GLBuffer(3);

            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3;
            this._bufffer.addAttributeLocation(positionAttribute);

            let vertices = [
                // x,y,z
                0, 0, 0,
                0, this._height, 0,
                this._width,this._height, 0,

                this._width, this._height, 0,
                this._width, 0, 0,
                0, 0, 0
            ];

            this._bufffer.pushBackData(vertices);
            this._bufffer.upload();
            this._bufffer.unbind();
        }


        public update(time : number) : void{

        }

        public draw() : void{
            this._bufffer.bind();
            this._bufffer.draw();
        }

    }

}