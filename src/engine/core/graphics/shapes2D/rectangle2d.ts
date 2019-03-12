namespace ZE{

    export class Rectangle2D implements IShape2D{

        public position : Vector2 = Vector2.zero;

        public width : number;

        public height : number;

        public setFromJson(json : any) : void{

            if(json.position !== undefined){
                this.position.setFromJson(json.position);
            }

            if(json.width === undefined){
                throw new Error("Rectangle2D requires width to be present.")
            } else {
                this.width = Number(json.width);
            }

            if(json.height === undefined){
                throw new Error("Rectangle2D requires height to be present.")
            } else {
                this.height = Number(json.height);
            }

        }


        public pointInShape(point : Vector2) : boolean{
            if(point.x >= this.position.x && point.x <= this.position.x + this.width){
                if(point.y >= this.position.y && point.y <= this.position.y + this.height){
                    return true;
                }
            }
            return false;
        }


        public intersects(other : IShape2D) : boolean{

            if(other instanceof Rectangle2D){
                if(this.pointInShape(other.position) || 
                   this.pointInShape(new Vector2(other.position.x + other.width, other.position.y)) || 
                   this.pointInShape(new Vector2(other.position.x + other.width, other.position.y + other.position.height)) ||
                   this.pointInShape(new Vector2(other.position.x , other.position.y + other.position.height))){
                    return true;
                }
            }

            return false;
        }



    }
}