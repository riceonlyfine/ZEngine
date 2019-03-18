namespace ZE{

    export interface IGame{

        updateReady() : void;

        update(time : number) : void;

        render(shader : Shader) : void;
    }

}