import * as THREE from 'three'
import Experience from './Experience.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.camera2 = this.experience.camera.instance2
        this.debug = this.experience.debug

        this.usePostprocess = true

        this.setInstance()
        this.setPostProcess()
        this.setDebug()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            //antialias: true
        })

        //this.instance.physicallyCorrectLights = true
        //this.instance.outputEncoding = THREE.sRGBEncoding
        //this.instance.outputColorSpace = THREE.LinearSRGBColorSpace
        this.instance.outputColorSpace = THREE.LinearSRGBColorSpace
        //this.instance.toneMapping = THREE.CineonToneMapping
        //this.instance.toneMappingExposure = 0.75
        // this.instance.shadowMap.enabled = true
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        //this.instance.setClearColor('#211d20')
        this.instance.localClippingEnabled = true;
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize()
    {
        // Instance
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        // Post process
        this.postProcess.composer.setSize(this.sizes.width, this.sizes.height)
        this.postProcess.composer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    setPostProcess() {
        this.postProcess = {}

        /**
         * Passes
         */
        // Render pass
        this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)

        // Bloom pass
        this.postProcess.unrealBloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.sizes.width, this.sizes.height),
            0.7527,
            0.0,
            0.967
        )
        this.postProcess.unrealBloomPass.enabled = true

        this.postProcess.unrealBloomPass.tintColor = {}
        this.postProcess.unrealBloomPass.tintColor.value = '#000000'
        this.postProcess.unrealBloomPass.tintColor.instance = new THREE.Color(this.postProcess.unrealBloomPass.tintColor.value)

        this.postProcess.unrealBloomPass.compositeMaterial.uniforms.uTintColor = { value: this.postProcess.unrealBloomPass.tintColor.instance }
        this.postProcess.unrealBloomPass.compositeMaterial.uniforms.uTintStrength = { value: 0.15 }
        this.postProcess.unrealBloomPass.compositeMaterial.fragmentShader = `
varying vec2 vUv;
uniform sampler2D blurTexture1;
uniform sampler2D blurTexture2;
uniform sampler2D blurTexture3;
uniform sampler2D blurTexture4;
uniform sampler2D blurTexture5;
uniform sampler2D dirtTexture;
uniform float bloomStrength;
uniform float bloomRadius;
uniform float bloomFactors[NUM_MIPS];
uniform vec3 bloomTintColors[NUM_MIPS];
uniform vec3 uTintColor;
uniform float uTintStrength;

float lerpBloomFactor(const in float factor) {
    float mirrorFactor = 1.2 - factor;
    return mix(factor, mirrorFactor, bloomRadius);
}

void main() {
    vec4 color = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
        lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
        lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
        lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
        lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );

    color.rgb = mix(color.rgb, uTintColor, uTintStrength);
    gl_FragColor = color;
}
        `
        /**
         * Effect composer
         */

        this.renderTarget = new THREE.WebGLRenderTarget(
            this.sizes.width,
            this.sizes.height,
            {
                generateMipmaps: false,
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                colorSpace: THREE.SRGBColorSpace,
                samples: this.instance.getPixelRatio() === 1 ? 2 : 0
            }
        )
        this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)
        this.postProcess.composer.setSize(this.sizes.width, this.sizes.height)
        this.postProcess.composer.setPixelRatio(this.sizes.pixelRatio)

        this.postProcess.composer.addPass(this.postProcess.renderPass)
        this.postProcess.composer.addPass(this.postProcess.unrealBloomPass)


        let vignettePass = new ShaderPass( VignetteShader );
        let filmPass = new FilmPass( 0.15, 0.025, 648, false );

        this.postProcess.composer.addPass(filmPass)
        this.postProcess.composer.addPass(vignettePass)
    }

    setDebug()
    {
        if(this.debug.active)
        {
            const rendererFolder = this.debug.ui.addFolder('Bloom');

            const unrealBloomPassFolder = rendererFolder.addFolder('UnrealBloomPass');

            unrealBloomPassFolder.add(this.postProcess.unrealBloomPass, 'enabled');

            unrealBloomPassFolder.add(this.postProcess.unrealBloomPass, 'strength', 0, 3, 0.001);

            unrealBloomPassFolder.add(this.postProcess.unrealBloomPass, 'radius', 0, 1, 0.001);

            unrealBloomPassFolder.add(this.postProcess.unrealBloomPass, 'threshold', 0, 1, 0.001);

            const colorController = unrealBloomPassFolder.addColor(this.postProcess.unrealBloomPass.tintColor, 'value').name('color');
            colorController.onChange(value => {
                this.postProcess.unrealBloomPass.tintColor.instance.set(value);
            });

            unrealBloomPassFolder.add(this.postProcess.unrealBloomPass.compositeMaterial.uniforms.uTintStrength, 'value', 0, 1, 0.001).name('uTintStrength');
        }
    }

    update()
    {
        if (this.experience.world && this.experience.world.water)
        {
            this.experience.world.water.mesh.visible = false
            //this.experience.world.text.text.visible = false

            this.instance.setRenderTarget(this.experience.world.water.renderTarget)
            this.instance.render(this.scene, this.camera.instance2);
            this.experience.world.water.mesh.visible = true
            //this.experience.world.text.text.visible = true
        }

        this.instance.setRenderTarget(null)

        if ( this.usePostprocess ){
            this.postProcess.composer.render()
        }else{
            this.instance.render(this.scene, this.camera.instance)
        }

    }
}
