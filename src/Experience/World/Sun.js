import * as THREE from 'three'
import Experience from '../Experience.js'
import sunVertexShader from '../Shaders/Sun/vertex.glsl'
import sunFragmentShader from '../Shaders/Sun/fragment.glsl'
import {vec2} from "three/nodes";
export default class Sun {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.renderer = this.experience.renderer.instance


        this.experience.resources.items.sunColorTexture.encoding = THREE.sRGBEncoding
        //this.experience.resources.items.sunColorTexture.repeat.set(1.5, 1.5)
        this.experience.resources.items.sunColorTexture.wrapS = THREE.RepeatWrapping
        this.experience.resources.items.sunColorTexture.wrapT = THREE.RepeatWrapping

        this.geometry = new THREE.PlaneGeometry( 5, 5, 128, 128 );
        this.material = new THREE.ShaderMaterial( {
            //wireframe: true,
            //side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: true,
            //vertexColors: true,
            //transparent: true,
            blending: THREE.AdditiveBlending ,
            uniforms:
                {
                    uTime: { value: 0 },
                    uResolution: { value: new THREE.Vector2(128, 128) },
                    iChannel0: { value: this.experience.resources.items.sunColorTexture },
                },
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader
        } );
        this.sun = new THREE.Mesh( this.geometry, this.material );

        this.scene.add(this.sun);
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.1
    }
}
