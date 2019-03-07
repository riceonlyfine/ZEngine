namespace ZE{
    export interface IMessageHandler{
        onMessage( message : Message) : void;
    }
}