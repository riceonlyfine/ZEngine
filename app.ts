


namespace ZE{

    export class Engine {

        private _count : number = 0;

        public constructor(){
            this._count = 0;
        }

        public start(): void{


            this.loop();
        }

        private loop(): void{
            this._count++;

            document.title = this._count.toString();
            requestAnimationFrame(this.loop.bind(this));
        }
    }
}


window.onload = function(){

    let e = new ZE.Engine();
    e.start();

    document.body.innerHTML += ',new add text';
}


