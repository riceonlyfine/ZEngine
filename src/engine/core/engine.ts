

/*
 * File: engine.ts
 * Project: src
 * File Created: Wednesday, 6th March 2019 1:31:41 pm
 * Author: riceonlyfine
 * Email:eldn@live.hk
 * Descriptinos: Engine
 */


namespace ZE{

    /**
     * The main game engine class
     */
    export class Engine {

        private _canvas : HTMLCanvasElement;
        private _shader : Shader;
        
        private _bufffer : GLBuffer;

        /**
         * create new engine.
         */
        public constructor(){
        }

        /**
         * Starts up the engine
         */
        public start(): void{

            this._canvas = GLUtils.initialize();

            gl.clearColor(0, 0, 0, 1);

            this.loadShaders();
            this._shader.use();

            this.createBuff();
            this.resize();
            this.loop();
        }

        /**
         * Resizes the canvas to fit the window.
         */
        public resize() : void{
            if(this._canvas !== undefined){
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;

                gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        }
       
        private loop(): void{
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Set unifroms.
           let colorPosition = this._shader.getUniformLocation("u_color");
            gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

            this._bufffer.bind();
            this._bufffer.draw();

            requestAnimationFrame(this.loop.bind(this));
        }

        private createBuff() : void{
            this._bufffer = new GLBuffer(3);

            let positionAttribute = new AttributeInfo();
            positionAttribute.location = this._shader.getAttributeLocation("a_position");
            positionAttribute.offset = 0;
            positionAttribute.size = 3;
            this._bufffer.addAttributeLocation(positionAttribute);

            let vertices = [
                // x,y,z
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0,
            ];
            this._bufffer.pushBackData(vertices);
            this._bufffer.upload();
            this._bufffer.unbind();
        }

        private loadShaders() : void{
            let vertexSource  = `
            attribute vec3 a_position;
            void main(){
                gl_Position = vec4(a_position, 1.0);
            }`;

            let fragmentSource = `
            precision mediump float;
            uniform vec4 u_color;
            void main(){
                gl_FragColor = u_color;
            }`;

            this._shader = new Shader('basic', vertexSource, fragmentSource);
        }


    }
}