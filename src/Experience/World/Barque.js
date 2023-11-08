import * as THREE from 'three'
import Experience from '../Experience.js'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import gsap from "gsap";

export default class Barque {
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
        this.resource = this.resources.items.barqueModel


        this.group = new THREE.Group();
        this.group.position.y = 2;
        this.group.position.z = 35;
        this.scene.add(this.group);

        const scale = 0.1;
        const texture = this.resources.items.barqueTexture;

        const barque = this.resource

        barque.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                console.log(child)
                child.material = new THREE.MeshPhongMaterial();
                child.scale.set(-scale, scale, -scale);
                child.material.map = texture;
                child.material.map.needsUpdate = true;
            }
        });

        barque.renderOrder = 5;

        this.group.add(barque);
    }

    resize() {

    }

    update() {

    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {

        }
    }
}
