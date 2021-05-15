//@ts-check

import Block from "./block.js";
import { Colors } from "./colors.js";

export class Piece {
    static Random(x=0, y=0) {
        let random = Math.floor(Math.random() * 7);
        let p = [PieceI, PieceJ, PieceL, PieceO, PieceS, PieceT, PieceZ][random];
        return new p(x,y);
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {Block[]} blocks 
     */
    constructor(blocks, x = 0, y = 0) {
        this._x = 0;
        this._y = 0;
        this._blocks = blocks;
        this._x1 = 0;
        this._x2 = 0;
        this._y1 = 0;
        this._y2 = 0;
        this.moveRight(x).moveDown(y);
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get x1() { return this._x1; }
    get x2() { return this._x2; }
    get y1() { return this._y1; }
    get y2() { return this._y2; }
    get blocks() { return this._blocks; }

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
    moveRight(times = 1) {
        this._x += times;
        this._blocks.forEach(_ => _.moveRight(times));
        this._calcPosition();
        return this;
    }

    /**
     * 
     * @param {number} times 
     */
    moveLeft(times = 1) {
        this._x -= times;
        this._blocks.forEach(_ => _.moveLeft(times));
        this._calcPosition();
        return this;
    }

    /**
     * 
     * @param {number} times 
     */
    moveDown(times = 1) {
        this._y += times;
        this._blocks.forEach(_ => _.moveDown(times));
        this._calcPosition();
        return this;
    }

    /**
     * 
     * @param {number} times 
     */
    moveUp(times = 1) {
        this._y -= times;
        this._blocks.forEach(_ => _.moveUp(times));
        this._calcPosition();
        return this;
    }

    /**
     * 
     * @param {boolean} antiClock 
     */
    rotate(antiClock = false) {
        this._blocks.forEach(_ => 
            _.moveLeft(this.x)
            .moveUp(this.y)
            .rotate(antiClock)
            .moveRight(this.x)
            .moveDown(this.y)
        );
        this._calcPosition();
        return this;
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
            new Block(-1, 0, Colors.blue),
            new Block(0, 0, Colors.blue),
            new Block(1, -1, Colors.blue),
            new Block(1, 0, Colors.blue)
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
            new Block(-1, -1, Colors.green),
            new Block(-1, 0, Colors.green),
            new Block(0, 0, Colors.green),
            new Block(1, 0, Colors.green)
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
            new Block(-1, 0, Colors.orange),
            new Block(0, -1, Colors.orange),
            new Block(0, 0, Colors.orange),
            new Block(1, -1, Colors.orange)
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
            new Block(-1, -1, Colors.purple),
            new Block(0, -1, Colors.purple),
            new Block(0, 0, Colors.purple),
            new Block(1, 0, Colors.purple)
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
            new Block(-1, 0, Colors.red),
            new Block(0, -1, Colors.red),
            new Block(0, 0, Colors.red),
            new Block(1, 0, Colors.red)
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
            new Block(0, -1, Colors.yellow),
            new Block(0, 0, Colors.yellow),
            new Block(1, -1, Colors.yellow),
            new Block(1, 0, Colors.yellow)
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
            new Block(-1, 0, Colors.navy),
            new Block(0, 0, Colors.navy),
            new Block(1, 0, Colors.navy),
            new Block(2, 0, Colors.navy)
        ], x, y)
    }
}
