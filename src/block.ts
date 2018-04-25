export interface IBlock {
    index: number;
    previousHash: string;
    timestamp: number;
    data: string;
}

export class Block implements IBlock {
    public index: number;
    public previousHash: string;
    public timestamp: number;
    public data: string;

    public hash: string;
    public nonce: number

    constructor(iBlock: IBlock) {
        this.index = iBlock.index;
        this.previousHash = iBlock.previousHash;
        this.timestamp = iBlock.timestamp;
        this.data = iBlock.data;
    }

    /*constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string, nonce: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
    }*/
}