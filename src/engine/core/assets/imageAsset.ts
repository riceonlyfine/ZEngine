namespace ZE{
    
    /**
     * The Image Asset.
     */
    export class ImageAsset implements IAsset{
        /**
         * image url.
         */
        public readonly name : string;

        /**
         * The Image data.
         */
        public readonly data : HTMLImageElement;

        /**
         * Create a new image asset.
         * @param name 
         * @param data 
         */
        public constructor(name : string, data : HTMLImageElement){
            this.name = name;
            this.data = data;
        }

        /**
         * Gets the width of the iamge.
         */
        public get width() : number{
            return this.data.width;
        }

         /**
         * Gets the height of the iamge.
         */
        public get height() : number{
            return this.data.height;
        }
    }

}