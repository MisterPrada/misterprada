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

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.sun = new Sun()
            this.text = new Text()
            this.galaxy = new Galaxy()
            this.environment = new Environment()

            // Animation timeline
            this.animationPipeline();
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
