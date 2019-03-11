namespace ZE{

    export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED::";

    /**
     * The assetmanager manages all kinds of assets.
     */
    export class AssetManager{

        /**
         * The loader of all kinds of asset.
         */
        private static _loaders : IAssetLoader[] = [];

        /**
         * The loaded assets stores in here.
         */
        private static _loadedAssets : {[name : string] : IAsset} = {};

        private constructor(){
        }

        /**
         * Initialize the assetmanage.
         */
        public static initialize() : void{

            // reg image loader
            AssetManager._loaders.push(new ImageAssetLoader());

            // reg json loader
            AssetManager._loaders.push(new JsonAssetLoader());
        }

        /**
         * Register a asset loader.
         * @param loader 
         */
        public static registerLoader(loader : IAssetLoader) : void{
            AssetManager._loaders.push(loader);
        }

        /**
         *  This method is called When a asset is loaded.
         * @param asset 
         */
        public static onAssetLoaded(asset : IAsset) : void{
            AssetManager._loadedAssets[asset.name] = asset;
            Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
        }

        /**
         * Start Load a asset.
         * @param assetName 
         */
        public static loadAsset(assetName : string) : void{
            let extension = assetName.split('.').pop().toLocaleLowerCase();
            for(let l of AssetManager._loaders){
                if(l.supportedExtension.indexOf(extension) !== -1){
                    l.loadAsset( assetName);
                    return;
                }
            }

            console.warn("Unable to load asset with extension " + extension + ", because there is no loader associated with it.")
        }

        /**
         * Return If is the given asset is loaded already.
         * @param assetName 
         */
        public static isAssetLoaded(assetName : string) : boolean{
            return AssetManager._loadedAssets[assetName] !== undefined;
        }

        /**
         * Gets the asset if loaded or start loading this asset.
         * @param assetName 
         */
        public static getAsset( assetName : string) : IAsset{
            if(AssetManager._loadedAssets[assetName] !== undefined){
                return AssetManager._loadedAssets[assetName];
            } else {
                AssetManager.loadAsset(assetName);
            }

            return undefined;
        }
    }
}