import * as THREE from 'three'
import Experience from '../Experience.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
export default class Text {
    constructor() {
        this.expierence = new Experience()
        this.scene = this.expierence.scene
        this.debug = this.expierence.debug
        this.camera = this.expierence.camera

        this.parametres = {
            text: 'Mister & Prada',
            font: this.expierence.resources.items.textFont,
            size: 0.4,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        }

        this.setModel()
        this.setDebug()
    }

    setModel() {
        // Text
        this.material = new THREE.MeshMatcapMaterial({
            matcap: this.expierence.resources.items.textColorTexture,
        });

        this.textGeometry = new TextGeometry(
            this.parametres.text,
            this.parametres,
        )
        this.textGeometry.center()
        this.text = new THREE.Mesh(this.textGeometry, this.material)
        this.text.position.y = -2
        this.scene.add(this.text)
    }

    update() {
        this.text.lookAt(this.camera.instance.position)
    }

    setDebug() {

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Text')
            this.debugFolder.add(this.text.position, 'x').min(-20).max(20).step(0.1);
            this.debugFolder.add(this.text.position, 'y').min(-20).max(20).step(0.1);
            this.debugFolder.add(this.text.position, 'z').min(-20).max(20).step(0.1);
        }
    }
}
