import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from "gsap";

export default class Pier {
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
        const localPlane = new THREE.Plane(new THREE.Vector3(0, 0.1, 0), 1);

        this.group = new THREE.Group()
        this.group.renderOrder = 6
        this.group2 = new THREE.Group()
        this.group2.renderOrder = 6

        this.group.position.y = 2
        this.group2.position.z = 21
        this.group2.position.y = 2


        this.group.position.z += 6
        this.group2.position.z += 6

        //this.scene.add(this.group)
        this.scene.add(this.group2)

        const normal =  this.resources.items.pierNormalTexture
        const normal2 = this.resources.items.pierNormal2Texture

        const scale = 0.1
        const pontonAo = this.resources.items.pierPlancheTexture

        const ponton = this.resources.items.pierPlancheModel
        ponton.renderOrder = 6

        this.pontonMat = new THREE.MeshPhongMaterial({
            //depthTest: false,
            normalMap: normal,
            normalScale: new THREE.Vector2(0.2, 0.2),
            map: pontonAo,
            clippingPlanes: [localPlane],
        });

        ponton.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.material = this.pontonMat;

                child.scale.set(scale, scale, scale);
            }
        });

        const pylonAo = this.resources.items.pierPylonTexture
        const pylons = this.resources.items.pierPylonModel
        pylons.renderOrder = 5

        this.pylonsMat = new THREE.MeshPhongMaterial({
            //depthTest: false,
            normalMap: normal2,
            normalScale: new THREE.Vector2(0.2, 0.2),
            map: pylonAo,
            clippingPlanes: [localPlane],
        });

        pylons.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.material = this.pylonsMat;
                child.scale.set(-scale, scale, -scale);
            }
        });

        this.pylons = pylons;
        this.ponton = ponton;
        this.group.add(pylons);
        this.group.add(ponton);

        const ponton2 = this.ponton.clone();

        const pylon2 = this.pylons.clone();

        this.pylons2 = pylon2;
        this.ponton2 = ponton2;

        this.group2.add(this.pylons2);
        this.group2.add(this.ponton2);
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
