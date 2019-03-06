

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


            this.loop();
        }

        /**
         * Resizes the canvas to fit the window.
         */
        public resize() : void{
            if(this._canvas !== undefined){
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        }
       
        private loop(): void{
            gl.clear(gl.COLOR_BUFFER_BIT);

            requestAnimationFrame(this.loop.bind(this));
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