namespace ZE{
    
    export interface IComponentBuilder{

        readonly type: string;

        buildFromJson(json : any) : IComponent;
    }
}