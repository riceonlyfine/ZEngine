namespace ZE{

    export abstract class BaseComponent{

        protected _owner : SimObject;

        public name : string;

        public constructor(name : string){

        }

        public load() : void{
            
        }

        public setOwner(owner : SimObject) : void{
            this._owner = owner;
        }

        public get owner() : SimObject{
            return this._owner;
        }

        public update(time : number) : void {

        }
        
        public render(shader : Shader) : void{

        }
    }
}