namespace ZE{

    /**
     * The asset interface.
     */
    export interface IAsset{
        /**
         * The asset name.
         */
       readonly name : string;

       /**
        * The asset data.
        */
       readonly data : any;
    }

}