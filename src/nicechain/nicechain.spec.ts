import { expect } from 'chai';

import { Block, IBlock } from './models';
import { NiceChain } from './nicechain';

describe('NiceChain', () => {
  describe('createHash', () => {
    it("Should create New Block with data 'Hello New Block'", () => {
      let niceChain = new NiceChain();
      let result = niceChain.generateBlock('Hello New Block');

      // let hash = niceChain.createHash({timestamp: result.timestamp, index: result.index, previousHash: result.previousHash, data: result.data})
      // expect(result.hash).to.equal(hash);
      // expect(result.index)
      expect(result.data).to.equal('Hello New Block');
    });
  })
});