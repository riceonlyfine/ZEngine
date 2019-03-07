

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
        private _sprite : Sprite;
        private _projection : Matrix4x4;

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

            // Load
            this._projection = Matrix4x4.orthographic(0, this._canvas.width, 0, this._canvas.height, 0, 100.0);

            this._sprite = new Sprite('test');
            this._sprite.load();
            this._sprite.positon.x = 200;

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

                gl.viewport(-1, -1, -1, 1);
            }
        }
       
        private loop(): void{
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Set uniforms.
            let colorPosition = this._shader.getUniformLocation("u_color");
            gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

            let projectPosition = this._shader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectPosition, false, new Float32Array(this._projection.data));

            let modelPosition = this._shader.getUniformLocation("u_model");
            gl.uniformMatrix4fv(modelPosition, false, new Float32Array(Matrix4x4.translation(this._sprite.positon).data));

            // draw sprite
            this._sprite.draw();

            requestAnimationFrame(this.loop.bind(this));
        }

        private loadShaders() : void{
            let vertexSource  = `
            attribute vec3 a_position;
            uniform mat4 u_projection;
            uniform mat4 u_model;
            void main(){
                gl_Position = u_projection * u_model * vec4(a_position, 1.0);
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