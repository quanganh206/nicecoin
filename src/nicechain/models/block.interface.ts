export interface IBlock {
    index: number;
    previousHash: string;
    timestamp: number;
    data: string;

    hash?: string;
    difficulty?: number;
    nonce?: number;
}