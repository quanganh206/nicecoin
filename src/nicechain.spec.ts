import { expect } from 'chai';
import Calculator from './index';

import { Block, IBlock } from './block';
import { NiceChain } from './nicechain';

describe("Calculator", () => {
    describe("Add", () => {
        it("Should return 3 when a = 1 and b = 2", () => {
            let calc = new Calculator();

            var result = calc.Add(1,2);

            expect(result).to.equal(3);
        });
    })
});

describe('NiceChain', () => {
    describe('createHash', () => {
        it("Should create New Block with data 'Hello New Block'", () => {
            let niceChain = new NiceChain();
            let result = niceChain.createBlock('Hello New Block');

            // let hash = niceChain.createHash({timestamp: result.timestamp, index: result.index, previousHash: result.previousHash, data: result.data})
            // expect(result.hash).to.equal(hash);
            expect(result.data).to.equal('Hello New Block');
        });
    })
});