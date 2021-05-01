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

    get x() { return this._x };
    get y() { return this._y };

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
        let x = this._x;
        let y = this._y;
        if (!antiClock) [this._x, this._y] = [y * -1, x];
        else [this._x, this._y] = [y, x * -1];
    }
}