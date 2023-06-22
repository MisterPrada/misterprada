import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap";

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.timeline = this.experience.timeline

        this.setInstance()
        //this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(55, this.sizes.width / this.sizes.height, 0.1, 100)
        const defaultCameraPosition = new THREE.Vector3(5, -2, -3);
        this.instance.position.copy(defaultCameraPosition)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxDistance = 100;
        this.controls.enabled = true;
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.instance.lookAt(new THREE.Vector3(0, 0, 0));
        //this.controls.update()
    }

    animateCameraPosition() {
        this.timeline.add(
            gsap.to(this.instance.position, {
                duration: 6,
                delay: 0.5,
                x: 0.05,
                y: 1.5,
                z: 5.0,
                ease: "power1.inOut",
            }),
            "start"
        )
    }
}
