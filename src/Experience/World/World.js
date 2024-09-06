import Experience from '../Experience.js'
import Environment from './Environment.js'
import ExampleClass from "./ExampleClass.js";
import DebugHelpers from "./DebugHelpers.js";
import Ui from "../Ui/Ui.js";
import State from "../State.js";
import Time from "../Utils/Time.js";
import EventEmitter from '@experience/Utils/EventEmitter.js';

import WideGlow from "@experience/World/WideGlow.js";
import Vortex from "@experience/World/Vortex.js";
import Clouds_1 from "@experience/World/Clouds_1.js";
import Clouds_2 from "@experience/World/Clouds_2.js";
import Clouds_3 from "@experience/World/Clouds_3.js";

import Points_1 from "@experience/World/Points_1.js";
import Points_2 from "@experience/World/Points_2.js";
import Points_3 from "@experience/World/Points_3.js";

import Text from "@experience/World/Text.js";

export default class World extends EventEmitter{
    constructor() {
        super();

        this.experience = Experience.getInstance()
        this.ui = new Ui()
        this.time = Time.getInstance()

        this.camera = this.experience.camera;
        this.scene = this.experience.scene

        this.resources = this.experience.resources
        this.html = this.experience.html
        this.sound = this.experience.sound
        this.debug = this.experience.debug.panel

        // Wait for resources
        this.resources.on( 'ready', () => {
            this.state = new State()

            //this.startWithPreloader()
            this.start()
        } )
    }

    start() {
        setTimeout( () => {
            window.preloader.hidePreloader()
            // window.preloader.showPlayButton(() => {
            //     // start media playing
            // })
        }, 1000)

        this.time.reset()

        this.setupWorld()

        this.animationPipeline();

        this.trigger( 'ready' )
        window.dispatchEvent( new CustomEvent( "3d-app:ready" ) );
    }

    setupWorld() {
        // Setup
        this.vortex = new Vortex()

        this.points_1 = new Points_1()
        this.points_2 = new Points_2()
        this.points_3 = new Points_3()

        this.clouds_1 = new Clouds_1()
        this.clouds_2 = new Clouds_2()
        this.clouds_3 = new Clouds_3()
        this.wideGlow = new WideGlow()
        this.text = new Text()
        this.environment = new Environment()

        // Add debug helpers
        this.debugHelpers = new DebugHelpers()

        // Animation timeline
        this.animationPipeline();

        // Dispatch event
        this.experience.appLoaded = true
    }

    startWithPreloader() {
        this.ui.playButton.classList.add( "fade-in" );
        this.ui.playButton.addEventListener( 'click', () => {

            this.ui.playButton.classList.replace( "fade-in", "fade-out" );
            //this.sound.createSounds();

            setTimeout( () => {
                this.time.reset()

                // Setup
                this.setupWorld()

                // Remove preloader
                this.ui.preloader.classList.add( "preloaded" );
                setTimeout( () => {
                    this.ui.preloader.remove();
                    this.ui.playButton.remove();
                }, 2500 );
            }, 100 );
        }, { once: true } );
    }

    animationPipeline() {
        if ( this.text )
            this.text.animateTextShow()

        if ( this.camera )
            this.camera.animateCameraPosition()
    }

    postInit() {

    }

    resize() {
        this.state.resize()
        this.vortex.resize()
        this.clouds_1.resize()
        this.clouds_2.resize()
        this.clouds_3.resize()
        this.points_1.resize()
        this.points_2.resize()
        this.points_3.resize()
        this.wideGlow.resize()
        this.text.resize()
    }

    update( deltaTime ) {
        this.debugHelpers?.update( deltaTime )
        this.cube?.update( deltaTime )
        this.wideGlow?.update( deltaTime )
        this.vortex?.update( deltaTime )

        this.clouds_1?.update( deltaTime )
        this.clouds_2?.update( deltaTime )
        this.clouds_3?.update( deltaTime )

        this.points_1?.update( deltaTime )
        this.points_2?.update( deltaTime )
        this.points_3?.update( deltaTime )

        this.text?.update( deltaTime )
    }

    postUpdate( deltaTime ) {

    }
}
