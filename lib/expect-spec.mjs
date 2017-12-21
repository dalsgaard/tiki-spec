import { describe, it, expect, assert } from '..';

describe('expect', () => {

  describe('true', () => {

    it.should('compare strict', () => {
      expect(true).to.be.true;
      assert.throws(() => expect(1).to.be.true);
      assert.throws(() => expect(false).to.be.true);
    });

    it.should('understand not', () => {
      expect(false).to.be.not.true;
      expect(1).to.be.not.true;
      assert.throws(() => expect(true).to.be.not.true);
    });

  });

  describe('equal', () => {

    it.should('compare loose as default', () => {
      expect(2).to.equal(2);
      expect(2).to.equal('2');
      assert.throws(() => expect(2).to.equal(3));
    });

    it.should('understand strict', () => {
      expect(2).to.strict.equal(2);
      assert.throws(() => expect(2).to.strict.equal('2'));
      assert.throws(() => expect(2).to.strict.equal(3));
    });

    it.should('understand deep', () => {
      expect([1, 2]).to.deep.equal([1, 2]);
      assert.throws(() => expect([1, 2]).to.deep.equal([1, 2, 3]));
      expect([1, 2]).to.deep.equal([1, '2']);
      assert.throws(() => expect([1, 2]).to.deep.strict.equal([1, '2']));
    });

    it.should('understand not', () => {
      expect(2).to.not.equal(3);
      assert.throws(() => expect(2).to.not.equal(2));
      assert.throws(() => expect(2).to.not.equal('2'));
      expect(2).to.not.strict.equal('2');
      assert.throws(() => expect(2).to.not.strict.equal(2));
      expect([1, 2]).to.not.deep.equal([1, 2, 3]);
      assert.throws(() => expect([1, 2]).to.not.deep.equal([1, 2]));
      assert.throws(() => expect([1, 2]).to.not.deep.equal(['1', '2']));
      expect([1, 2]).to.not.deep.strict.equal([1, 2, 3]);
      expect([1, 2]).to.not.deep.strict.equal(['1', '2'])
      assert.throws(() => expect([1, 2]).to.not.deep.equal([1, 2]));
    });

  });

});