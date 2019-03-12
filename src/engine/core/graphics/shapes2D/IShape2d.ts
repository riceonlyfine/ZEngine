namespace ZE{
    export interface IShape2D{
        position : Vector2;
        setFromJson(json : any) : void;
        intersects(shape : IShape2D) : boolean;
        pointInShape(point : Vector2) : boolean;
    }
}