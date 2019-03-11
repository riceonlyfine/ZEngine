

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
        private _basicShader : BasicShader;
      
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
            AssetManager.initialize();
            ZoneManager.initialize();

            gl.clearColor(0, 0, 0, 1);

            this._basicShader = new BasicShader();
            this._basicShader.use();

            // Load materials
            MaterialManager.registerMaterial(new Material("create", "assets/textures/bush_floor.png", new Color(255, 128, 0, 255)));

            // Load
            this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0,  -100.0, 100.0);

            // TODO : Change this to be read from game configuration later.
            ZoneManager.changeZone(0);

            
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

                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                this._projection = Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0,  -100.0, 100.0);
            }
        }
       
        private loop(): void{
            MessageBus.update(0);

            ZoneManager.update(0);

            gl.clear(gl.COLOR_BUFFER_BIT);

            ZoneManager.render(this._basicShader);

            // Set uniforms.
            let projectPosition = this._basicShader.getUniformLocation("u_projection");
            gl.uniformMatrix4fv(projectPosition, false, new Float32Array(this._projection.data));

           

            requestAnimationFrame(this.loop.bind(this));
        }


    }
}