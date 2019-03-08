namespace ZE{

    export class Sprite{

        private _width : number;
        private _height : number;
        private _name : string;


        private _bufffer : GLBuffer;
        private _material : Material;
        private _materialName : string;

        public positon : Vector3 = new Vector3();

        public constructor(name : string, materialName : string, width : number = 100, height : number = 100){
            this._name = name;
            this._materialName = materialName;
            this._width = width;
            this._height =  height;
            this._material = MaterialManager.getMaterial(materialName);
        }

        public get name() : string{
            return this._name;
        }

        public destroy() : void{
            this._bufffer.destroy();
            MaterialManager.registerMaterial(this._material);
            this._material = undefined;
            this._materialName = undefined;
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

            let modelLocation = shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this.positon).data));

            let colorLocation = shader.getUniformLocation("u_tint");
            gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

            if(this._material.diffuseTexture !== undefined){
                this._material.diffuseTexture.activeAndBind(0);
                let diffuseLocation = shader.getUniformLocation("u_diffuse");
                gl.uniform1i(diffuseLocation, 0);
            }

            this._bufffer.bind();
            this._bufffer.draw();
        }

    }

}