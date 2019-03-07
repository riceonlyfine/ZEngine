namespace ZE{

    /**
     * The define of MessagePriority.
     */
    export enum MessagePriority{
        NORMAL, 
        HIGHT
    }

    export class Message {
        /**
         * The message code.
         */
        public code : string;

        /**
         * The message parameters.
         */
        public context : any;

        /**
         * The message sender.
         */
        public sender : any;

        /**
         * The message priority.
         */
        public priority : MessagePriority;

        /**
         * Create a new message.
         * @param code 
         * @param sender 
         * @param context 
         * @param priority 
         */
        public constructor(code : string, sender : any, context ?: any, priority : MessagePriority = MessagePriority.NORMAL){
            this.code = code;
            this.sender = sender;
            this.context = context;
            this.priority = priority;
        }

        /**
         * Send a message with normal pritoiry.
         * @param code  message code.
         * @param sender  message sender.
         * @param context  message paramters.
         */
        public static send(code : string, sender : any, context : any) : void {
            MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
        }


        /**
         * Send a message with high pritoiry.
         * @param code  message code.
         * @param sender  message sender.
         * @param context  message paramters.
         */
        public static sendPriority(code : string, sender : any, context : any) : void {
            MessageBus.post(new Message(code, sender, context, MessagePriority.HIGHT));
        }

        /**
         * Subscribe a message.
         * @param code 
         * @param handler 
         */
        public static subscribe(code : string, handler : IMessageHandler) : void{
            MessageBus.addSubscription(code, handler);
        }


          /**
         * Unsubscribe a message.
         * @param code 
         * @param handler 
         */
        public static unsubscribe(code : string, handler : IMessageHandler) : void{
            MessageBus.removeSubscription(code, handler);
        }

    }
}