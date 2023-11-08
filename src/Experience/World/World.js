import Experience from '../Experience.js'
import Environment from './Environment.js'
import Sky from './Sky.js'
import Mountains from "./Mountains.js";
import Clouds from "./Clouds.js";
import Pier from "./Pier.js";
import Galaxy from './Galaxy.js'
import Sun from './Sun.js'
import HellPortal from "./HellPortal.js";
import Water from './Water.js'
import Text from './Text.js'
import Book from './Book.js'
import Barque from "./Barque.js";
import FireFlies from "./FireFlies.js"
import Cat from "./Cat.js"


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera;
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.html = this.experience.html

        // Wait for resources
        this.resources.on('ready', () =>
        {
            setTimeout(() => {
                this.experience.time.start = Date.now()
                this.experience.time.elapsed = 0
                // Setup
                this.sky = new Sky()
                this.galaxy = new Galaxy()
                this.mountains = new Mountains()
                this.clouds = new Clouds()
                this.barque = new Barque()
                this.pier = new Pier()
                this.fireFlies = new FireFlies()
                //this.text = new Text()
                //this.hellPortal = new HellPortal()
                this.book = new Book()
                //this.cat = new Cat()
                //this.sun = new Sun()
                this.water = new Water()
                this.environment = new Environment()

                // Remove preloader
                this.html.preloader.classList.add("preloaded");
                setTimeout(() => {
                    this.html.preloader.remove();
                }, 2000);

                // Animation timeline
                this.animationPipeline();
            }, 100);

        })
    }

    resize()
    {
        if (this.sky)
            this.sky.resize()

        if (this.galaxy)
            this.galaxy.resize()

        if (this.mountains)
            this.mountains.resize()

        if (this.clouds)
            this.clouds.resize()

        if (this.barque)
            this.barque.resize()

        if (this.pier)
            this.pier.resize()

        if (this.fireFlies)
            this.fireFlies.resize()

        if (this.text)
            this.text.resize()

        if (this.hellPortal)
            this.hellPortal.resize()

        if (this.book)
            this.book.resize()

        if (this.cat)
            this.cat.resize()

        if (this.water)
            this.water.resize()
    }

    animationPipeline() {
        //this.camera.animateCameraPosition();
        //this.text.animateTextPosition();
        //this.sun.setScaleAnimation()
    }

    update()
    {
        // this.scene.position.x = Math.cos(this.experience.time.elapsed) * 0.07;
        // this.scene.position.y = Math.sin(this.experience.time.elapsed) * 0.13;

        if (this.galaxy)
            this.galaxy.update()

        if (this.sun)
            this.sun.update()

        if (this.hellPortal)
            this.hellPortal.update()

        if (this.text)
            this.text.update()

        if (this.book)
            this.book.update()

        if (this.water)
            this.water.update()

        if (this.clouds)
            this.clouds.update()

        if (this.fireFlies)
            this.fireFlies.update()
    }
}
