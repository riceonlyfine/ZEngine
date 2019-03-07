namespace ZE{

    /**
     * The iamge type asset loader.
     */
    export class ImageAssetLoader implements IAssetLoader {

        /**
         * Gets the suppored image extensions.
         */
        public get supportedExtension(): string[]{
            return ["png", "gif", "jpg"];
        }

        /**
         * Load image type asset.
         * @param assetName  image url.
         */
        public loadAsset(assetName: string): void {
            let image : HTMLImageElement = new Image();
            image.onload = this.onImageLoaded.bind(this, assetName, image);
            image.src = assetName;
        }


        /**
         * The calllback of when image is loaded.
         * @param assetName image url.
         * @param image image data.
         */
        private onImageLoaded(assetName : string, image : HTMLImageElement) : void{
            console.log("onImageLoaded: assetName/image", assetName, image);
            let asset = new ImageAsset(assetName, image);
            AssetManager.onAssetLoaded(asset);
        }
    }
}