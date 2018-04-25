"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const block_1 = require("./block");
class NiceChain {
    constructor() {
        this.chain = new Array();
        // create genesis block
        const iBlock = {
            index: 0,
            previousHash: null,
            timestamp: 1524625620,
            data: 'NiceCoin Genesis Block'
        };
        this.genesisBlock = new block_1.Block(iBlock);
        this.genesisBlock.hash = this.createHash(iBlock);
        this.chain.push(this.genesisBlock);
        this.currentBlock = this.genesisBlock;
    }
    createHash(iBlock) {
        const hash = crypto_js_1.SHA256(iBlock.timestamp + iBlock.data + iBlock.index + iBlock.previousHash).toString();
        return hash;
    }
    createBlock(data) {
        let newIBlock = {
            timestamp: new Date().getTime(),
            data: data,
            index: this.currentBlock.index,
            previousHash: this.currentBlock.hash
        };
        let newBlock = new block_1.Block(newIBlock);
        newBlock.hash = this.createHash(newBlock);
        return newBlock;
    }
    getLatestBlock() {
        return this.currentBlock;
    }
    getTotalBlock() {
        return this.chain.length;
    }
}
exports.NiceChain = NiceChain;
//# sourceMappingURL=nicechain.js.map