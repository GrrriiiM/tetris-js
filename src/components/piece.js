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
    }

    moveLeft() {
        this._blocks.forEach(_ => _.moveLeft());
    }

    moveRight() {
        this._blocks.forEach(_ => _.moveRight());
    }

    moveDown() {
        this._blocks.forEach(_ => _.moveRight());
    }

    moveUp() {
        this._blocks.forEach(_ => _.moveRight());
    }

    /**
     * 
     * @param {boolean} antiClock 
     */
     rotate(antiClock = false) {
        this._blocks.forEach(_ => _.rotate(antiClock));
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
