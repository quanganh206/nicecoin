import { SHA256 } from 'crypto-js';

import { Block, IBlock } from './block';

export class NiceChain {
    private chain: Block[];
    private currentBlock: Block;
    private genesisBlock: Block;

    constructor() {
        this.chain = new Array<Block>();
        // create genesis block
        const iBlock: IBlock = {
            index: 0,
            previousHash: null,
            timestamp: 1524625620,
            data: 'NiceCoin Genesis Block'
        };
        this.genesisBlock = new Block(iBlock);

        this.genesisBlock.hash = this.createHash(iBlock);
        this.chain.push(this.genesisBlock);
        this.currentBlock = this.genesisBlock;
    }

    public createHash(iBlock: IBlock | {timestamp: number, index: number, previousHash: string, data: string}): string {
        const hash = SHA256(iBlock.timestamp + iBlock.data + iBlock.index + iBlock.previousHash).toString();
        return hash;
    }

    public createBlock(data): Block {
        let newIBlock: IBlock = {
            timestamp: new Date().getTime(),
            data: data,
            index: this.currentBlock.index,
            previousHash: this.currentBlock.hash
        };

        let newBlock = new Block(newIBlock);
        newBlock.hash = this.createHash(newBlock);

        return newBlock;
    }

    public getLatestBlock() {
        return this.currentBlock;
    }

    public getTotalBlock() {
        return this.chain.length;
    }

    // public check
}