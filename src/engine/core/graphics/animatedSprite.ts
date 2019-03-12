/// <reference path="./sprite.ts" />

namespace ZE {

    class UVInfo {
        public min: Vector2;
        public max: Vector2;

        public constructor(min: Vector2, max: Vector2) {
            this.min = min;
            this.max = max;
        }
    }

    export class AnimatedSprite extends Sprite implements IMessageHandler {



        private _frameHeight: number;
        private _frameWidth: number;
        private _frameCount: number;
        private _frameSequence: number[];

        // TODO : Make this configureable.
        private _frameTime: number = 333;
        private _frameUVs: UVInfo[] = [];
        private _currentFrame: number = 0;
        private _currentTime: number = 0;
        private _assetLoaded : boolean = false;
        private _assetWidth : number;
        private _assetHeight : number;


        public constructor(name: string, materialName: string, width: number = 100, height: number = 100, frameWidth: number = 10, frameHeight: number = 1, frameCount: number = 1, frameSequence: number[] = []) {
            super(name, materialName, width, height);

            this._frameWidth = frameWidth;
            this._frameHeight = frameHeight;
            this._frameCount = frameCount;
            this._frameSequence = frameSequence;

            Message.subscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + this._material.diffuseTextureName, this);
        }

        public destroy(): void {
            super.destroy();

            Message.unsubscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + this._material.diffuseTextureName, this);
        }

        /**
         * The message handler for this component.
         * @param message 
         */
        public onMessage(message: Message): void {
            if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + this._material.diffuseTextureName) {
                let asset = message.context as ImageAsset;
                this._assetWidth =  asset.width;
                this._assetHeight = asset.height;
                this._assetLoaded = true;
                this.calculateUVs();
            }
        }

        public load(): void {
            super.load();
        }

        public update(time: number): void {
            if(!this._assetLoaded){
                return;
            }

            this._currentTime += time;
            if (this._currentTime > this._frameTime) {
                this._currentFrame++;
                this._currentTime = 0;

                if (this._currentFrame >= this._frameSequence.length) {
                    this._currentFrame = 0;
                }

                let frameUVs = this._frameSequence[this._currentFrame];
                this._vertices[0].texCoords.copyFrom(this._frameUVs[frameUVs].min);
                this._vertices[1].texCoords = new Vector2(this._frameUVs[frameUVs].min.x, this._frameUVs[frameUVs].max.y);
                this._vertices[2].texCoords.copyFrom(this._frameUVs[frameUVs].max);
                this._vertices[3].texCoords.copyFrom(this._frameUVs[frameUVs].max);
                this._vertices[4].texCoords = new Vector2(this._frameUVs[frameUVs].max.x, this._frameUVs[frameUVs].min.y);
                this._vertices[5].texCoords.copyFrom(this._frameUVs[frameUVs].min);


                this._bufffer.clearData();
                for (let v of this._vertices) {
                    this._bufffer.pushBackData(v.toArray());
                }

                this._bufffer.upload();
                this._bufffer.unbind();
            }

            super.update(time);
        }

        private calculateUVs(): void {
            let totalWidth: number = 0;
            let yValue: number = 0;
            for (let i = 0; i < this._frameCount; ++i) {
                totalWidth += i * this._frameWidth;
                if (totalWidth > this._assetWidth) {
                    yValue++;
                    totalWidth = 0;
                }

                let u = (i * this._frameWidth) / this._assetWidth;
                let v = (yValue * this._frameHeight) / this._assetHeight;
                let min: Vector2 = new Vector2(u, v);

                let uMax = (i * this._frameWidth + this._frameWidth) / this._assetWidth;
                let vMax = (yValue * this._frameHeight + this._frameHeight) / this._assetHeight;
                let max: Vector2 = new Vector2(uMax, vMax);

                this._frameUVs.push(new UVInfo(min, max));
            }
        }

    }

}