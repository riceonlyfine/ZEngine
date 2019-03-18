/// <reference path="../Objects/TObject.ts" />

namespace ZE {

    /**
     * Represents a single node in the world. Node themselves do not get rendered or have behaviors.
     * The do, however, have transforms and may have child nodes. Components and behaviors may be
     * attached to node to decorate functionality.
     */
    export class Node extends TObject {

        private _children: Node[] = [];
        private _parent: Node;
        private _isLoaded: boolean = false;
        private _sceneGraph: SceneGraph;
        private _components: IComponent[] = [];
        private _behaviors: IBehavior[] = [];
        private _isVisible: boolean = true;

        private _localMatrix: Matrix4x4 = Matrix4x4.identity();
        private _worldMatrix: Matrix4x4 = Matrix4x4.identity();

        /** The name of this object. */
        public name: string;

        /** The transform of this node. */
        public transform: Transform = new Transform();

        /**
         * Creates a new node.
         * @param name The name of this node.
         * @param sceneGraph The scenegraph to which this node belongs.
         */
        public constructor( name: string, sceneGraph?: SceneGraph ) {
            super();
            this.name = name;
            this._sceneGraph = sceneGraph;
        }

        /** Returns the parent of this node. */
        public get parent(): Node {
            return this._parent;
        }

        /** Returns the world transformation matrix of this node. */
        public get worldMatrix(): Matrix4x4 {
            return this._worldMatrix;
        }

        /** Indicates if this node has been loaded. */
        public get isLoaded(): boolean {
            return this._isLoaded;
        }

        /** Indicates if this node is currently visible. */
        public get isVisible(): boolean {
            return this._isVisible;
        }

        /** Sets visibility of this node. */
        public set isVisible( value: boolean ) {
            this._isVisible = value;
        }

        /**
         * Adds the provided node as a child of this one.
         * @param child The child to be added.
         */
        public addChild( child: Node ): void {
            child._parent = this;
            this._children.push( child );
            child.onAdded( this._sceneGraph );
        }

        /**
         * Attempts to remove the provided node as a child of this one, if it is in fact 
         * a child of this node. Otherwise, nothing happens.
         * @param child The child to be added.
         */
        public removeChild( child: Node ): void {
            let index = this._children.indexOf( child );
            if ( index !== -1 ) {
                child._parent = undefined;
                this._children.splice( index, 1 );
            }
        }

        /**
         * Recursively attempts to retrieve a component with the given name from this node or its children.
         * @param name The name of the component to retrieve.
         */
        public getComponentByName( name: string ): IComponent {
            for ( let component of this._components ) {
                if ( component.name === name ) {
                    return component;
                }
            }

            for ( let child of this._children ) {
                let component = child.getComponentByName( name );
                if ( component !== undefined ) {
                    return component;
                }
            }

            return undefined;
        }

        /**
        * Recursively attempts to retrieve a behavior with the given name from this node or its children.
        * @param name The name of the behavior to retrieve.
        */
        public getBehaviorByName( name: string ): IBehavior {
            for ( let behavior of this._behaviors ) {
                if ( behavior.name === name ) {
                    return behavior;
                }
            }

            for ( let child of this._children ) {
                let behavior = child.getBehaviorByName( name );
                if ( behavior !== undefined ) {
                    return behavior;
                }
            }

            return undefined;
        }

        /**
        * Recursively attempts to retrieve a child node with the given name from this node or its children.
        * @param name The name of the node to retrieve.
        */
        public getNodeByName( name: string ): Node {
            if ( this.name === name ) {
                return this;
            }

            for ( let child of this._children ) {
                let result = child.getNodeByName( name );
                if ( result !== undefined ) {
                    return result;
                }
            }

            return undefined;
        }

        /**
         * Adds the given component to this node.
         * @param component The component to be added.
         */
        public addComponent( component: IComponent ): void {
            this._components.push( component );
            component.setOwner( this );
        }

        /**
         * Adds the given behavior to this node.
         * @param behavior The behavior to be added.
         */
        public addBehavior( behavior: IBehavior ): void {
            this._behaviors.push( behavior );
            behavior.setOwner( this );
        }

        /** Performs loading procedures on this node. */
        public load(): void {
            this._isLoaded = true;

            for ( let c of this._components ) {
                c.load();
            }

            for ( let c of this._children ) {
                c.load();
            }
        }

        /** Performs pre-update procedures on this node. */
        public updateReady(): void {
            for ( let c of this._components ) {
                c.updateReady();
            }

            for ( let b of this._behaviors ) {
                b.updateReady();
            }

            for ( let c of this._children ) {
                c.updateReady();
            }
        }

        /**
         * Performs update procedures on this node (recurses through children, 
         * components and behaviors as well).
         * @param time The delta time in milliseconds since the last update call.
         */
        public update( time: number ): void {

            this._localMatrix = this.transform.getTransformationMatrix();
            this.updateWorldMatrix( ( this._parent !== undefined ) ? this._parent.worldMatrix : undefined );

            for ( let c of this._components ) {
                c.update( time );
            }

            for ( let b of this._behaviors ) {
                b.update( time );
            }

            for ( let c of this._children ) {
                c.update( time );
            }
        }

        /**
         * Renders this node and its children.
         * @param shader The shader to use when rendering/
         */
        public render( shader: Shader ): void {
            if ( !this._isVisible ) {
                return;
            }

            for ( let c of this._components ) {
                c.render( shader );
            }

            for ( let c of this._children ) {
                c.render( shader );
            }
        }

        /** Returns the world position of this node. */
        public getWorldPosition(): Vector3 {
            return new Vector3( this._worldMatrix.data[12], this._worldMatrix.data[13], this._worldMatrix.data[14] );
        }

        /**
         * Called when this node is added to a scene graph.
         * @param sceneGraph The scenegraph to which this node was added.
         */
        protected onAdded( sceneGraph: SceneGraph ): void {
            this._sceneGraph = sceneGraph;
        }

        private updateWorldMatrix( parentWorldMatrix: Matrix4x4 ): void {
            if ( parentWorldMatrix !== undefined ) {
                this._worldMatrix = Matrix4x4.multiply( parentWorldMatrix, this._localMatrix );
            } else {
                this._worldMatrix.copyFrom( this._localMatrix );
            }
        }
    }
}