"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("./index");
const nicechain_1 = require("./nicechain");
describe("Calculator", () => {
    describe("Add", () => {
        it("Should return 3 when a = 1 and b = 2", () => {
            let calc = new index_1.default();
            var result = calc.Add(1, 2);
            chai_1.expect(result).to.equal(3);
        });
    });
});
describe('NiceChain', () => {
    describe('createHash', () => {
        it("Should create New Block with data 'Hello New Block'", () => {
            let niceChain = new nicechain_1.NiceChain();
            let result = niceChain.createBlock('Hello New Block');
            // let hash = niceChain.createHash({timestamp: result.timestamp, index: result.index, previousHash: result.previousHash, data: result.data})
            // expect(result.hash).to.equal(hash);
            chai_1.expect(result.data).to.equal('Hello New Block');
        });
    });
});
//# sourceMappingURL=nicechain.spec.js.map