import ShaderPass from './ShaderPass';
import * as ShaderLib from 'shaders/ShaderLib';

export default class NoiseTexture extends ShaderPass
{
    constructor(renderer, uvMultiplier = 5.0)
    {
        const shader = new THREE.RawShaderMaterial({
            uniforms: {
                uvMultiplier: {
                    type: 'f',
                    value: uvMultiplier,
                },
            },
            vertexShader: ShaderLib.orthoVertex,
            fragmentShader:
          `
            precision highp float;
            varying vec2 vUv;
            uniform float uvMultiplier;
            ${ShaderLib.noise2d}

            void main() {
              float noise = cnoise(vUv * uvMultiplier);
              gl_FragColor = vec4(vec3(noise),1.);
            }
          `
            ,
        });

        super(renderer, shader, 128, 128);
    }
}
