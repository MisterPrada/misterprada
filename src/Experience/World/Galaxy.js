import * as THREE from 'three'
import Model from './Abstracts/Model.js'
import Experience from '../Experience.js'
import Debug from '../Utils/Debug.js'
import State from "../State.js";

import WideGlow from "@experience/World/WideGlow.js";
import Vortex from "@experience/World/Vortex.js";
import Clouds_1 from "@experience/World/Clouds_1.js";
import Clouds_2 from "@experience/World/Clouds_2.js";
import Clouds_3 from "@experience/World/Clouds_3.js";

import Points_1 from "@experience/World/Points_1.js";
import Points_2 from "@experience/World/Points_2.js";
import Points_3 from "@experience/World/Points_3.js";

export default class Galaxy extends Model {
    experience = Experience.getInstance()
    debug = Debug.getInstance()
    state = State.getInstance()
    sizes = this.experience.sizes
    scene = experience.scene
    time = experience.time
    camera = experience.camera.instance
    renderer = experience.renderer.instance
    resources = experience.resources
    container = new THREE.Group();

    constructor() {
        super()

        this.setModel()
        this.setDebug()
    }

    setModel() {
        this.vortex = new Vortex()

        this.points_1 = new Points_1()
        this.points_2 = new Points_2()
        this.points_3 = new Points_3()

        this.clouds_1 = new Clouds_1()
        this.clouds_2 = new Clouds_2()
        this.clouds_3 = new Clouds_3()
        this.wideGlow = new WideGlow()

        this.container.add(
            this.vortex.container,
            this.points_1.container,
            this.points_2.container,
            this.points_3.container,
            this.clouds_1.container,
            this.clouds_2.container,
            this.clouds_3.container,
            this.wideGlow.container
        )

        this.container.position.y += 0.5
        this.container.rotateX( 0.3 )

        this.scene.add( this.container )
    }

    resize() {
        this.vortex?.resize()
        this.clouds_1?.resize()
        this.clouds_2?.resize()
        this.clouds_3?.resize()
        this.points_1?.resize()
        this.points_2?.resize()
        this.points_3?.resize()
        this.wideGlow?.resize()
    }

    setDebug() {
        if ( !this.debug.active ) return
    }

    update( deltaTime ) {
        this.wideGlow?.update( deltaTime )
        this.vortex?.update( deltaTime )

        this.clouds_1?.update( deltaTime )
        this.clouds_2?.update( deltaTime )
        this.clouds_3?.update( deltaTime )

        this.points_1?.update( deltaTime )
        this.points_2?.update( deltaTime )
        this.points_3?.update( deltaTime )
    }

}
