

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
        
        private _bufffer : WebGLBuffer;

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

            gl.bindBuffer(gl.ARRAY_BUFFER, this._bufffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.drawArrays(gl.TRIANGLES, 0, 3)

            requestAnimationFrame(this.loop.bind(this));
        }

        private createBuff() : void{
            this._bufffer = gl.createBuffer();

            let vertices = [
                // x,y,z
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0,
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, this._bufffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
            gl.disableVertexAttribArray(0);
        }

        private loadShaders() : void{
            let vertexSource  = `
            attribute vec3 a_position;
            void main(){
                gl_Position = vec4(a_position, 1.0);
            }`;

            let fragmentSource = `
            precision mediump float;
            void main(){
                gl_FragColor = vec4(1.0);
            }`;

            this._shader = new Shader('basic', vertexSource, fragmentSource);
        }


    }
}