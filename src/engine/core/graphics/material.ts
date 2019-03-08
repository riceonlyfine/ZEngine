namespace ZE{
    export class Material {
        private _name : string;
        private _diffuseTextureName : string;
        private _diffuseTexture : Texture;
        private _tint : Color;


        public constructor(name : string, diffuseTextureName : string, tint : Color){
            this._name = name;
            this._diffuseTextureName = diffuseTextureName;
            this._tint = tint;

            if(this._diffuseTextureName !== undefined){
                this._diffuseTexture = TextureManger.getTexture(this._diffuseTextureName);
            }
        }

        public get name() : string{
            return this._name;
        }

        public get diffuseTextureName () : string{
            return this._diffuseTextureName;
        }

        public set setDiffuseTextureName (value : string){
            if(this._diffuseTexture !== undefined){
                TextureManger.releaseTexture(this._diffuseTextureName);
            }

            this._diffuseTextureName = value;

            if(this._diffuseTextureName !== undefined){
                this._diffuseTexture = TextureManger.getTexture(this._diffuseTextureName);
            }
        }

        public get tint() : Color{
            return this._tint;
        }

        public get diffuseTexture() : Texture{
            return this._diffuseTexture;
        }

        public destroy() : void{
            TextureManger.releaseTexture(this._diffuseTextureName);
            this._diffuseTexture = undefined;
        }

    }
}