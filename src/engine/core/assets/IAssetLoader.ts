namespace ZE{

    /**
     * The asset loader interface.
     */
    export interface IAssetLoader{
        /**
         * Supported asset extensions.
         */
        readonly supportedExtension : string[];

        /**
         * Load asset.
         * @param assetName 
         */
        loadAsset(assetName : string) : void;
    }

}