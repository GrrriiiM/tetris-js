//@ts-check

export default class Block {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    moveLeft() {
        this._x += 1;
    }

    moveRight() {
        this._x -= 1;
    }

    moveDown() {
        this._y += 1;
    }

    moveUp() {
        this._y -= 1;
    }

    /**
     * 
     * @param {boolean} antiClock 
     */
    rotate(antiClock = false) {
        if (!antiClock)
            this._x, this._y = this._y * -1, this._x;
        else
            this._x, this._y = this._y, this._x * -1;
    }
}