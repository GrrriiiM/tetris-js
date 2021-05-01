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
     * @param {Block[]} blocks 
     */
    constructor(blocks) {
        this._blocks = blocks
        this._x1 = 0;
        this._x2 = 0;
        this._y1 = 0;
        this._y2 = 0;
        this._calcPosition();
    }

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

    moveLeft() {
        this._blocks.forEach(_ => _.moveLeft());
        this._calcPosition();
    }

    moveRight() {
        this._blocks.forEach(_ => _.moveRight());
        this._calcPosition();
    }

    moveDown() {
        this._blocks.forEach(_ => _.moveDown());
        this._calcPosition();
    }

    moveUp() {
        this._blocks.forEach(_ => _.moveUp());
        this._calcPosition();
    }

    /**
     * 
     * @param {boolean} antiClock 
     */
     rotate(antiClock = false) {
        this._blocks.forEach(_ => _.rotate(antiClock));
        this._calcPosition();
    }
}

export class PieceL extends Piece {
    constructor() {
        super([
            new Block(-1, 0),
            new Block(0, 0),
            new Block(-1, 1),
            new Block(1, 0)
        ])
    }
}

export class PieceJ extends Piece {
    constructor() {
        super([
            new Block(-1, -1),
            new Block(-1, 0),
            new Block(0, 0),
            new Block(1, 0)
        ])
    }
}

export class PieceS extends Piece {
    constructor() {
        super([
            new Block(-1, 0),
            new Block(0, -1),
            new Block(0, 0),
            new Block(1, -1)
        ])
    }
}

export class PieceZ extends Piece {
    constructor() {
        super([
            new Block(-1, -1),
            new Block(0, -1),
            new Block(0, 0),
            new Block(1, 0)
        ])
    }
}

export class PieceT extends Piece {
    constructor() {
        super([
            new Block(-1, 0),
            new Block(0, -1),
            new Block(0, 0),
            new Block(1, 0)
        ])
    }
}

export class PieceO extends Piece {
    constructor() {
        super([
            new Block(-1, 0),
            new Block(0, 0),
            new Block(1, -1),
            new Block(1, 1)
        ])
    }
}

export class PieceI extends Piece {
    constructor() {
        super([
            new Block(-1, 0),
            new Block(0, 0),
            new Block(1, 0),
            new Block(2, 0)
        ])
    }
}
