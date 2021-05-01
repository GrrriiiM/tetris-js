const Block = require("../src/components/block").default;

describe('constructor', () => {
    it('should success', () => {
        let block = new Block(12, 23);
        expect(block.x).toBe(12);
        expect(block.y).toBe(23);
    });
});

describe('move', () => {
    it('should left', () => {
        let block = new Block(0, 0);
        block.moveLeft();
        expect(block.x).toBe(1);
        expect(block.y).toBe(0);
    });
});