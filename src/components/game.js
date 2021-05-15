//@ts-check

import Commands from "./commands.js";
import { Piece, PieceI } from "./piece.js";
import Renderer from "./renderer.js";

export default class Game {
    /**
     * 
     * @param {Commands} commands 
     * @param {Renderer} renderer 
     */
    constructor(commands, renderer) {
        this._nextPieces = [
            Piece.Random(1,1),
            Piece.Random(1,1),
            Piece.Random(1,1)
        ]
        this._renderer = renderer;
        this._board = new Board(this);
        commands.moveLeft = () => this._board.pieceMoveLeft();
        commands.moveRight = () => this._board.pieceMoveRight();
        commands.moveDown = () => this._board.pieceMoveDown();
        commands.rotate = () => this._board.pieceRotate(false);
        commands.rotateAntiClock = () => this._board.pieceRotate(true);
        commands.jumpDown = () => this._board.pieceJumpDown();
        this._moveInterval = 1;
        this.tick();
    }

    get nextPieces() { return this._nextPieces; }

    nextPiece() {
        let piece = this._nextPieces.shift();
        this.nextPieces.push(Piece.Random(1,1));
        return piece;
    }

    get renderer() { return this._renderer; }

    tick() {
        this._board.move();
        setTimeout(() => {
            this.tick();
        }, this._moveInterval * 1000);
        
    }
    
}


export class Board {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game, w=10, h=24) {
        this._w = w;
        this._h = h;
        this.xs = [...Array(this.w).keys()];
        this.ys = [...Array(this.h).keys()];
        this._game = game;
        this._blocks = this.xs.map(_1 => this.ys.map(_2 => null));
        this._piece = game.nextPiece();
        this.collisionY = this.h;
        this._game.renderer.updatePieceBlocks(this._piece.blocks, this.collisionY);
    }

    

    get w() { return this._w; }
    get h() { return this._h; }
    get blocks() { return this._blocks; }
    get piece() { return this._piece; }
    /**
     * 
     * @param {Piece} value 
     */
    set piece(value) {
        this._piece = value;
    }

    move() {
        this.piece.moveDown();
        if (this._checkColision()) {
            this.piece.moveUp();
            this._game.renderer.insertBlocks(this.piece.blocks);
            this.piece.blocks.forEach(_ => this.blocks[_.x][_.y] = _);
            let linesCompleted = this._getLineCompleted();
            this._game.renderer.destroyPieceBlocks();
            if (linesCompleted.length) {
                this._destroyLines(linesCompleted);
                this._game.renderer.destroyLineBlocks(linesCompleted);    
            }
            this.piece = this._game.nextPiece();
        }
        this._updatePieceCollisionY();
        this._game.renderer.updatePieceBlocks(this.piece.blocks, this.collisionY);
    }

    pieceMoveLeft() {
        this.piece.moveLeft();
        if (this._checkBoundary() || this._checkColision()) this.piece.moveRight();
        this._updatePieceCollisionY();
        this._game.renderer.updatePieceBlocks(this.piece.blocks, this.collisionY);
    }

    pieceMoveRight() {
        this.piece.moveRight();
        if (this._checkBoundary() || this._checkColision()) this.piece.moveLeft();
        this._updatePieceCollisionY();
        this._game.renderer.updatePieceBlocks(this.piece.blocks, this.collisionY);
    }

    pieceMoveDown() {
        this.piece.moveDown();
        if (this._checkBoundary() || this._checkColision()) this.piece.moveUp();
        this._updatePieceCollisionY();
        this._game.renderer.updatePieceBlocks(this.piece.blocks, this.collisionY);
    }

    pieceRotate(antiClock=false) {
        this.piece.rotate(antiClock);
        if (this._checkBoundary() || this._checkColision()) this.piece.rotate(!antiClock);
        this._updatePieceCollisionY();
        this._game.renderer.updatePieceBlocks(this.piece.blocks, this.collisionY);
    }

    pieceJumpDown() {
        while(!this._checkColision()) {
            this.piece.moveDown();
        }
        this.piece.moveUp();
    }

    _updatePieceCollisionY() {
        for(let i of Array(this.h).keys()) {
            if (this._checkColision(i)) { this.collisionY = this.piece.y2 + i - 1; return; }
        }
        this.collisionY = this.h;
    }


    _checkBoundary() {
        return this.piece.x1 < 0 || this.piece.y1 < 0 || this.piece.x2 >= this.w || this.piece.y2 >= this.h;
    }

    _checkColision(offsetY = 0) {
        return this.piece.y2 + offsetY >= this.h || this.piece.blocks.some(_ => this.blocks[_.x][_.y + offsetY]);
    }

    _getLineCompleted() {
        return this.ys.filter(y => this.xs.every(x => this.blocks[x][y] != null))
    }

    /**
     * 
     * @param {number[]} lines 
     */
    _destroyLines(lines) {
        lines.sort().forEach(line => {
            for(let y = line; y >= 0; y--) {
                if (y != line)
                    this.xs.forEach(x => this.blocks[x][y] ? this.blocks[x][y+1] = this.blocks[x][y].moveDown() : null);
                this.xs.forEach(x => delete this.blocks[x][y]);
            }
        });
    }
}