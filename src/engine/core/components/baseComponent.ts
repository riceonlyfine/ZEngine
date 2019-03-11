namespace ZE{

    export abstract class BaseComponent implements IComponent{

        protected _owner : SimObject;
        protected _data : IComponnetData;

        public name : string;

        public constructor(data : IComponnetData){
            this._data = data;
            this.name = data.name;
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