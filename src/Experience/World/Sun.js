import * as THREE from 'three'
import Experience from '../Experience.js'
import sunVertexShader from '../Shaders/Sun/vertex.glsl'
import sunFragmentShader from '../Shaders/Sun/fragment.glsl'
import {vec2} from "three/nodes";
import gsap from "gsap";
export default class Sun {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer.instance
        this.timeline = this.experience.timeline

        this.parameters = {
            position: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(0, 0, 0),
            width: 0.5,
            height: 0.5,
        }


        this.setModel()
        this.setDebug()
    }

    setModel() {
        //this.experience.resources.items.sunColorTexture.encoding = THREE.sRGBEncoding
        this.experience.resources.items.sunColorTexture.colorSpace = THREE.SRGBColorSpace

        //this.experience.resources.items.sunColorTexture.repeat.set(1.5, 1.5)
        this.experience.resources.items.sunColorTexture.wrapS = THREE.RepeatWrapping
        this.experience.resources.items.sunColorTexture.wrapT = THREE.RepeatWrapping

        this.geometry = new THREE.PlaneGeometry( this.parameters.width, this.parameters.height, 128, 128 );
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
        this.sun.position.copy(this.parameters.position);
        this.sun.scale.copy(this.parameters.scale);

        this.scene.add(this.sun);
    }

    setScaleAnimation() {
        this.timeline.add(
            gsap.to(this.sun.scale, {
                duration: 30,
                x: 1.0,
                y: 1.0,
                z: 1.0,
                ease: "power1.inOut",
            }),
            "start"
        )
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.1
        this.sun.lookAt(this.camera.instance.position)
    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Sun')
            this.debugFolder.add(this.sun.position, 'x').min(-10).max(10).step(0.1)
            this.debugFolder.add(this.sun.position, 'y').min(-10).max(10).step(0.1)
            this.debugFolder.add(this.sun.position, 'z').min(-10).max(10).step(0.1)
        }
    }
}
