namespace ZE{
    export interface IComponent{

        name : string;

        setOwner(owner : SimObject) : void;

        readonly owner : SimObject;

        load() : void;

        update(time : number) : void ;
        
        render(shader : Shader) : void;
    }
}