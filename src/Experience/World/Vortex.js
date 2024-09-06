import * as THREE from 'three'
import Model from './Abstracts/Model.js'
import Experience from '../Experience.js'
import Debug from '../Utils/Debug.js'
import State from "../State.js";
import Materials from "../Materials/Materials.js";
import FBO from '../Utils/FBO.js'

import VortexVertexShader from '../Shaders/Vortex/vertex.glsl'
import VortexFragmentShader from '../Shaders/Vortex/fragment.glsl'

export default class Vortex extends Model {
    experience = Experience.getInstance()
    debug = Debug.getInstance()
    state = State.getInstance()
    materials = Materials.getInstance()
    fbo = FBO.getInstance()
    sizes = this.experience.sizes
    scene = experience.scene
    time = experience.time
    camera = experience.camera.instance
    renderer = experience.renderer.instance
    resources = experience.resources
    container = new THREE.Group();

    constructor() {
        super()

        this.setModel()
        this.setDebug()
    }

    setModel() {
        this.source = this.resources.items.circleModel
        this.circleModel = this.source.scene.children[0]

        const noiseTexture = this.resources.items.noiseTexture
        noiseTexture.colorSpace = THREE.LinearSRGBColorSpace
        noiseTexture.wrapS = THREE.RepeatWrapping
        noiseTexture.wrapT = THREE.RepeatWrapping

        const vortexMaterial = this.material = new THREE.ShaderMaterial( {
            uniforms: {
                uTime: new THREE.Uniform( this.time.elapsed ),
                uMap: new THREE.Uniform( noiseTexture ),
                uAlpha: new THREE.Uniform( 0.57 ),
                uScale: new THREE.Uniform( 0.43 ),
                uShear: new THREE.Uniform( -0.312 ),
                uSpeed: new THREE.Uniform( 0.02 ),

                uRange1: new THREE.Uniform( new THREE.Vector2( 0.0, 0.59 ) ),
                uRange2: new THREE.Uniform( new THREE.Vector2( 1.0, 0.5 ) ),
                uRange3: new THREE.Uniform( new THREE.Vector2( 0.0, 0.3 ) ),

                uColor1: new THREE.Uniform( new THREE.Color(
                    0.3,
                    0.2,
                    0.5 ) ),
                uColor2: new THREE.Uniform( new THREE.Color(
                    0.9,
                    0.96,
                    0.8 ) ),
            },
            vertexShader: VortexVertexShader,
            fragmentShader: VortexFragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: true,
            depthTest: false,
            blending: THREE.AdditiveBlending
        } )

        this.circleModel.material = vortexMaterial
    }

    resize() {

    }

    setDebug() {
        if ( !this.debug.active ) return

        //this.debug.createDebugTexture( this.rrt.texture )

        this.debugFolder = this.debug.panel.addFolder( "Vortex" );

        this.debugFolder.add( this.material.uniforms.uAlpha, 'value' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uAlpha' )
        this.debugFolder.add( this.material.uniforms.uScale, 'value' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uScale' )
        this.debugFolder.add( this.material.uniforms.uShear, 'value' )
            .min( -1 ).max( 1 ).step( 0.001 ).name( 'uShear' )
        this.debugFolder.add( this.material.uniforms.uSpeed, 'value' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uSpeed' )
        this.debugFolder.add( this.material.uniforms.uRange1.value, 'x' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uRange1.x' )
        this.debugFolder.add( this.material.uniforms.uRange1.value, 'y' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uRange1.y' )
        this.debugFolder.add( this.material.uniforms.uRange2.value, 'x' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uRange2.x' )
        this.debugFolder.add( this.material.uniforms.uRange2.value, 'y' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uRange2.y' )
        this.debugFolder.add( this.material.uniforms.uRange3.value, 'x' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uRange3.x' )
        this.debugFolder.add( this.material.uniforms.uRange3.value, 'y' )
            .min( 0 ).max( 1 ).step( 0.001 ).name( 'uRange3.y' )
        this.debugFolder.addColor( this.material.uniforms.uColor1, 'value' )
            .name( 'uColor1' )
        this.debugFolder.addColor( this.material.uniforms.uColor2, 'value' )
            .name( 'uColor2' )
    }

    update( deltaTime ) {
        if(this.material)
            this.material.uniforms.uTime.value = this.time.elapsed
    }

}
