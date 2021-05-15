//@ts-check

import Block from "./block.js"

export default class Renderer {
    constructor() {

    }

    /**
     * 
     * @param {Block[]} blocks 
     * * @param {number} colisionY 
     */
    updatePieceBlocks(blocks, colisionY) {}
    destroyPieceBlocks() {}
    /**
     * 
     * @param {number[]} lines 
     */
    destroyLineBlocks(lines) {}

    /**
     * 
     * @param {Block[]} blocks 
     */
    insertBlocks(blocks) {}
}