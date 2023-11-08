import * as THREE from 'three'
import Experience from '../Experience.js'
import firefliesVertexShader from '../Shaders/FireFlies/vertex.glsl'
import firefliesFragmentShader from '../Shaders/FireFlies/fragment.glsl'

export default class FireFlies {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer.instance
        this.timeline = this.experience.timeline
        this.resources = this.experience.resources


        this.setModelLeft()
        this.setModelCenter()
        this.setModelRight()
        this.setDebug()
    }

    setModelLeft() {
        /**
         * Fireflies
         */
        // Geometry
        const firefliesGeometry = new THREE.BufferGeometry()

        const firefliesCount = 80
        const positionArray = new Float32Array(firefliesCount * 3)
        const scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
            positionArray[i * 3 + 1] = Math.random() * 3
            positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

            scaleArray[i] = Math.random()
        }

        firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

        // Material
        //const firefliesMaterial = new THREE.PointsMaterial({ size: 0.1, sizeAttenuation: true })
        this.firefliesMaterial = new THREE.ShaderMaterial({
            uniforms:
                {
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                    uSize: { value: 300 },
                    uTime: { value: 0 },
                },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            fog: false
            //depthTest: false,
        })

        // Points
        const fireflies = new THREE.Points(firefliesGeometry, this.firefliesMaterial)

        fireflies.renderOrder = 8
        fireflies.position.y = 1
        fireflies.position.z = 23
        fireflies.position.x = -13
        this.scene.add(fireflies)
    }

    setModelCenter() {
        /**
         * Fireflies
         */
            // Geometry
        const firefliesGeometry = new THREE.BufferGeometry()

        const firefliesCount = 80
        const positionArray = new Float32Array(firefliesCount * 3)
        const scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            positionArray[i * 3 + 0] = (Math.random() - 0.5) * 3.5
            positionArray[i * 3 + 1] = Math.random() * 3
            positionArray[i * 3 + 2] = (Math.random() - 0.5) * 20

            scaleArray[i] = Math.random()
        }

        firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

        // Material
        //const firefliesMaterial = new THREE.PointsMaterial({ size: 0.1, sizeAttenuation: true })
        this.firefliesCenterMaterial = new THREE.ShaderMaterial({
            uniforms:
                {
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                    uSize: { value: 120 },
                    uTime: { value: 0 },
                },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            fog: false
            //depthTest: false,
        })

        // Points
        const fireflies = new THREE.Points(firefliesGeometry, this.firefliesCenterMaterial)

        fireflies.renderOrder = 8
        fireflies.position.y = 1
        fireflies.position.z = 29
        fireflies.position.x = 0
        this.scene.add(fireflies)
    }

    setModelRight() {
        /**
         * Fireflies
         */
            // Geometry
        const firefliesGeometry = new THREE.BufferGeometry()

        const firefliesCount = 30
        const positionArray = new Float32Array(firefliesCount * 3)
        const scaleArray = new Float32Array(firefliesCount)

        for(let i = 0; i < firefliesCount; i++)
        {
            positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
            positionArray[i * 3 + 1] = Math.random() * 2
            positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

            scaleArray[i] = Math.random()
        }

        firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

        // Material
        this.firefliesRightMaterial = new THREE.ShaderMaterial({
            uniforms:
                {
                    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                    uSize: { value: 150 },
                    uTime: { value: 0 },
                },
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            fog: false
            //depthTest: false,
        })

        // Points
        const fireflies = new THREE.Points(firefliesGeometry, this.firefliesRightMaterial)

        fireflies.renderOrder = 8
        fireflies.position.y = 0.6
        fireflies.position.z = 23
        fireflies.position.x = 8
        this.scene.add(fireflies)
    }

    resize() {
        this.firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
        this.firefliesCenterMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
        this.firefliesRightMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }

    update() {
        this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 2
        this.firefliesCenterMaterial.uniforms.uTime.value = this.time.elapsed * 2
        this.firefliesRightMaterial.uniforms.uTime.value = this.time.elapsed * 2
    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {

        }
    }
}
