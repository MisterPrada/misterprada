import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from "gsap";

export default class Cat {
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
        this.setDebug()
    }

    setModel() {
        this.resource = this.resources.items.catModel
        this.mesh = this.resources.items.catModel.scene

        this.mesh.traverse((child) => {
            if (child.isMesh) {
                //child.material.fog = false
                child.frustumCulled = false
            }
        })

        this.mesh.scale.set(0.01, 0.01, 0.01)
        this.mesh.position.copy(new THREE.Vector3(0, 1.95, 32.08))
        this.mesh.rotation.y = -Math.PI / 4
        this.mesh.renderOrder = 8

        this.scene.add(this.mesh)
    }

    resize()
    {

    }

    update() {

    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Cat')
            this.debugFolder.add(this.mesh.position, 'x').min(-100).max(100).step(0.01).name('position x')
            this.debugFolder.add(this.mesh.position, 'y').min(-100).max(100).step(0.01).name('position y')
            this.debugFolder.add(this.mesh.position, 'z').min(-100).max(100).step(0.01).name('position z')

            this.debugFolder.add(this.mesh.scale, 'x').min(-100).max(100).step(0.01).name('scale x')
            this.debugFolder.add(this.mesh.scale, 'y').min(-100).max(100).step(0.01).name('scale y')
            this.debugFolder.add(this.mesh.scale, 'z').min(-100).max(100).step(0.01).name('scale z')
        }
    }
}
