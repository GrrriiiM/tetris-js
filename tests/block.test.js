const Block = require("../src/components/block").default;

describe('constructor', () => {
    it('should success', () => {
        let block = new Block(12, 23);
        expect(block.x).toBe(12);
        expect(block.y).toBe(23);
    });
});

describe('move', () => {
    it('should right with times = 1', () => {
        let block = new Block(0, 0);
        block.moveRight();
        expect(block.x).toBe(1);
        expect(block.y).toBe(0);
    });

    it('should right with times = 4', () => {
        let block = new Block(0, 0);
        block.moveRight(4);
        expect(block.x).toBe(4);
        expect(block.y).toBe(0);
    });

    it('should left with times = 1', () => {
        let block = new Block(0, 0);
        block.moveLeft();
        expect(block.x).toBe(-1);
        expect(block.y).toBe(0);
    });

    it('should left with times = 4', () => {
        let block = new Block(0, 0);
        block.moveLeft(4);
        expect(block.x).toBe(-4);
        expect(block.y).toBe(0);
    });

    it('should down with times = 1', () => {
        let block = new Block(0, 0);
        block.moveDown();
        expect(block.x).toBe(0);
        expect(block.y).toBe(1);
    });

    it('should down with times = 4', () => {
        let block = new Block(0, 0);
        block.moveDown(4);
        expect(block.x).toBe(0);
        expect(block.y).toBe(4);
    });

    it('should up with times = 1', () => {
        let block = new Block(0, 0);
        block.moveUp();
        expect(block.x).toBe(0);
        expect(block.y).toBe(-1);
    });

    it('should up with times = 4', () => {
        let block = new Block(0, 0);
        block.moveUp(4);
        expect(block.x).toBe(0);
        expect(block.y).toBe(-4);
    });
});

describe('rotate', () => {
    it('should antiClock false', () => {
        let block = new Block(5, 10);
        block.rotate();
        expect(block.x).toBe(10 * -1);
        expect(block.y).toBe(5);
    });

    it('should antiClock true', () => {
        let block = new Block(5, 10);
        block.rotate(true);
        expect(block.x).toBe(10);
        expect(block.y).toBe(5 * -1);
    });
});

describe('set', () => {
    it('should set x', () => {
        let block = new Block(0, 0);
        block.x = 1;
        expect(block.x).toBe(1);
        expect(block.y).toBe(0);
    });

    it('should set y', () => {
        let block = new Block(0, 0);
        block.y = 1;
        expect(block.x).toBe(0);
        expect(block.y).toBe(1);
    });
});