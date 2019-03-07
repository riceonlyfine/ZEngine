namespace ZE{

    /**
     * MessageHandler
     */
    export interface IMessageHandler{
        onMessage( message : Message) : void;
    }
}