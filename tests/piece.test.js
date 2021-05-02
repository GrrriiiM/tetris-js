const { Piece } = require("../src/components/piece");
const Block = require("../src/components/block").default;

describe('constructor', () => {
    it('should success', () => {
        let block1 = new Block(12, 23);
        let block2 = new Block(10, 5);
        let block3 = new Block(14, 8);
        let piece = new Piece([block1, block2, block3], 3, 5);
        expect(piece.x).toBe(3);
        expect(piece.y).toBe(5);
        expect(piece.blocks[0].x).toBe(15);
        expect(piece.blocks[0].y).toBe(28);
        expect(piece.blocks[1].x).toBe(13);
        expect(piece.blocks[1].y).toBe(10);
        expect(piece.blocks[2].x).toBe(17);
        expect(piece.blocks[2].y).toBe(13);
        expect(piece.x1).toBe(13);
        expect(piece.x2).toBe(17);
        expect(piece.y1).toBe(10);
        expect(piece.y2).toBe(28);
    });
});

// describe('move', () => {
//     it('should right with times = 1', () => {
//         let block1 = new Block(0, 1);
//         let block2 = new Block(2, 3);
//         let piece = new Piece([block1, block2], 1, 1);
//         piece.moveRight();
//         expect(piece.x).toBe(2);
//         expect(piece.y).toBe(1);
//         expect(piece.blocks[0].x).toBe(1);
//         expect(piece.blocks[0].y).toBe(2);
//         expect(piece.blocks[1].x).toBe(3);
//         expect(piece.blocks[1].y).toBe(4);

//     });
// });

