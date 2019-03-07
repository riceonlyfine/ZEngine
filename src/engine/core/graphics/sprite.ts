namespace ZE{

    export class Sprite{

        private _width : number;
        private _height : number;
        private _name : string;


        private _bufffer : GLBuffer;
        private _texture : Texture;
        private _textureName : string;

        public positon : Vector3 = new Vector3();

        public constructor(name : string, textureName : string, width : number = 100, height : number = 100){
            this._name = name;
            this._textureName = textureName;
            this._width = width;
            this._height =  height;
            this._texture = TextureManger.getTexture(textureName);
        }

        public get name() : string{
            return this._name;
        }

        public destroy() : void{
            this._bufffer.destroy();
            TextureManger.releaseTexture(this._textureName);
        }

        public load() : void{
            this._bufffer = new GLBuffer(5);

            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.offset = 0;
            positionAttribute.size = 3;
            this._bufffer.addAttributeLocation(positionAttribute);

            let textCoordAttribute = new AttributeInfo();
            textCoordAttribute.location = 1;
            textCoordAttribute.offset = 3;
            textCoordAttribute.size = 2;
            this._bufffer.addAttributeLocation(textCoordAttribute);

            let vertices = [
                // x,y,z,u,v
                0, 0, 0, 0, 0,
                0, this._height, 0, 0, 1.0,
                this._width,this._height, 0,  1.0, 1.0,

                this._width, this._height, 0, 1.0, 1.0,
                this._width, 0, 0, 1.0, 0,
                0, 0, 0, 0, 0
            ];

            this._bufffer.pushBackData(vertices);
            this._bufffer.upload();
            this._bufffer.unbind();
        }


        public update(time : number) : void{

        }

        public draw(shader : Shader) : void{

            this._texture.activeAndBind(0);
            let diffuseLocation = shader.getUniformLocation("u_diffuse");
            gl.uniform1i(diffuseLocation, 0);

            this._bufffer.bind();
            this._bufffer.draw();
        }

    }

}