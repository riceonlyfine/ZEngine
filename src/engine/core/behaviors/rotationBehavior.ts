/// <reference path="./baseBehavior.ts" />
/// <reference path="./behaviorManager.ts" />

namespace ZE{

    export class RotationBehaviorData implements IBehaviorData{
        public name : string;
        public rotation : Vector3 = Vector3.zero;

        public setFromJson(json : any) : void{

            if(json.name === undefined){
                throw new Error("Name must be defined in behavior data.")
            }

            this.name = String(json.name);

            if(json.rotation !== undefined){
                this.rotation.setFromJson(json.rotation);
            }
        }
    }

    export class RotationBehaviorBuilder implements IBehaviorBuilder {

        public get type(): string{
            return "rotation";
        }

        public buildFromJson(json: any): IBehavior {
            let data = new RotationBehaviorData();
            data.setFromJson(json);
            return new RotationBehavior(data);
        }
    }

    export class RotationBehavior extends BaseBehavior {
        
        private _roration : Vector3;

        public constructor(data : RotationBehaviorData){
            super(data);


            this._roration = data.rotation;
        }

        public update(time: number): void {
            this._owner.transform.rotation.add(this._roration);

            super.update(time);
        }


    }

    BehaviorManager.registerBuilder(new RotationBehaviorBuilder());
}