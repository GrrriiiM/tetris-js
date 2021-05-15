//@ts-check

import Block from "./components/block.js";
import Renderer from "./components/renderer.js";


export default class RendererHtml extends Renderer {
    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        super();
        this._element = element;
    }

    /**
     * 
     * @param {Block[]} blocks 
     */
    updatePieceBlocks(blocks, colisionY) {
        // @ts-ignore
        let elementPieces = this._element.querySelectorAll(".piece");
        // @ts-ignore
        let elementPiecesGhost = this._element.querySelectorAll(".piece-ghost");
        let maxY = Math.max(...blocks.map(_ => _.y));
        blocks.forEach((block, i) => {
            let elementPiece = elementPieces[i];
            let elementPieceGhost = elementPiecesGhost[i];
            if (elementPiece == null) {
                // @ts-ignore
                elementPiece = this._element.ownerDocument.getElementById("block").cloneNode(true);
                elementPiece.id = null;
                elementPiece.className = `piece block`;
                // @ts-ignore
                elementPiece.style.backgroundColor = block.color;
                this._element.getElementsByClassName("board")[0].appendChild(elementPiece);

                // @ts-ignore
                elementPieceGhost = this._element.ownerDocument.getElementById("block").cloneNode(true);
                elementPieceGhost.id = null;
                elementPieceGhost.className = `piece-ghost block`;
                // @ts-ignore
                this._element.getElementsByClassName("board")[0].appendChild(elementPieceGhost);
            }
            // @ts-ignore
            elementPiece.style.left = `${block.x}em`;
            // @ts-ignore
            elementPiece.style.top = `${block.y}em`;

            // @ts-ignore
            elementPieceGhost.style.left = `${block.x}em`;
            // @ts-ignore
            elementPieceGhost.style.top = `${colisionY - (maxY - block.y)}em`;
        });
    }

    /**
     * 
     * @param {Block[]} blocks 
     */
    insertBlocks(blocks) {
        blocks.forEach((block, i) => {
            // @ts-ignore
            let elementPiece = this._element.ownerDocument.getElementById("block").cloneNode(true);
            // @ts-ignore
            elementPiece.id = null;
            // @ts-ignore
            elementPiece.className = `block`;
            // @ts-ignore
            elementPiece.style.backgroundColor = block.color;
            // @ts-ignore
            elementPiece.dataset.blockX = block.x;
            // @ts-ignore
            elementPiece.dataset.blockY = block.y;
            // @ts-ignore
            elementPiece.style.left = `${block.x}em`;
            // @ts-ignore
            elementPiece.style.top = `${block.y}em`;
            // @ts-ignore
            this._element.getElementsByClassName("board")[0].appendChild(elementPiece);
        });
    }

    destroyPieceBlocks() {
        this._element.querySelectorAll(".piece").forEach(_ => _.remove());
        this._element.querySelectorAll(".piece-ghost").forEach(_ => _.remove());
    }

    /**
     * 
     * @param {number[]} lines 
     */
    destroyLineBlocks(lines) {
        setTimeout(() => {
            lines.sort().forEach(line => {
                this._element.querySelectorAll(`.block[data-block-y='${line}']`).forEach(_ => _.classList.add("hide"));
            });


            setTimeout(() => {
                lines.sort().forEach(line => {
                    this._element.querySelectorAll(`.block[data-block-y='${line}']`).forEach(_ => _.remove());
                    for (let y = line; y >= 0; y--) {
                        if (y != line) {
                            this._element.querySelectorAll(`.block[data-block-y='${y}']`).forEach(_ => {
                                // @ts-ignore
                                _.dataset.blockY = parseInt(_.dataset.blockY) + 1
                                // @ts-ignore
                                _.style.top = `${_.dataset.blockY}em`;
                            });
                        }
                    }
                })
            }, 200);
        }, 1);
    }
}