import * as THREE from 'three'
import Model from './Abstracts/Model.js'
import Experience from '../Experience.js'
import Debug from '../Utils/Debug.js'
import State from "../State.js";
import Materials from "../Materials/Materials.js";

import GalaxyCenterVertexShader from '../Shaders/GalaxyCenter/vertex.glsl'
import GalaxyCenterFragmentShader from '../Shaders/GalaxyCenter/fragment.glsl'

export default class WideGlow extends Model {
    experience = Experience.getInstance()
    debug = Debug.getInstance()
    state = State.getInstance()
    materials = Materials.getInstance()
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
        // add plane
        const geometry = new THREE.PlaneGeometry( 1, 1, 1, 1 )
        const material = new THREE.ShaderMaterial( {
            uniforms: {
            },
            vertexShader: GalaxyCenterVertexShader,
            fragmentShader: GalaxyCenterFragmentShader,
            side: THREE.DoubleSide,
            depthWrite: true,
            depthTest: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
        } )
        const plane = new THREE.Mesh( geometry, material )
        //plane.renderOrder = 8
        plane.position.set( 0, 0, 0 )
        plane.scale.set( 20, 5, 20 )
        this.container.add( plane )
        this.scene.add( this.container )
    }

    resize() {

    }

    setDebug() {
        if ( !this.debug.active ) return

        //this.debug.createDebugTexture( this.resources.items.displacementTexture )
    }

    update( deltaTime ) {
        //this.cube2.rotation.y += deltaTime * 20
        //this.cube.rotation.y += deltaTime * 30
    }

}
