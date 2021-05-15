import Commands from "./components/commands.js";

export default class CommandsKeyPress extends Commands {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {*} configuration 
     */
    constructor(element, configuration) {
        super();
        this._configuration = configuration;
        element.addEventListener("keypress", (event) => {
            switch(event.key.toUpperCase()) {
                case this._configuration.keys.moveLeft.toUpperCase(): this.moveLeft(); break;
                case this._configuration.keys.moveRight.toUpperCase(): this.moveRight(); break;
                case this._configuration.keys.rotate.toUpperCase(): this.rotate(); break;
                case this._configuration.keys.rotateAntiClock.toUpperCase(): this.rotateAntiClock(); break;
                case this._configuration.keys.moveDown.toUpperCase(): this.moveDown(); break;
            }
        });
    }
}