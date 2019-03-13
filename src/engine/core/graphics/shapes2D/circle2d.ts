namespace ZE{

    export class Circle2D implements IShape2D {
        public position: Vector2 = Vector2.zero;

        public radius : number;

        public setFromJson(json: any): void {
            if(json.position !== undefined){
                this.position.setFromJson(json.position);
            }

            if(json.radius === undefined){
                throw new Error("Rectangle2D requires radius to be present.")
            } else {
                this.radius = Number(json.radius);
            }
        }

        public pointInShape(point : Vector2) : boolean{

            let absDistanbce = Math.abs(Vector2.distance(this.position, point));
            if(absDistanbce <= this.radius){
                return true;
            }

            return false;
        }


        public intersects(other : IShape2D) : boolean{

            if(other instanceof Circle2D){
                let distance = Vector2.distance(other.position, this.position);
                let radiusLength = this.radius + other.radius;
                if(distance <= radiusLength){
                    return true;
                }
            }

            return false;
        }
    }
}