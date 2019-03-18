﻿namespace ZE {

    /**
     * Manages levels in the engine. Levels (for now) are registered with this manager
     * so that they may be loaded on demand. Register a scene name
     * with a file path and load the scene configurations dynamically.
     */
    export class ScenelManager {

        private static _registeredScenes: { [name: string]: string } = {};
        private static _activeScene: Scene;
        private static _configLoaded: boolean = false;

        /** Private constructor to enforce singleton pattern. */
        private constructor() {
        }

        /** Indicates if this manager is loaded. */
        public static get isLoaded(): boolean {
            return ScenelManager._configLoaded;
        }

        /** Loads this manager. */
        public static load(): void {

            // Get the asset(s). TODO: This probably should come from a central asset manifest.
            let asset = AssetManager.getAsset( "assets/levels/levels.json" );
            if ( asset !== undefined ) {
                ScenelManager.processLevelConfigAsset( asset as JsonAsset );
            } else {

                // Listen for the asset load.
                Message.subscribeCallback( MESSAGE_ASSET_LOADER_ASSET_LOADED + "assets/levels/levels.json",
                    ScenelManager.onMessage );
            }
        }

        /**
         * Changes the active scene to the one with the provided name.
         * @param name The name of the scene to change to.
         */
        public static changeScene( name: string ): void {
            if ( ScenelManager._activeScene !== undefined ) {
                ScenelManager._activeScene.onDeactivated();
                ScenelManager._activeScene.unload();
                ScenelManager._activeScene = undefined;
            }

            // Make sure the scene is registered.
            if ( ScenelManager._registeredScenes[name] !== undefined ) {

                // If the scene asset is already loaded, get it and use it to load the scene.
                // Otherwise, retrieve the asset and load the scene upon completion.
                if ( AssetManager.isAssetLoaded( ScenelManager._registeredScenes[name] ) ) {
                    let asset = AssetManager.getAsset( ScenelManager._registeredScenes[name] );
                    ScenelManager.loadScene( asset );
                } else {
                    Message.subscribeCallback( MESSAGE_ASSET_LOADER_ASSET_LOADED + ScenelManager._registeredScenes[name], ScenelManager.onMessage );
                    AssetManager.loadAsset( ScenelManager._registeredScenes[name] );
                }
            } else {
                throw new Error( "scene named:" + name + " is not registered." );
            }
        }

        /**
         * Updates this manager.
         * @param time The delta time in milliseconds since the last update.
         */
        public static update( time: number ): void {
            if ( ScenelManager._activeScene !== undefined ) {
                ScenelManager._activeScene.update( time );
            }
        }

        /**
         * Renders the scene with the provided shader.
         * @param shader The shader to render with.
         */
        public static render( shader: Shader ): void {
            if ( ScenelManager._activeScene !== undefined ) {
                ScenelManager._activeScene.render( shader );
            }
        }

        /**
         * The message handler.
         * @param message The message to be handled.
         */
        public onMessage( message: Message ): void {

        }

        /**
         * The message handler.
         * @param message The message to be handled.
         */
        public static onMessage( message: Message ): void {

            // TODO: one for each asset.
            if ( message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + "assets/levels/levels.json" ) {
                Message.unsubscribeCallback( MESSAGE_ASSET_LOADER_ASSET_LOADED + "assets/levels/levels.json",
                    ScenelManager.onMessage );

                ScenelManager.processLevelConfigAsset( message.context as JsonAsset );
            } else if ( message.code.indexOf( MESSAGE_ASSET_LOADER_ASSET_LOADED ) !== -1 ) {
                console.log( "scene loaded:" + message.code );
                let asset = message.context as JsonAsset;
                ScenelManager.loadScene( asset );
            }
        }

        private static loadScene( asset: JsonAsset ): void {
            console.log( "Loading scene:" + asset.name );
            let data = asset.data;

            let levelName: string;
            if ( data.name === undefined ) {
                throw new Error( "Zone file format exception: Zone name not present." );
            } else {
                levelName = String( data.name );
            }

            let description: string;
            if ( data.description !== undefined ) {
                description = String( data.description );
            }

            ScenelManager._activeScene = new Scene( levelName, description );
            ScenelManager._activeScene.initialize( data );
            ScenelManager._activeScene.onActivated();
            ScenelManager._activeScene.load();


            Message.send( "LEVEL_LOADED", this );
        }

        private static processLevelConfigAsset( asset: JsonAsset ): void {

            let levels = asset.data.levels;
            if ( levels ) {
                for ( let scene of levels ) {
                    if ( scene.name !== undefined && scene.file !== undefined ) {
                        ScenelManager._registeredScenes[scene.name] = String( scene.file );
                    } else {
                        throw new Error( "Invalid scene config file format: name or file is missing" );
                    }
                }
            }

            // TODO: Should only set this if ALL queued assets have loaded.
            ScenelManager._configLoaded = true;
        }
    }
}