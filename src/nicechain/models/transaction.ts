import * as Crypto from 'crypto';

const ec = Crypto.createECDH('secp256k1');

const COINBASE_AMOUNT: number = 50;


export class TxIn {
    public txOutId: string;
    public txOutIndex: number;
    public signature: string;
}

export class TxOut {
    public address: string;
    public amount: number;

    constructor(address: string, amount: number) {
        this.address = address;
        this.amount = amount;
    }
}

export class UnspentTxOut {
    public readonly txOutId: string;
    public readonly txOutIndex: number;
    public readonly address: string;
    public readonly amount: number;

    constructor(txOutId: string, txOutIndex: number, address: string, amount: number) {
        this.txOutId = txOutId;
        this.txOutIndex = txOutIndex;
        this.address = address;
        this.amount = amount;
    }
}

export class Transaction {
    public id: string;
    public txIns: TxIn[];
    public txOuts: TxOut[];

    constructor() {
        this.id = '';
    }

    public genTransactionId(): void {
        const txInContent: string = this.txIns
            .map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
            .reduce((a, b) => a + b, '');

        const txOutContent: string = this.txOuts
            .map((txOut: TxOut) => txOut.address + txOut.amount)
            .reduce((a, b) => a + b, '');

        this.id = Crypto.createHash('SHA256').update(txInContent + txOutContent).digest('hex');
    }

    public signTxIn(txInIndex: number, privateKey: string, unspentTxOuts: UnspentTxOut[]): string {
        const txIn: TxIn = this.txIns[txInIndex];
        const data2Sign = this.id;

        const referencedUnspentTxOut: UnspentTxOut = findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, unspentTxOuts);

        if (referencedUnspentTxOut == null) {
            throw Error('Can not find txOut: ' + txIn.txOutId);
        }

        const referencedAddress = referencedUnspentTxOut.address;
        const key = ec.setPrivateKey(privateKey, 'hex');

        return '';
    }
}

export const findUnspentTxOut = (transactionId: string, index: number, unspentTxOuts: UnspentTxOut[]): UnspentTxOut => {
    return unspentTxOuts.find((uTxO) => uTxO.txOutId === transactionId && uTxO.txOutIndex === index);
}

export const getPublicKey = (privateKey: string): string => {
    ec.setPrivateKey(privateKey, 'hex')
    return ec.getPublicKey().toString();
}