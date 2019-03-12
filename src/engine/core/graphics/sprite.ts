namespace ZE {

    export class Sprite {

        protected _width: number;
        protected _height: number;
        protected _name: string;


        protected _bufffer: GLBuffer;
        protected _material: Material;
        protected _materialName: string;
        protected _vertices: Vertex[];

        public constructor(name: string, materialName: string, width: number = 100, height: number = 100) {
            this._name = name;
            this._materialName = materialName;
            this._width = width;
            this._height = height;
            this._material = MaterialManager.getMaterial(materialName);
        }

        public get name(): string {
            return this._name;
        }

        public destroy(): void {
            this._bufffer.destroy();
            MaterialManager.registerMaterial(this._material);
            this._material = undefined;
            this._materialName = undefined;
        }

        public load(): void {
            this._bufffer = new GLBuffer();

            let positionAttribute = new AttributeInfo();
            positionAttribute.location = 0;
            positionAttribute.size = 3;
            this._bufffer.addAttributeLocation(positionAttribute);

            let textCoordAttribute = new AttributeInfo();
            textCoordAttribute.location = 1;
            textCoordAttribute.size = 2;
            this._bufffer.addAttributeLocation(textCoordAttribute);

            this._vertices = [
                // x,y,z,u,v
                new Vertex(0, 0, 0, 0, 0),
                new Vertex(0, this._height, 0, 0, 1.0),
                new Vertex(this._width, this._height, 0, 1.0, 1.0),

                new Vertex(this._width, this._height, 0, 1.0, 1.0),
                new Vertex(this._width, 0, 0, 1.0, 0),
                new Vertex(0, 0, 0, 0, 0)
            ];

            for (let v of this._vertices){
                this._bufffer.pushBackData(v.toArray());
            }
            
            this._bufffer.upload();
            this._bufffer.unbind();
        }


        public update(time: number): void {

        }

        public draw(shader: Shader, mode: Matrix4x4): void {

            let modelLocation = shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelLocation, false, mode.toFloat32Array());

            let colorLocation = shader.getUniformLocation("u_tint");
            gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

            if (this._material.diffuseTexture !== undefined) {
                this._material.diffuseTexture.activeAndBind(0);
                let diffuseLocation = shader.getUniformLocation("u_diffuse");
                gl.uniform1i(diffuseLocation, 0);
            }

            this._bufffer.bind();
            this._bufffer.draw();
        }

    }

}