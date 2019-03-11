namespace ZE{
    
    /**
     * The Json Asset.
     */
    export class JsonAsset implements IAsset{
        /**
         * Json url.
         */
        public readonly name : string;

        /**
         * The Json data.
         */
        public readonly data : any;

        /**
         * Create a new Json asset.
         * @param name 
         * @param data 
         */
        public constructor(name : string, data : any){
            this.name = name;
            this.data = data;
        }
    }

}