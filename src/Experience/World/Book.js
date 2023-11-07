import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from "gsap";

export default class Book {
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


        this.setModel()
        this.setAnimation()
        this.setDebug()
    }

    setModel() {
        this.resource = this.resources.items.bookModel
        this.mesh = this.resources.items.bookModel.scene

        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshLambertMaterial({
                    color:  child.material.color,
                    map: child.material.map,
                    normalMap: child.material.normalMap,
                    normalScale: child.material.normalScale,
                    aoMap: child.material.aoMap,
                    aoMapIntensity: child.material.aoMapIntensity,
                    envMap: child.material.envMap,
                    lightMap: child.material.lightMap,
                    lightMapIntensity: child.material.lightMapIntensity,
                    emissive: child.material.emissive,
                    emissiveIntensity: child.material.emissiveIntensity,
                    emissiveMap: child.material.emissiveMap,
                    bumpMap: child.material.bumpMap,
                    bumpScale: child.material.bumpScale,
                    displacementMap: child.material.displacementMap,
                    displacementScale: child.material.displacementScale,
                    displacementBias: child.material.displacementBias,
                    alphaMap: child.material.alphaMap,
                    transparent: child.material.transparent,
                    opacity: child.material.opacity,
                    side: child.material.side,
                    blending: child.material.blending,
                    depthTest: child.material.depthTest,
                    depthWrite: child.material.depthWrite,
                    wireframe: child.material.wireframe,
                    wireframeLinewidth: child.material.wireframeLinewidth,
                    vertexColors: child.material.vertexColors,
                    flatShading: child.material.flatShading,
                })

                child.material.needsUpdate = true
            }
        });

        this.mesh.scale.set(1, 1, 1)
        this.mesh.rotation.x = Math.PI / 2
        this.mesh.rotation.y = -Math.PI / 2
        //this.mesh.rotation.x += -Math.PI / 2
        this.mesh.rotation.y += Math.PI / 4
        this.mesh.rotation.z += -Math.PI / 4
        this.mesh.scale.copy(new THREE.Vector3(3, 3, 3))
        this.mesh.position.set(-20, 15.49, 26)
        this.mesh.renderOrder = 6;


        this.scene.add(this.mesh)
    }

    setAnimation() {
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.mesh)

        // Actions
        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        //this.animation.actions.open.loop = THREE.LoopOnce;
        //this.animation.actions.open.clampWhenFinished = true
        //this.animation.actions.open.timeScale = 5.0
        this.animation.actions.idle.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }
    }

    resize() {

    }

    update() {
        if ( this.animation )
            this.animation.mixer.update(this.time.delta)
    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Book')
            this.debugFolder.add(this.mesh.position, 'x').min(-100).max(100).step(0.01).name('position x')
            this.debugFolder.add(this.mesh.position, 'y').min(-100).max(100).step(0.01).name('position y')
            this.debugFolder.add(this.mesh.position, 'z').min(-100).max(100).step(0.01).name('position z')

            this.debugFolder.add(this.mesh.scale, 'x').min(-100).max(100).step(0.01).name('scale x')
            this.debugFolder.add(this.mesh.scale, 'y').min(-100).max(100).step(0.01).name('scale y')
            this.debugFolder.add(this.mesh.scale, 'z').min(-100).max(100).step(0.01).name('scale z')
        }
    }
}
