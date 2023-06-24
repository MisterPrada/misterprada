import Experience from '../Experience.js'
import Environment from './Environment.js'
import Galaxy from './Galaxy.js'
import Sun from './Sun.js'
import Text from './Text.js'
import galaxyVertexShader from '../Shaders/Galaxy/vertex.glsl'
import galaxyFragmentShader from '../Shaders/Galaxy/fragment.glsl'


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
                this.sun = new Sun()
                this.text = new Text()
                this.galaxy = new Galaxy()
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

    animationPipeline() {
        this.camera.animateCameraPosition();
        this.text.animateTextPosition();
        this.sun.setScaleAnimation()
    }

    update()
    {
        if (this.galaxy)
            this.galaxy.update()

        if (this.sun)
            this.sun.update()

        if (this.text)
            this.text.update()
    }
}
