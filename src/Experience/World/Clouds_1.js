import * as THREE from 'three'
import Model from './Abstracts/Model.js'
import Experience from '../Experience.js'
import Debug from '../Utils/Debug.js'
import State from "../State.js";
import Materials from "../Materials/Materials.js";

import CloudInstanceVertexShader from '../Shaders/CloudInstance/vertex.glsl'
import CloudInstanceFragmentShader from '../Shaders/CloudInstance/fragment.glsl'


export default class Clouds_1 extends Model {
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
        const clouds_object = this.resources.items.clouds1Attribute

        // create geometry
        const geometry = new THREE.InstancedBufferGeometry()
        geometry.instanceCount = 846
        geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( [0,2,1,2,3,1] ), 1 ) )

        geometry.setAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( clouds_object.offset ), 3 ) )
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( new Float32Array( clouds_object.position ), 3 ) )
        geometry.setAttribute( 'random', new THREE.InstancedBufferAttribute( new Float32Array( clouds_object.random ), 4 ) )
        geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( new Float32Array( clouds_object.uv ), 2 ) )

        const nebula1Texture = this.resources.items.nebula1Texture
        nebula1Texture.colorSpace = THREE.LinearSRGBColorSpace

        const material = this.material = new THREE.ShaderMaterial( {
            uniforms: {
                uTime: new THREE.Uniform( this.time.elapsed ),
                tMap: new THREE.Uniform( nebula1Texture ),
                uFade: new THREE.Uniform( 0.758 ),
                uRandomSize: new THREE.Uniform( new THREE.Vector3( 0.15, 1.32, 0.289 ) ),
                uRotateSpeed: new THREE.Uniform( 0.018 ),
                uStarBrightness: new THREE.Uniform( 2.07 ),
            },
            vertexShader: CloudInstanceVertexShader,
            fragmentShader: CloudInstanceFragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: true,
            depthTest: false,
            //depthFunc: THREE.LessEqualDepth,
            blending: THREE.AdditiveBlending
        } )

        // create instanced mesh
        const mesh = new THREE.Mesh( geometry, material )

        this.container.add( mesh )
        this.scene.add( this.container )
    }

    resize() {

    }

    setDebug() {
        if ( !this.debug.active ) return

        //this.debug.createDebugTexture( this.resources.items.displacementTexture )
    }

    update( deltaTime ) {

        if(this.material){
            this.material.uniforms.uTime.value = this.time.elapsed
        }


        //this.cube2.rotation.y += deltaTime * 20
        //this.cube.rotation.y += deltaTime * 30
    }

}
