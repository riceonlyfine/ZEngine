namespace ZE{

    export class Shader{

        private _name : string;
        private _program : WebGLProgram;

        /**
         * Create a new shader.
         * @param name The name of the shader.
         * @param vetexSource  The Source of the vertex shader.
         * @param fragmentSource    The source of the fragment shader.
         */
        public constructor(name : string, vertexSource : string, fragmentSource : string){
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

           this.createProgram(vertexShader, fragmentShader);
        }

        /**
         * The name of this shader.
         */
        public get name(): string{
            return this._name;
        }

        /**
         * Use this shader.
         */
        public use() : void{
            gl.useProgram(this._program);
        }

        private loadShader(source : string, shaderType : number) : WebGLShader{
            let shader : WebGLShader = gl.createShader(shaderType);

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);
            if(error !== ""){
                throw new Error("Error compiling shader: '" + this._name + "':" + error);
            }

            return shader;
        }

        private createProgram(vertexShader : WebGLShader, fragmentShader : WebGLShader) : void{
            this._program = gl.createProgram();

            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);

            gl.linkProgram(this._program);

            let error = gl.getProgramInfoLog(this._program);
            if(error !== ""){
                throw new Error("Error Linking shader: '" + this._name + "':" + error);
            }
        }
    }

}