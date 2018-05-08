import * as Crypto from 'crypto';

import { hex2Binary } from '../utils';
import { Block, IBlock } from './models';

// in seconds
const BLOCK_GENERATION_INTERVAL: number = 10;   // Bitcoin 10 minutes
// in blocks
const DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;  // Bitcoin 2016 blocks

export class NiceChain {
  private chain: Block[];
  private currentBlock: Block;
  private genesisBlock: Block;

  constructor() {
    this.chain = new Array<Block>();
    // create genesis block
    this.genesisBlock = new Block({
      index: 0,
      previousHash: null,
      timestamp: 1524625620,
      data: 'NiceCoin Genesis Block',
      difficulty: 0,
      nonce: 0
    });

    // canculate GenesisBlock Hash
    this.genesisBlock.hash = this.calculateHash(this.genesisBlock);

    this.chain.push(this.genesisBlock);
    this.currentBlock = this.genesisBlock;
  }

  public calculateHash(iBlock: IBlock | Block | { timestamp: number, index: number, previousHash: string, data: string, difficulty: number, nonce: number }): string {
    const hash = Crypto.createHash('SHA256')
      .update(iBlock.timestamp + iBlock.data + iBlock.index + iBlock.previousHash + iBlock.difficulty + iBlock.nonce)
      .digest('hex');
    console.log(iBlock.data);
    console.log(hash);
    return hash;
  }

  public generateBlock(data): Block {
    let newBlock = new Block({
      timestamp: this.getCurrentTimestamp(),
      data: data,
      index: this.currentBlock.index,
      previousHash: this.currentBlock.hash
    });
    newBlock.hash = this.calculateHash(newBlock);

    return newBlock;
  }

  public add(block: Block): boolean {
    if (this.validateNewBlock(block, this.currentBlock)) {
      this.chain.push(block);
      this.currentBlock = block;
      return true;
    }

    return false;
  }

  public getLatestBlock(): Block {
    return this.currentBlock;
  }

  public getTotalBlock(): number {
    return this.chain.length;
  }

  public getBlockChain(): Block[] {
    return this.chain;
  }

  public validateHash(block: Block): boolean {
    return (this.calculateHash(block) === block.hash);
  }

  public validateNewBlock(block: Block, previousBlock: Block): boolean {
    if ((previousBlock.index + 1) !== block.index) {
      // invalid index
      return false;
    } else if (previousBlock.hash !== block.previousHash) {
      // previous hash is invalid
      return false;
    } else if (!this.validateHash(block)) {
      // block hash is invalid
      return false;
    }
  }

  public validateChain(blockchainToValidate: Block[]): boolean {
    const isValidGenesis = (block: Block): boolean => {
      return JSON.stringify(block) === JSON.stringify(this.genesisBlock);
    };

    if (!isValidGenesis(blockchainToValidate[0])) {
      return false;
    }

    for (let i = 1; i < blockchainToValidate.length; i++) {
      if (!this.validateNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
        return false;
      }
    }

    return true;
  }

  public hashMatchesDifficulty(hash: string, difficulty: number): boolean {
    const hashInBinary: string = hex2Binary(hash);
    const requiredPrefix: string = '0'.repeat(difficulty);

    return hashInBinary.startsWith(requiredPrefix);
  }

  public findBlock(index: number, previousHash: string, timestamp: number, data: string, difficulty: number): Block {
    let nonce = 0;

    while (true) {
      const hash: string = this.calculateHash({ timestamp: timestamp, index: index, previousHash: previousHash, data: data });
      if (this.hashMatchesDifficulty(hash, difficulty)) {
        return new Block({ index: index, hash: hash, previousHash: previousHash, timestamp: timestamp, data: data, difficulty: difficulty, nonce: nonce });
      }
      nonce++;
    }
  }

  public getCurrentTimestamp(): number {
    return Math.round(new Date().getTime() / 1000);
  }

  public isValidTimestamp(newBlock: Block, previousBlock: Block): boolean {
    return (previousBlock.timestamp - 60 < newBlock.timestamp) && (newBlock.timestamp - 60 < this.getCurrentTimestamp());
  }

  public getDifficulty(blockChain: Block[]): number {
    const latestBlock: Block = blockChain[blockChain.length -1];

    if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
      return this.getAdjustedDifficulty(latestBlock, blockChain);
    } else {
      return latestBlock.difficulty;
    }
  }

  public getAdjustedDifficulty(latestBlock: Block, blockChain: Block[]) {
    const previousAdjustmentBlock: Block = blockChain[blockChain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
    const timeExpected: number = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
    const timeTaken: number = latestBlock.timestamp - previousAdjustmentBlock.timestamp;

    if (timeTaken < timeExpected / 2) {
      return previousAdjustmentBlock.difficulty + 1;
    } else if (timeTaken > timeExpected * 2) {
      return previousAdjustmentBlock.difficulty -1 ;
    } else {
      return previousAdjustmentBlock.difficulty;
    }
  }
}