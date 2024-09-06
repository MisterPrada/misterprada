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

        this.parameters = {
            opacity: 0.0
        }

        this.geometry = new THREE.PlaneGeometry( 5, 5, 128, 128 );
        this.material = new THREE.ShaderMaterial( {
            //wireframe: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: true,
            //vertexColors: true,
            //transparent: true,
            blending: THREE.AdditiveBlending ,
            uniforms:
                {
                    uTime: { value: 0 },
                    uOpacity: { value: this.parameters.opacity },
                    uResolution: { value: new THREE.Vector2(128, 128) },
                },
            vertexShader: textVertexShader,
            fragmentShader: textFragmentShader
        } );

        this.text = new THREE.Mesh( this.geometry, this.material );
        this.text.position.copy(new THREE.Vector3(0, -1, 0));
        this.text.scale.copy(new THREE.Vector3(0.4, 0.4, 0.4));
        this.scene.add(this.text);
    }

    animateTextShow() {
        this.timeline.add(
            gsap.to(this.material.uniforms.uOpacity, {
                duration: 3,
                delay: 2,
                value: 1,
                ease: "power1.inOut",
            }),
            "start"
        )
    }

    resize() {

    }

    update() {
        this.text.lookAt(this.camera.instance.position)
        this.material.uniforms.uTime.value = this.time.elapsed * 0.8
        this.timeline.time(this.experience.time.elapsed);
    }
}
