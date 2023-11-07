import * as THREE from 'three';

import ShaderPass from "./Utils/ShaderPass.js";
import getFBO from './Utils/getFbo.js';
import * as ShaderLib from './ShadersLib/ShaderLib.js';
import Experience from "./Experience.js";

export default class PostPro
{
    constructor(renderer)
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;
        this.renderer = renderer
        this.size = this.experience.sizes;
        this.width = this.size.width;
        this.height = this.size.height;
        this.normalColors = getFBO(this.width, this.height);
        this.bloomColors = getFBO(this.width, this.height);

        this.shaderBlur = new THREE.RawShaderMaterial({
            uniforms: {
                inputTexture: {
                    type: 't',
                    value: this.normalColors.texture,
                },
                resolution: {
                    type: 'v2',
                    value: new THREE.Vector2(this.width, this.height),
                },
                direction: {
                    type: 'v2',
                    value: new THREE.Vector2(5, 0),
                },
            },
            vertexShader: ShaderLib.orthoVertex,
            fragmentShader:
                    `
                      precision highp float;
                      uniform vec2 resolution;
                      uniform vec2 direction;
                      uniform sampler2D inputTexture;
                      varying vec2 vUv;
                      ${ShaderLib.fullBlur}
                      void main() {
                        vec4 inputColors = texture2D(inputTexture, vUv);
                        vec4 colors = blur9(inputTexture,vUv,resolution, direction);
                        gl_FragColor = colors;
                      }
                    `
            ,
        });
        this.direction = new THREE.Vector2(0, 0);

        this.blurX = new ShaderPass(this.renderer, this.shaderBlur, this.width, this.height);
        this.blurY = new ShaderPass(this.renderer, this.shaderBlur, this.width, this.height);

        this.finalShader = new THREE.RawShaderMaterial({
            uniforms: {
                inputTexture: {
                    type: 't',
                    value: this.normalColors.texture,
                },
                blurTexture: {
                    type: 't',
                    value: this.blurY.fbo.texture,
                },
                vignetteBoost: {
                    type: 'f',
                    value: 1,
                },

                vignetteReduction: {
                    type: 'f',
                    value: 0.5,
                },
                time: {
                    type: 'f',
                    value: 0,
                },
                amount: {
                    type: 'f',
                    value: 0.05,
                },
                speed: {
                    type: 'f',
                    value: 0.2,
                },
                resolution: {
                    type: 'v2',
                    value: new THREE.Vector2(this.width, this.height),
                },
            },
            vertexShader: ShaderLib.orthoVertex,
            fragmentShader:
            `

              precision highp float;
              uniform vec2 resolution;
              uniform sampler2D inputTexture;
              uniform sampler2D blurTexture;
              varying vec2 vUv;

              uniform float vignetteBoost;
              uniform float vignetteReduction;
              uniform float amount;
              uniform float speed;
              uniform float time;

              ${ShaderLib.grayscale}
              ${ShaderLib.vignette}
              ${ShaderLib.tiltShift}
              ${ShaderLib.blend}
              ${ShaderLib.random}


              void main() {
                vec4 inputColors = texture2D(inputTexture, vUv);
                vec4 blurColors = texture2D(blurTexture, vUv);
                float vi = vignette(vUv,vignetteBoost,vignetteReduction);

                vec3 colors = tiltShift(inputTexture,vUv).rgb;


                vec3 final = blendScreen(colors,blurColors.rgb);

                final += vec3( amount * random( vUv, .00001 * speed * time ) );

                final *= vi;

                gl_FragColor =vec4( vec3( final),1.0);
              }
            `
            ,
        });

        this.pass = new ShaderPass(this.renderer, this.finalShader, this.width, this.height);
    }
    render()
    {
        this.renderer.render(this.scene, this.camera, this.normalColors);
        //this.scene.bloomScene();
        this.renderer.render(this.scene, this.camera, this.bloomColors);
        //this.scene.unbloomScene();
        this.shaderBlur.uniforms.inputTexture.value = this.bloomColors.texture;
        this.direction.x = 2;
        this.direction.y = 0;
        this.shaderBlur.uniforms.direction.value = this.direction;
        this.blurX.render(false);
        this.shaderBlur.uniforms.inputTexture.value = this.blurX.fbo.texture;
        this.direction.x = 0;
        this.direction.y = 2;
        this.shaderBlur.uniforms.direction.value = this.direction;
        this.blurY.render(false);

        this.finalShader.uniforms.time.value += 0.025;

        this.pass.render();
    }
}
