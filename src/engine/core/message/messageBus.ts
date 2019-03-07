namespace ZE{

    /**
     * The message manager responsible for sending message across the system.
     */
    export class MessageBus{

        /**
         * All message subsciprionts stores in herre.
         */
        private static _subscriptions : { [code:string] : IMessageHandler[] } = {};

        /**
         * The normal prority message deal count per update.
         */
        private static _normalQueueMessagePerUpdate : number = 10;

        /**
         * The normal prority message queue to be dealed.
         */
        private static _normalMessageQueue : MessageSubscriptionNode[] = [];

        private constructor(){
        }

        /**
         * Add a message subcription to the provided code using the provided handler.
         * @param code  he code to listen for.
         * @param handler The handler to be subscribed.
         */
        public static addSubscription(code : string, handler : IMessageHandler) : void{
            if(MessageBus._subscriptions[code] === undefined){
                MessageBus._subscriptions[code] = [];
            }

            if(MessageBus._subscriptions[code].indexOf(handler) !== -1){
                console.warn("Attempting to add a duplicat handler to code:" + code + ". Subscription not added.");
            } else {
                MessageBus._subscriptions[code].push(handler);
            }
        }

        /**
         * Romve a message subcription to the provided code using the provided handler.
         * @param code the code to listen for.
         * @param handler  The handler to be subscribed.
         */
        public static removeSubscription(code : string, handler : IMessageHandler) : void{
            if(MessageBus._subscriptions[code] === undefined){
                console.warn("Cannot unsubscribe handler from code:" + code + ". Because that code is node subscribed to.");
            }

            let nodeIndex : number = MessageBus._subscriptions[code].indexOf(handler);
            if(nodeIndex!== -1){
                MessageBus._subscriptions[code].splice(nodeIndex, 1);
            }
        }

        /**
         * Post a message.
         * @param message 
         */
        public static post(message : Message) : void{
            console.log("Message posted:", message);
            let  handlers = MessageBus._subscriptions[message.code];
            if(handlers === undefined){
                return;
            }

            for (let h of handlers){
                if(message.priority === MessagePriority.HIGHT){
                    h.onMessage(message);
                } else {
                    MessageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h));
                }
            }
        }

        /**
         * The message deal loop.
         * @param time 
         */
        public static update(time : number) : void{
            if(MessageBus._normalMessageQueue.length === 0){
                return;
            }

            let messageLimit = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);
            for (let i = 0; i < messageLimit; ++i){
                let node = MessageBus._normalMessageQueue.pop();
                node.handler.onMessage(node.message);
            }
        }

    }
}