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
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(60, this.sizes.width / this.sizes.height, 0.1, 500)
        this.instance2 = new THREE.PerspectiveCamera(60, this.sizes.width / this.sizes.height, 0.1, 500)
        const defaultCameraPosition = new THREE.Vector3(2.6, 3.8, 35.);

        this.instance.position.copy(defaultCameraPosition)
        this.instance2.position.copy(defaultCameraPosition)
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

        this.instance2.aspect = this.sizes.width / this.sizes.height
        this.instance2.updateProjectionMatrix()
    }

    update()
    {
        this.instance2.position.x = this.instance.position.x;
        this.instance2.position.y = -this.instance.position.y;
        this.instance2.position.z = this.instance.position.z;

        this.instance.lookAt(new THREE.Vector3(0, 2., 0));
        this.instance2.lookAt(new THREE.Vector3(0, 1., 0));
        this.controls.update()
    }

    animateCameraPosition() {
        this.timeline.add(
            gsap.to(this.instance.position, {
                duration: 8,
                delay: 0.6,
                x: 6.0,
                y: 1.5,
                z: -0.05,
                ease: "power1.inOut",
            }),
            "start"
        )
    }
}
