namespace ZE {

    export interface IComponentData {
        name: string;

        setFromJson( json: any ): void;
    }
}