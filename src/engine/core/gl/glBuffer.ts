namespace ZE{

    /**
     * Represents the information needed for a GLBuffer attribute.
     */
    export class AttributeInfo {
        /**
         * The location of this attribute.
         */
        public location : number;

        /**
         * The size (number of elements) in this attribute (i.e Vector3 = 3).
         */
        public size : number;

        /**
         * The number of elements from the beginning of the buffer.
         */
        public offset : number;
    }

    /**
     * Repersents a WebGL buffer.
     */
    export class GLBuffer{

        private _hasAttributeLocaiton : boolean = false;
        private _elementSize : number;
        private _stride : number;
        private _buffer : WebGLBuffer;

        private _targetBuffType : number;
        private _dataType : number;
        private _mode : number;
        private _typeSize : number;

        private _data : number[] = [];
        private _attributes : AttributeInfo[] = [];
        

        /**
         * Create a new GL buffer.
         * @param elementSize  the size of the element size.
         * @param dataType  The data type of this buffer. Default : gl.FLOAT.
         * @param targetBufferType The buffer target type. gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER. Default ： gl.ARRAY_BUFFER.
         * @param mode  The drawing mode of this buffer.(i.e. gl.TRANGLES or gl.LINES). Default : gl.TRANGLES.
         */
        public constructor(elementSize : number, dataType : number = gl.FLOAT, targetBufferType : number = gl.ARRAY_BUFFER, mode : number = gl.TRIANGLES){
            this._elementSize = elementSize;
            this._dataType = dataType;
            this._targetBuffType = targetBufferType;
            this._mode = mode;

            // Determine byte size
            switch( this._dataType ){
                case gl.FLOAT:
                case gl.INT:
                case gl.UNSIGNED_INT:
                    this._typeSize = 4;
                    break;
                case gl.SHORT:
                case gl.UNSIGNED_SHORT:
                    this._typeSize = 2;
                    break;
                case gl.BYTE:
                case gl.UNSIGNED_BYTE:
                    this._typeSize = 1;
                    break;
                default:
                    throw new Error("Unrecognized data type:" + dataType.toString());
            }

            this._stride = this._elementSize * this._typeSize;
            this._buffer = gl.createBuffer();
        }

        /**
         * Destroy this buffer.
         */
        public destroy() : void{
            gl.deleteBuffer(this._buffer);
        }

        /**
         * Bind this buffer.
         * @param normalized Indicates if the  data should be normalized.
         */
        public bind(normalized : boolean = false) : void{
            gl.bindBuffer(this._targetBuffType, this._buffer);

            if(this._hasAttributeLocaiton){
                for(let it of this._attributes){
                    gl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stride, it.offset * this._typeSize);
                    gl.enableVertexAttribArray(it.location);
                }
            }
        }

        /**
         * Unbind this buffer.
         */
        public unbind() : void{
            
            for(let it of this._attributes){
                gl.disableVertexAttribArray(it.location);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        }


        /**
         * Adds an attribute with the provided infomation to this buffer.
         * @param info 
         */
        public addAttributeLocation(info : AttributeInfo) : void{
            this._hasAttributeLocaiton = true;
            this._attributes.push(info);
        }


        /**
         * Adds data to this buffer.
         * @param data 
         */
        public pushBackData(data : number[]) : void{
           for(let d of data){
                this._data.push(d);
           }
        }

        /**
         * Uploads this buffer's data to the GPU.
         */
        public upload() : void{
            gl.bindBuffer(this._targetBuffType, this._buffer);

            // let bufferData : ArrayBuffer;
            let bufferData;
            switch( this._dataType ){
                case gl.FLOAT:
                    bufferData = new Float32Array(this._data);
                    break;
                case gl.INT:
                    bufferData = new Int32Array(this._data);
                    break;
                case gl.UNSIGNED_INT:
                    bufferData = new Uint32Array(this._data);
                    break;
                case gl.SHORT:
                    bufferData = new Int16Array(this._data);
                    break;
                case gl.UNSIGNED_SHORT:
                    bufferData = new Uint16Array(this._data);
                    break;
                case gl.BYTE:
                    bufferData = new Int8Array(this._data);
                    break;
                case gl.UNSIGNED_BYTE:
                    bufferData = new Uint8Array(this._data);
                    break;
            }

            gl.bufferData(this._targetBuffType, bufferData, gl.STATIC_DRAW);
        }

        /**
         * Draws this buffer.
         */
        public draw() : void{
            if(this._targetBuffType === gl.ARRAY_BUFFER){
                gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
            } else if(this._targetBuffType === gl.ELEMENT_ARRAY_BUFFER){
                gl.drawElements(this._mode, this._data.length, this._dataType, 0);
            }
        }
    }
}