import * as dat from 'lil-gui'
import Stats from 'stats.js'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            this.ui = new dat.GUI()
            this.stats = new Stats()
            this.stats.showPanel(0);
            document.body.appendChild( this.stats.dom )
        }
    }
}
