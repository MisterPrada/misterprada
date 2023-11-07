import * as THREE from 'three'
import Experience from '../Experience.js'
import galaxyVertexShader from '../Shaders/Galaxy/vertex.glsl'
import galaxyFragmentShader from '../Shaders/Galaxy/fragment.glsl'
import Time from '../Utils/Time.js'
export default class Galaxy {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.renderer = this.experience.renderer.instance

        /**
         * Galaxy Parameters
         */
        this.parameters = {}
        this.parameters.count = 200000
        this.parameters.size = 0.005
        this.parameters.radius = 52
        this.parameters.branches = 3
        this.parameters.randomness = 0.5
        this.parameters.stdev = 0.8
        this.parameters.randomnessPower = 1.0
        // this.parameters.insideColor = '#2f2f2f' //d97f63
        // this.parameters.outsideColor = '#ffffff'
        this.parameters.insideColor = '#d97f63' //d97f63
        this.parameters.outsideColor = '#1b3984'
        this.parameters.uPositionX = 15.0
        this.parameters.uPositionY = -1.0
        this.parameters.uPositionZ = -24.0
        this.parameters.uSize = 250

        // Galaxy Line Parameters
        this.parameters.lineEach = 5.0
        this.parameters.lineRandomness = 0.066
        this.parameters.lineStdev = 0.8
        this.parameters.lineRandomnessPower = 1.0

        this.material = null
        this.points = null
        this.geometry = null

        /**
         * Setup
         */

        this.generateGalaxy()
        this.setDebug()
    }

    generateGalaxy()
    {
        if(this.points !== null)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.scene.remove(this.points)
        }

        /**
         * Geometry
         */
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.parameters.count * 3)
        const positionsIndexes = new Float32Array(this.parameters.count * 1)
        const randomness = new Float32Array(this.parameters.count * 3)
        const colors = new Float32Array(this.parameters.count * 3)
        const scales = new Float32Array(this.parameters.count * 1)

        const insideColor = new THREE.Color(this.parameters.insideColor)
        const outsideColor = new THREE.Color(this.parameters.outsideColor)

        function randn_bm(mean = 0.5, stdev = 0.25, power = 0.9) {
            let u = 1 - Math.random();
            let v = Math.random();
            let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            z = Math.pow(Math.abs(z), power) * (z < 0 ? -1 : 1); // Добавляем степень
            return z * stdev + mean;
        }

        for(let i = 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3

            // Position
            const radius = Math.random() * this.parameters.radius

            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

            // const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            // const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            // const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

            if (i % this.parameters.lineEach === 0.0) {
                const angle1 = Math.random() * 2.0 * Math.PI;
                const angle2 = Math.random() * 2.0 * Math.PI;
                let radiusPower = (randn_bm(0.5, this.parameters.lineStdev, this.parameters.lineRandomnessPower) - 0.5) * this.parameters.lineRandomness * radius;

                // Translate polar coordinates (angle1, angle2, radiusPower) to cartesian coordinates (randomX, randomY, randomZ)
                const randomX = radiusPower * Math.sin(angle1) * Math.cos(angle2);
                const randomY = radiusPower * Math.sin(angle1) * Math.sin(angle2);
                const randomZ = radiusPower * Math.cos(angle1);


                positions[i3    ] = Math.cos(branchAngle) * radius
                positions[i3 + 1] = 0
                positions[i3 + 2] = Math.sin(branchAngle) * radius

                randomness[i3    ] = randomX
                randomness[i3 + 1] = randomY
                randomness[i3 + 2] = randomZ

                // Color
                const mixedColor = insideColor.clone()
                mixedColor.lerp(outsideColor, radius / this.parameters.radius)

                colors[i3    ] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b
            }else {
                const angle1 = Math.random() * 2.0 * Math.PI;
                const angle2 = Math.random() * 2.0 * Math.PI;
                let radiusPower = (randn_bm(0.5, this.parameters.stdev, this.parameters.randomnessPower) - 0.5) * this.parameters.randomness * radius;

                // Translate polar coordinates (angle1, angle2, radiusPower) to cartesian coordinates (randomX, randomY, randomZ)
                const randomX = radiusPower * Math.sin(angle1) * Math.cos(angle2);
                const randomY = radiusPower * Math.sin(angle1) * Math.sin(angle2);
                const randomZ = radiusPower * Math.cos(angle1);


                positions[i3    ] = Math.cos(branchAngle) * radius
                positions[i3 + 1] = 0
                positions[i3 + 2] = Math.sin(branchAngle) * radius

                randomness[i3    ] = randomX
                randomness[i3 + 1] = randomY
                randomness[i3 + 2] = randomZ

                // Color
                const mixedColor = insideColor.clone()
                mixedColor.lerp(outsideColor, radius / this.parameters.radius)

                colors[i3    ] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b
            }



            // Scale
            scales[i] = Math.random()

            positionsIndexes[i] = i;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('aPositionIndex', new THREE.BufferAttribute(positionsIndexes, 1))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

        /**
         * Material
         */
        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            //depthTest: true,
            transparent: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms:
                {
                    uTime: { value: 0 },
                    uSize: { value: this.parameters.uSize * this.renderer.getPixelRatio() },
                    uPositionX: { value: this.parameters.uPositionX },
                    uPositionY: { value: this.parameters.uPositionY },
                    uPositionZ: { value: this.parameters.uPositionZ },
                    uLineEach: { value: this.parameters.lineEach },
                },
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader
        })

        /**
         * Points
         */
        this.points = new THREE.Points(this.geometry, this.material)
        this.points.renderOrder = 2

        this.scene.add(this.points)
    }

    resize() {
        this.material.uniforms.uSize.value = this.parameters.uSize * this.renderer.getPixelRatio()
    }

    setDebug() {

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Galaxy')
            this.debugFolder.add(this.parameters, 'count').min(100).max(1000000).step(100).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'radius').min(0.01).max(80).step(0.01).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'branches').min(2).max(20).step(1).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'stdev').min(0.0).max(5).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'randomnessPower').min(0.1).max(1.0).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })

            this.debugFolder.add(this.parameters, 'lineEach').min(4).max(10).step(1.0).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'lineRandomness').min(0).max(2).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'lineStdev').min(0.0).max(5).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'lineRandomnessPower').min(0.1).max(1.0).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })

            this.debugFolder.addColor(this.parameters, 'insideColor').onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.addColor(this.parameters, 'outsideColor').onFinishChange(() => {
                this.generateGalaxy()
            })

            this.debugFolder.add(this.parameters, 'uPositionX').min(-40.0).max(40.0).step(0.001).onFinishChange(() => {
                this.material.uniforms.uPositionX.value = this.parameters.uPositionX
            })

            this.debugFolder.add(this.parameters, 'uPositionY').min(-40.0).max(40.0).step(0.001).onFinishChange(() => {
                this.material.uniforms.uPositionY.value = this.parameters.uPositionY
            })

            this.debugFolder.add(this.parameters, 'uPositionZ').min(-40.0).max(40.0).step(0.001).onFinishChange(() => {
                this.material.uniforms.uPositionZ.value = this.parameters.uPositionZ
            })
        }
    }

    update() {
        this.material.uniforms.uTime.value = 50 + this.time.elapsed
    }
}
