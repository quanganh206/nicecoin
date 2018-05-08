import { IBlock } from './block.interface';

export class Block implements IBlock {
    public index: number;
    public previousHash: string;
    public timestamp: number;
    public data: string;
    public hash: string;
    public difficulty: number;
    public nonce: number;

    constructor(iBlock: IBlock) {
        this.index = iBlock.index;
        this.previousHash = iBlock.previousHash;
        this.timestamp = iBlock.timestamp;
        this.data = iBlock.data;

        this.hash = iBlock.hash;
        this.difficulty = iBlock.difficulty;
        this.nonce = iBlock.nonce;
    }
}