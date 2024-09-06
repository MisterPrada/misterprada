import * as THREE from 'three'
import Model from './Abstracts/Model.js'
import Experience from '../Experience.js'
import Debug from '../Utils/Debug.js'
import State from "../State.js";
import Materials from "../Materials/Materials.js";

import GalaxyParticlesVertexShader from '../Shaders/GalaxyParticles/vertex.glsl'
import GalaxyParticlesFragmentShader from '../Shaders/GalaxyParticles/fragment.glsl'

export default class Points_1 extends Model {
    experience = Experience.getInstance()
    debug = Debug.getInstance()
    state = State.getInstance()
    materials = Materials.getInstance()
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
        this.source = this.resources.items.points1Model
        this.pointsModel = this.source.scene.children[0]

        const material = this.material = new THREE.ShaderMaterial( {
            uniforms: {
                uTime: new THREE.Uniform( this.time.elapsed ),
                uResolution: new THREE.Uniform( new THREE.Vector2( this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio ) ),
                uAlpha: new THREE.Uniform( 1.0 ),
                uRotateSpeed: new THREE.Uniform( 0.019 ),
                uScale: new THREE.Uniform( 1.0 ),
            },
            vertexShader: GalaxyParticlesVertexShader,
            fragmentShader: GalaxyParticlesFragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: true,
            depthTest: false,
            blending: THREE.AdditiveBlending,
        } )

        // create instanced mesh
        const mesh = new THREE.Points( this.pointsModel.geometry, material )

        this.container.add( mesh )
    }

    resize() {
        if ( this.material ) {
            this.material.uniforms.uResolution.value.set( this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio )
        }
    }

    setDebug() {
        if ( !this.debug.active ) return

        //this.debug.createDebugTexture( this.resources.items.displacementTexture )
    }

    update( deltaTime ) {
        if ( this.material ) {
            this.material.uniforms.uTime.value = this.time.elapsed
        }
    }

}
