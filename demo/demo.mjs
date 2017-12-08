import { describe, it, before, run, assert } from '../index.mjs';

function later (value) {
  return new Promise (resolve => {
    process.nextTick(() => {
      resolve(value);
    });
  });
}

class Stack extends Array {

  async empty () {
    return later(!!(this.length == 0));
  }

}

describe('A stack', () => {
  let stack;

  before (() => {
    stack = new Stack();
  });

  describe('An empty stack', () => {

    it.should('have a length of 0', () => {
      assert.equal(0, stack.length);
    });

    it.should('be empty', async () => {
      const empty = await stack.empty();
      assert.equal(true, empty);
    });

  });

  describe('A stack with one element', () => {
    const pushed = 42;

    before (() => {
      stack.push(pushed);
    });

    it.should('have a length of 1', () => {
      assert.equal(1, stack.length);
    });

    it.should('not be empty', async () => {
      const empty = await stack.empty();
      assert.equal(false, empty);
    });

    describe('Popping', () => {
      
      it.should('return the last element', () => {
        assert.equal(pushed, stack.pop());
      });
  
    });  

    describe('After popping', () => {
      
      before (() => {
        stack.pop();
      });

      it.should('have a length of 0', () => {
        assert.equal(0, stack.length);
      });
  
    });  
    
  });

  describe('A stack with more elements', () => {
    
    
  });

});

run();