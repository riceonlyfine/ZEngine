namespace ZE{

    /**
     * Repersents the data for a single vertex.
     */
    export class Vertex{

        public positon : Vector3 = Vector3.zero;
        public texCoords : Vector2 = Vector2.zero;


        public constructor(x : number = 0, y : number = 0, z : number = 0, tu : number = 0, tv : number = 0){
            this.positon.x = x;
            this.positon.y = y;
            this.positon.z = z;
            
            this.texCoords.x = tu;
            this.texCoords.y = tv;
        }

        public toArray() : number[]{
            let array : number[] = [];
            array = array.concat(this.positon.toArray());
            array = array.concat(this.texCoords.toArray());
            return array;
        }

        public toFloat32Array() : Float32Array{
            return new Float32Array(this.toArray());
        }
    }
}