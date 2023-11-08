import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.addLights()
        this.setPierLights()

        this.setFog()
        //this.setSunLight()
        //this.setEnvironmentMap()
    }

    setPierLights()
    {
        // add point light for book
        const pointLight = new THREE.PointLight(0xffffff, 10.5);
        pointLight.position.set(-14.5, 2, 21.5);
        pointLight.castShadow = false;
        this.scene.add(pointLight)

        const pointLightMountains = new THREE.PointLight(0xffffff, 1500.5);
        //pointLightMountains.position.set(0, 2.7, 33);
        pointLightMountains.position.set(0, 20, -80);
        pointLightMountains.castShadow = false;
        this.scene.add(pointLightMountains)


        // add point light for pier
        const pointLightPier = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier.position.set(0, 3, 33);
        pointLightPier.castShadow = false;
        this.scene.add(pointLightPier);

        const pointLightPier2 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier2.position.set(0, 3, 30);
        pointLightPier2.castShadow = false;
        this.scene.add(pointLightPier2);

        const pointLightPier3 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier3.position.set(0, 3, 27);
        pointLightPier3.castShadow = false;
        this.scene.add(pointLightPier3);

        const pointLightPier4 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier4.position.set(0, 3, 24);
        pointLightPier4.castShadow = false;
        this.scene.add(pointLightPier4);

        const pointLightPier5 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier5.position.set(0, 3, 21);
        pointLightPier5.castShadow = false;
        this.scene.add(pointLightPier5);

        const pointLightPier6 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier6.position.set(0, 3, 18);
        pointLightPier6.castShadow = false;
        this.scene.add(pointLightPier6);

        const pointLightPier7 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier7.position.set(0, 3, 15);
        pointLightPier7.castShadow = false;
        this.scene.add(pointLightPier7);

        const pointLightPier8 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier8.position.set(0, 3, 12);
        pointLightPier8.castShadow = false;
        this.scene.add(pointLightPier8);

        const pointLightPier9 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier9.position.set(0, 3, 9);
        pointLightPier9.castShadow = false;
        this.scene.add(pointLightPier9);

        const pointLightPier10 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier10.position.set(0, 3, 6);
        pointLightPier10.castShadow = false;
        this.scene.add(pointLightPier10);

        const pointLightPier11 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier11.position.set(0, 3, 3);
        pointLightPier11.castShadow = false;
        this.scene.add(pointLightPier11);

        const pointLightPier12 = new THREE.PointLight(0xffffff, 1.5);
        pointLightPier12.position.set(0, 3, 0);
        pointLightPier12.castShadow = false;
        this.scene.add(pointLightPier12);


        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Light')
            this.debugFolder.add(pointLight.position, 'x').min(-100).max(100).step(0.01).name('position x')
            this.debugFolder.add(pointLight.position, 'y').min(-100).max(100).step(0.01).name('position y')
            this.debugFolder.add(pointLight.position, 'z').min(-100).max(100).step(0.01).name('position z')

            this.debugFolder.add(pointLight.scale, 'x').min(-100).max(100).step(0.01).name('scale x')
            this.debugFolder.add(pointLight.scale, 'y').min(-100).max(100).step(0.01).name('scale y')
            this.debugFolder.add(pointLight.scale, 'z').min(-100).max(100).step(0.01).name('scale z')
        }
    }

    addLights()
    {
        const ambient = new THREE.AmbientLight(0x24294c);

        this.scene.add(ambient);
        const directionalLight = new THREE.DirectionalLight(0x7facd9, 0.5);

        directionalLight.position.set(-100, 1, 0);
        directionalLight.lookAt(new THREE.Vector3());

        this.scene.add(directionalLight);
    }

    setFog()
    {
        this.scene.fog = new THREE.FogExp2('#7facd9', 0.013);
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 0.2)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder
        //         .add(this.sunLight, 'intensity')
        //         .name('sunLightIntensity')
        //         .min(0)
        //         .max(10)
        //         .step(0.001)
        //
        //     this.debugFolder
        //         .add(this.sunLight.position, 'x')
        //         .name('sunLightX')
        //         .min(- 5)
        //         .max(5)
        //         .step(0.001)
        //
        //     this.debugFolder
        //         .add(this.sunLight.position, 'y')
        //         .name('sunLightY')
        //         .min(- 5)
        //         .max(5)
        //         .step(0.001)
        //
        //     this.debugFolder
        //         .add(this.sunLight.position, 'z')
        //         .name('sunLightZ')
        //         .min(- 5)
        //         .max(5)
        //         .step(0.001)
        // }
    }

    setEnvironmentMap()
    {
        /**
         * Environment Map parameters
         */
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4

        /**
         * Texture settings
         */
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        this.environmentMap.texture.mapping = THREE.EquirectangularReflectionMapping
        //this.environmentMap.texture.encoding = THREE.sRGBEncoding
        this.environmentMap.texture.generateMipmaps = false
        this.environmentMap.texture.minFilter = THREE.LinearFilter
        this.environmentMap.texture.magFilter = THREE.LinearFilter

        /**
         * Scene settings
         */
        //this.scene.environment = this.environmentMap.texture
        this.scene.background = this.environmentMap.texture
        this.scene.backgroundBlurriness = 0.04
        //this.scene.backgroundIntensity = 6.1
        //this.scene.envMapIntensity = 9.1

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        //this.environmentMap.updateMaterials()

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder
        //         .add(this.environmentMap, 'intensity')
        //         .name('envMapIntensity')
        //         .min(0)
        //         .max(4)
        //         .step(0.001)
        //         .onChange(this.environmentMap.updateMaterials)
        // }
    }
}
