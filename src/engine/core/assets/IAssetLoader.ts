namespace ZE{

    export interface IAssetLoader{
        readonly supportedExtension : string[];
        loadAsset(assetName : string) : void;
    }

}