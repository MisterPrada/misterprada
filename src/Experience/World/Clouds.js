import * as THREE from 'three'
import { random, range, clamp } from '../Utils/Functions.js'
import Experience from '../Experience.js'
import gsap from "gsap";


export default class Clouds {
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


        this.setModel()
        this.setDebug()
    }

    setModel() {
        //cloudTexture
        const map = this.resources.items.cloudTexture

        const geometry = new THREE.PlaneGeometry(2, 1);

        this.items = [];

        for (let i = 0; i < 300; i++) {
            const material = new THREE.MeshBasicMaterial({
                fog: true,
                map,
                blending: THREE.AdditiveBlending,
                //transparent: true,
                depthWrite: false,
                depthTest: false,
                opacity: 0,
            });

            const mesh = new THREE.Mesh(geometry, material);
            const scale = random(1, 4);

            mesh.scale.set(scale + Math.random() * 8, scale, scale);
            mesh.position.x = random(-80, 80);
            mesh.position.y = random(2, 6);
            mesh.position.z = random(-80, 0);
            // mesh.rotation.z = Math.random() * Math.PI * 2;
            mesh.speed = random(0.1, 0.5);
            mesh.material.opacityy = random(0.03, 0.08);
            mesh.material.depthTest = false;
            mesh.renderOrder = 5;

            mesh.r = random(-1, 1);
            this.items.push(mesh);

            this.scene.add(mesh);

        }
    }

    update() {
            for (let i = 0; i < this.items.length; i++)
            {
                const mesh = this.items[i];

                mesh.position.z += 0.05 * mesh.speed;
                // mesh.rotation.z += 0.01 * mesh.r;

                const o = range(mesh.position.z, -50, this.camera.position.z, 1, 0);

                // console.log(mesh.position.z + camera.position.z);

                if (i === 0)
                {
                    // console.log(o);
                }

                mesh.material.opacity = (o, 0, 1) * mesh.material.opacityy;
                // mesh.material.opacity = 1;

                if (mesh.position.z > 0)
                {
                    mesh.position.z = -130;
                    // mesh.position.y = random(2, 4);
                    mesh.material.opacityy = random(0.05, 0.2);
                    mesh.position.x = random(-70, 70);
                }
                // mesh.quaternion.copy(camera.quaternion);
                // mesh.lookAt(camera.position);
            }
    }

    resize()
    {

    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {

        }
    }
}
