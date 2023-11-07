import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import gsap from "gsap";

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Html Elements
        this.html = {}
        this.html.preloader = document.getElementById("preloader")

        // Resources
        this.resources = new Resources(sources)

        // Options
        THREE.ColorManagement.enabled = false
        this.canvas = _canvas

        // Setup
        this.timeline = gsap.timeline({
            paused: true,
        });
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()


        /**
         * Default code to prevent double click to select text
         */
        this.setDefaultCode();

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
            this.debug.stats && this.debug.stats.update();
        })
    }

    resize()
    {
        this.camera.resize()
        this.world.resize()
        this.renderer.resize()
    }

    update()
    {
        this.timeline.time(this.time.elapsed);
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    setDefaultCode(){
        document.ondblclick = function (e) {
            e.preventDefault()
        }
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}
