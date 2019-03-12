namespace ZE{
    export class BehaviorManager{

        private static _registeredBuilders : { [type:string] : IBehaviorBuilder} = {};

        public static registerBuilder(builder : IBehaviorBuilder) : void{
            BehaviorManager._registeredBuilders[builder.type] = builder;
        }

        public static extractBehavior(json : any) : IBehavior{
            if(json.type !== undefined){
                if(BehaviorManager._registeredBuilders[String(json.type)] !== undefined){
                    return BehaviorManager._registeredBuilders[String(json.type)].buildFromJson(json);
                } else {
                    throw new Error("Behavior manager error -  builder is not registerd for this type.")
                }
            } else {
                throw new Error("Behavior manager error - type is missing .")
            }   
        }
    }
}