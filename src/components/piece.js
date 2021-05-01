//@ts-check

import Block from "./block";

export class Piece {
    static Random() {
        let random = Math.floor(Math.random() * 7);
        let p = [PieceI, PieceJ, PieceL, PieceO, PieceS, PieceT, PieceZ][random];
        return new p();
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {Block[]} blocks 
     */
    constructor(blocks, x = 0, y = 0) {
        this._x = x;
        this._y = y;
        this._blocks = blocks;
        this._x1 = 0;
        this._x2 = 0;
        this._y1 = 0;
        this._y2 = 0;
        this._calcPosition();
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get x1() { return this._x1; }
    get x2() { return this._x2; }
    get y1() { return this._y1; }
    get y2() { return this._y2; }

    _calcPosition() {
        [this._x1, this._x2, this._y1, this._y2] = this._blocks.reduce(
            (acc, cur) => [
                Math.min(acc[0], cur.x),
                Math.max(acc[1], cur.x),
                Math.min(acc[2], cur.y),
                Math.max(acc[3], cur.y),
            ],
            [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
        );
    }

    /**
     * 
     * @param {number} times 
     */
    moveLeft(times = 1) {
        this._x += 1;
        this._blocks.forEach(_ => _.moveLeft(times));
        this._calcPosition();
    }

    /**
     * 
     * @param {number} times 
     */
    moveRight(times = 1) {
        this._x -= 1;
        this._blocks.forEach(_ => _.moveRight(times));
        this._calcPosition();
    }

    /**
     * 
     * @param {number} times 
     */
    moveDown(times = 1) {
        this._y += 1;
        this._blocks.forEach(_ => _.moveDown(times));
        this._calcPosition();
    }

    /**
     * 
     * @param {number} times 
     */
    moveUp(times = 1) {
        this._y -= 1;
        this._blocks.forEach(_ => _.moveUp(times));
        this._calcPosition();
    }

    /**
     * 
     * @param {boolean} antiClock 
     */
    rotate(antiClock = false) {
        this._blocks.forEach(_ => { _.x -= this.x; _.y -= this.y; });
        this._blocks.forEach(_ => _.rotate(antiClock));
        this._blocks.forEach(_ => { _.x += this.x; _.y += this.y; });
        this._calcPosition();
    }
}

export class PieceL extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, 0),
            new Block(0, 0),
            new Block(-1, 1),
            new Block(1, 0)
        ], x, y)
    }
}

export class PieceJ extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, -1),
            new Block(-1, 0),
            new Block(0, 0),
            new Block(1, 0)
        ], x, y)
    }
}

export class PieceS extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, 0),
            new Block(0, -1),
            new Block(0, 0),
            new Block(1, -1)
        ], x, y)
    }
}

export class PieceZ extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, -1),
            new Block(0, -1),
            new Block(0, 0),
            new Block(1, 0)
        ], x, y)
    }
}

export class PieceT extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, 0),
            new Block(0, -1),
            new Block(0, 0),
            new Block(1, 0)
        ], x, y)
    }
}

export class PieceO extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, 0),
            new Block(0, 0),
            new Block(1, -1),
            new Block(1, 1)
        ], x, y)
    }
}

export class PieceI extends Piece {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        super([
            new Block(-1, 0),
            new Block(0, 0),
            new Block(1, 0),
            new Block(2, 0)
        ], x, y)
    }
}
