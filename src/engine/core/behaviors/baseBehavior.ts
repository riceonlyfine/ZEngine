namespace ZE{

    export abstract class BaseBehavior implements IBehavior{
       
       
        public name : string;
        private _data : IBehaviorData;
        protected _owner : SimObject;

        public constructor(data : IBehaviorData){
            this._data = data;
            this.name = data.name;
        }

        public setOwner(owner: SimObject): void {
            this._owner = owner;
        }

        public update(time: number): void {
            
        }

        public apply(userData: any): void {
            
        }

        
    }
}