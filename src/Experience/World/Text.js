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
            opacity: 1.0
        }

        this.geometry = new THREE.PlaneGeometry( 5, 5, 128, 128 );
        this.material = new THREE.ShaderMaterial( {
            //wireframe: true,
            //side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false,
            //vertexColors: true,
            //transparent: true,
            blending: THREE.AdditiveBlending,
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
        this.text.scale.copy(new THREE.Vector3(.6, .6, .6))
        this.text.renderOrder = 6;
        this.text.position.x = 11.49;
        this.text.position.y = 5.6;
        this.text.position.z = 4.12;

        this.scene.add(this.text);

        this.setDebug()
    }

    animateTextPosition() {
        this.timeline.to(this.material.uniforms.uOpacity, {
            duration: 3,
            value: 1,
            ease: "power1.inOut",
        });
    }

    resize() {

    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Text')
            this.debugFolder.add(this.text.position, 'x').min(-100).max(100).step(0.01).name('position x')
            this.debugFolder.add(this.text.position, 'y').min(-100).max(100).step(0.01).name('position y')
            this.debugFolder.add(this.text.position, 'z').min(-100).max(100).step(0.01).name('position z')

            this.debugFolder.add(this.text.scale, 'x').min(-100).max(100).step(0.01).name('scale x')
            this.debugFolder.add(this.text.scale, 'y').min(-100).max(100).step(0.01).name('scale y')
            this.debugFolder.add(this.text.scale, 'z').min(-100).max(100).step(0.01).name('scale z')
        }
    }

    update() {
        this.text.lookAt(this.camera.instance.position)
        this.material.uniforms.uTime.value = this.time.elapsed * 0.8
        this.timeline.time(this.experience.time.elapsed);
    }
}
