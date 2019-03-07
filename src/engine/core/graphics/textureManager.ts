namespace ZE{

    export class TextureRefereneceNode {
        public Texture : Texture;
        public refereneceCount : number = 1;

        public constructor(texture : Texture){
            this.Texture = texture;
        }
    }

    export class TextureManger{

        private static _textures : {[name : string] : TextureRefereneceNode} = {};

        private constructor(){

        }

        public static getTexture(textureName : string) : Texture{
            if(TextureManger._textures[textureName] === undefined){
                let texture = new Texture(textureName);
                TextureManger._textures[textureName] = new TextureRefereneceNode(texture);
            } else {
                TextureManger._textures[textureName].refereneceCount++;
            }

            return TextureManger._textures[textureName].Texture;
        }

        public static releaseTexture(textureName : string) : void{
            if(TextureManger._textures[textureName] === undefined){
                console.warn(`Texture named :'${textureName}' does not exist and threfor cannot be released.`);
            } else {
                TextureManger._textures[textureName].refereneceCount--;
                if(TextureManger._textures[textureName].refereneceCount < 1){
                    TextureManger._textures[textureName].Texture.destroy();
                    TextureManger._textures[textureName] = undefined;
                    delete TextureManger._textures[textureName];
                }
            }
        }
    }
}