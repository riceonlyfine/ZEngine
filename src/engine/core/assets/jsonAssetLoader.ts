namespace ZE{

    /**
     * The Json type asset loader.
     */
    export class JsonAssetLoader implements IAssetLoader {

        /**
         * Gets the suppored image extensions.
         */
        public get supportedExtension(): string[]{
            return ["json"];
        }

        /**
         * Load Json type asset.
         * @param assetName  json url.
         */
        public loadAsset(assetName: string): void {
            let request : XMLHttpRequest = new XMLHttpRequest();
            request.open("GET", assetName);
            request.addEventListener("load", this.onJsonLoaded.bind(this, assetName, request));
            request.send();
        }
       
        private onJsonLoaded(assetName : string, request : XMLHttpRequest, event : ProgressEvent) : void{
            console.log("onJsonLoaded: assetName/request", assetName, request);
            
            if(request.readyState == request.DONE){
                let json = JSON.parse(request.responseText);
                let asset = new JsonAsset(assetName, json);
                AssetManager.onAssetLoaded(asset);
            }
        }
    }
}