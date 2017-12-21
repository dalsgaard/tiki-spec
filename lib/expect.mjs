import assert from 'assert';

class Expection {

  constructor (actual) {
    this.actual = actual;
  }

  get to () {
    return this;
  }

  get be () {
    return this;
  }

  get not () {
    this._not = !this._not;
    return this;
  }

  get strict () {
    this._strict = !this._strict;
    return this;
  }

  get deep () {
    this._deep = !this._deep;
    return this;
  }

  get true () {
    if (this._not) {
      assert.notStrictEqual(this.actual, true);
    } else {
      assert.strictEqual(this.actual, true);
    }
  }

  get false () {
    if (this._not) {
      assert.notStrictEqual(this.actual, false);
    } else {
      assert.strictEqual(this.actual, false);
    }
  }

  get ok () {
    const value = this._not ? !this.actual : this.actual;
    assert.ok(value);
  }

  get truthy () {
    this.ok;
  }

  get falsy () {
    if (this._not) {
      assert.notEqual(this.actual, false);
    } else {
      assert.equal(this.actual, false);
    }
  }

  equal (expected) {
    if (this._not) {
      if (this._deep) {
        if (this._strict) {
          assert.notDeepStrictEqual(this.actual, expected);
        } else {
          assert.notDeepEqual(this.actual, expected);
        }
      } else {
        if (this._strict) {
          assert.notStrictEqual(this.actual, expected);
        } else {
          assert.notEqual(this.actual, expected);
        }
      }
    } else {
      if (this._deep) {
        if (this._strict) {
          assert.deepStrictEqual(this.actual, expected);
        } else {
          assert.deepEqual(this.actual, expected);
        }
      } else {
        if (this._strict) {
          assert.strictEqual(this.actual, expected);
        } else {
          assert.equal(this.actual, expected);
        }
      }
    }
  }
}

function expect (actual) {
  return new Expection(actual);
}

export { expect };