import { describe, it, before, expect } from '../..';
import { Stack } from '../src/stack';


describe('A stack', () => {
  let stack;

  before (() => {
    stack = new Stack();
  });

  describe('An empty stack', () => {

    it.should('have a length of 0', () => {
      expect(stack.length).to.equal(0);
    });

    it.should('be empty', async () => {
      const empty = await stack.empty();
      expect(empty).to.be.true;
    });

  });

  describe('A stack with one element', () => {
    const pushed = 42;

    before (() => {
      stack.push(pushed);
    });

    it.should('have a length of 1', () => {
      expect(stack.length).to.equal(1);
    });

    it.should('not be empty', async () => {
      const empty = await stack.empty();
      expect(empty).to.be.false;
    });

    describe('Popping', () => {
      
      it.should('return the last element', () => {
        expect(stack.pop()).to.equal(pushed);
      });
  
    });  

    describe('After popping', () => {
      
      before (() => {
        stack.pop();
      });

      it.should('have a length of 0', () => {
        expect(stack.length).to.equal(0);
      });
  
    });  
    
  });

  describe('A stack with more elements', () => {
    
    
  });

});
