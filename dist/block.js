"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(iBlock) {
        this.index = iBlock.index;
        this.previousHash = iBlock.previousHash;
        this.timestamp = iBlock.timestamp;
        this.data = iBlock.data;
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map