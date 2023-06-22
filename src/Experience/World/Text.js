import * as THREE from 'three'
import Experience from '../Experience.js'
import textVertexShader from '../Shaders/Text/vertex.glsl'
import textFragmentShader from '../Shaders/Text/fragment.glsl'
import gsap from "gsap";

export default class Text {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer.instance

        this.timeline = this.experience.timeline;

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
                },
            vertexShader: textVertexShader,
            fragmentShader: textFragmentShader
        } );
        this.text = new THREE.Mesh( this.geometry, this.material );
        this.text.position.y = -20;
        this.scene.add(this.text);
    }

    animateTextPosition() {
        this.timeline.add(
            gsap.to(this.text.position, {
                duration: 6,
                y: -2,
                ease: "power1.inOut",
            }),
            "start" // начало этой анимации совпадает с началом timeline
        )
    }

    update() {
        this.text.lookAt(this.camera.instance.position)
        this.material.uniforms.uTime.value = this.time.elapsed * 0.8
        this.timeline.time(this.experience.time.elapsed);
    }
}
