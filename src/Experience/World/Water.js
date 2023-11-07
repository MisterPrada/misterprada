import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from "gsap";

export default class Water {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera.instance
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer.instance
        this.timeline = this.experience.timeline
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes


        this.setModel()
        this.setDebug()
    }

    setModel() {
        this.renderTarget = new THREE.WebGLRenderTarget(
            this.sizes.width,
            this.sizes.height,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                spaceEncoding: THREE.sRGBEncoding,
            });
        this.renderTarget.texture.flipY = false;

        this.waterDUV = this.experience.resources.items.waterDuvTexture
        this.waterDUV.wrapS = THREE.RepeatWrapping
        this.waterDUV.wrapT = THREE.RepeatWrapping
        this.waterDUV.needsUpdate = true

        this.normalMap = this.experience.resources.items.waterNormalTexture

        this.normalMap.wrapS = THREE.RepeatWrapping;
        this.normalMap.wrapT = THREE.RepeatWrapping;
        this.normalMap.needsUpdate = true;

        // add green plane
        const geometry = new THREE.PlaneGeometry(300, 300, 1, 1);

        this.threeuniforms = [
            THREE.UniformsLib.common,
            THREE.UniformsLib.specularmap,
            THREE.UniformsLib.envmap,
            THREE.UniformsLib.aomap,
            THREE.UniformsLib.lightmap,
            THREE.UniformsLib.emissivemap,
            THREE.UniformsLib.bumpmap,
            THREE.UniformsLib.normalmap,
            THREE.UniformsLib.displacementmap,
            THREE.UniformsLib.gradientmap,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            {
                emissive: { value: new THREE.Color(0x000000) },
                specular: { value: new THREE.Color(0x111111) },
                reflectionTexture: {
                    type: 't',
                    value: this.renderTarget.texture,
                },
                cameraPos: {
                    type: 'v3',
                    value: this.camera.position,
                },

                waterDUV: {
                    type: 't',
                    value: this.waterDUV,
                },
                waterfoam: {
                    type: 't',
                    value: this.waterDUV,
                },

                normalMap: {
                    type: 't',
                    value: this.normalMap,
                },
                time: {
                    type: 'f',
                    value: 20,
                },
                uColor: {
                    type: 'c',
                    value: new THREE.Color(0x3a5c64),
                },
                uView: {
                    type: 'mat4',
                    value: new THREE.Matrix4(),
                },
            },
        ];

        this.uniforms = this.threeuniforms.reduce(function (result, current)
        {
            return Object.assign(result, current);
        }, {});

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            lights: true,
            fog: true,
            // depthWrite: false,
            depthTest: false,
            //blending: THREE.AdditiveBlending,
            vertexShader:
                `

          #define PHONG
          varying vec3 vViewPosition;
          uniform vec3 cameraPos;
          varying vec4 clipSpace;
          varying vec2 vUv;

          #include <common>
          #include <uv_pars_vertex>
          #include <displacementmap_pars_vertex>
          #include <envmap_pars_vertex>
          #include <color_pars_vertex>
          #include <fog_pars_vertex>
          #include <morphtarget_pars_vertex>
          #include <skinning_pars_vertex>
          #include <shadowmap_pars_vertex>
          #include <logdepthbuf_pars_vertex>
          #include <clipping_planes_pars_vertex>

          float zfar = 1000.0;
          float znear = 1.0;

          float linearize(float depth)
          {
          return (-zfar * znear / (depth * (zfar - znear) - zfar)) / zfar;
          }
          void main() {
          	#include <uv_vertex>
          	#include <color_vertex>
          	#include <beginnormal_vertex>
          	#include <morphnormal_vertex>
          	#include <skinbase_vertex>
          	#include <skinnormal_vertex>

          	#include <begin_vertex>
          	#include <morphtarget_vertex>
          	#include <skinning_vertex>
          	#include <displacementmap_vertex>
          	#include <project_vertex>
          	#include <logdepthbuf_vertex>
          	#include <clipping_planes_vertex>
          	vViewPosition = - mvPosition.xyz;
          	#include <worldpos_vertex>
          	#include <envmap_vertex>
          	#include <shadowmap_vertex>
          	#include <fog_vertex>
            vec4 p = modelMatrix  *vec4(transformed,1.);
            clipSpace = projectionMatrix * viewMatrix * p;


            vUv = uv;

          }
          `,
            fragmentShader:
                `

          #define PHONG
          uniform vec3 diffuse;
          uniform vec3 emissive;
          uniform vec3 specular;
          uniform float shininess;
          uniform float opacity;
          uniform mat3 normalMatrix;
          uniform sampler2D reflectionTexture;
          uniform sampler2D waterDUV;
          uniform sampler2D depthTexture;
          uniform sampler2D waterfoam;
          uniform sampler2D normalMap;
          uniform vec3 uColor;
          uniform float time;
          varying vec4 clipSpace;
          varying vec2 vUv;



          #include <common>
          #include <packing>
          #include <dithering_pars_fragment>
          #include <color_pars_fragment>
          #include <uv_pars_fragment>
          #include <map_pars_fragment>
          #include <alphamap_pars_fragment>
          #include <aomap_pars_fragment>
          #include <lightmap_pars_fragment>
          #include <emissivemap_pars_fragment>
          #include <envmap_pars_fragment>
          #include <gradientmap_pars_fragment>
          #include <fog_pars_fragment>
          #include <bsdfs>
          #include <lights_pars_begin>
          #include <lights_phong_pars_fragment>
          #include <shadowmap_pars_fragment>
          #include <bumpmap_pars_fragment>
          #include <specularmap_pars_fragment>
          #include <logdepthbuf_pars_fragment>
          #include <clipping_planes_pars_fragment>

          float zfar = 1000.0;
          float znear = 1.0;
            
          float linearize(float depth)
          {
            return (-zfar * znear / (depth * (zfar - znear) - zfar)) / zfar;
          }
          void main() {

            vec2 disUv = vUv * 5.;
            vec2 ndc =  vec2(clipSpace.xy / clipSpace.w) / 2. + .5;
            vec4 displacement = (texture2D(waterDUV,vec2(disUv.x + time, disUv.y)) * 2. - 1.)   * 0.01;
            vec4 displacement2 = (texture2D(waterDUV,vec2(disUv.x , disUv.y + time)) * 2. - 1.) * 0.01;
            vec2 distortion =  displacement.xy + displacement2.xy;
            vec2 uvs = clamp(vec2(ndc.x,1.-ndc.y) + distortion, 0.001, 0.999);
            vec4 reflection = texture2D(reflectionTexture, uvs );


            vec4 normalsColor = texture2D(normalMap,uvs);

            vec3 normal = vec3(normalsColor.r , normalsColor.b, normalsColor.g );
            normal = normalize(normal) ;

          	#include <clipping_planes_fragment>

            vec3 colorWater = mix(reflection.rgb, uColor , 0.5);
          	vec4 diffuseColor = vec4( colorWater, opacity );
          	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
          	vec3 totalEmissiveRadiance = reflection.rgb;
          	// vec3 totalEmissiveRadiance = vec3(0.);
          	#include <logdepthbuf_fragment>
          	#include <map_fragment>
          	#include <color_fragment>
          	#include <alphamap_fragment>
          	#include <alphatest_fragment>
          	#include <specularmap_fragment>



          	#include <emissivemap_fragment>
          BlinnPhongMaterial material;
          material.diffuseColor = diffuseColor.rgb;
          material.specularColor = specular;
          material.specularShininess = 3.;
          material.specularStrength = specularStrength;
          	#include <lights_fragment_begin>
          	#include <lights_fragment_maps>
          	#include <lights_fragment_end>
          	#include <aomap_fragment>
          	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
          	#include <envmap_fragment>



          	gl_FragColor = vec4( outgoingLight, diffuseColor.a );


            vec4 depth = texture2D( depthTexture, ndc );
            float sceneDepth = linearize(depth.r);
            float currentDepth = linearize(gl_FragCoord.z);

            float depthDiff = distance(sceneDepth,currentDepth);

            // if( depthDiff< 0.009) {
            //   float leading = depthDiff / 0.009;
            //   vec4 cc = texture2D(waterfoam,uvs * 20.);
            //   vec3 lum = vec3(0.299, 0.587, 0.114);
            //   gl_FragColor.rgb +=dot( cc.rgb, lum);
            //   gl_FragColor.a = leading;
            // }

            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            #include <fog_fragment>
            #include <premultiplied_alpha_fragment>
            #include <dithering_fragment>

            //gl_FragColor = vec4(normalsColor);

          }
          `,
        });

        this.material.uniforms.diffuse.value = new THREE.Color(0x3a5c64);

        // this.material.uniforms.shininess.value = 300;

        this.renderTargetMaterial = new THREE.MeshBasicMaterial({
            map: this.renderTarget.texture,
        });

        this.mesh = new THREE.Mesh(geometry, this.material);

        this.mesh.rotation.x = - Math.PI / 2;
        this.mesh.renderOrder = 4;

        this.scene.add(this.mesh);


        // display renderTarget texture

    }

    resize()
    {
        this.renderTarget.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.material.uniforms.time.value += 0.00045;
        this.material.uniforms.time.value %= 1;
        //this.uniforms.time.value = this.time.elapsed * 0.1
    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {

        }
    }
}
