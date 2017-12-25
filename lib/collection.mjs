
class Collection {

  constructor (text, callback) {
    this.text = text;
    this.callback = callback;
    this.collections = [];
    this.tests = [];
    this.beforeHooks = [];
    this.afterHooks = [];
  }

  appendCollection (text, callback) {
    const collection = new Collection(text, callback);
    collection.parent = this;
    this.collections.push(collection);
    return collection;
  }

  appendTest (text, callback) {
    const test = new Test(text, callback);
    collections[0].tests.push(test);
    return test;
  }

  appendBeforeHook (callback) {
    const hook = new Hook(callback);
    this.beforeHooks.push(hook);
  }

  appendAfterHook (callback) {
    const hook = new Hook(callback);
    this.afterHooks.push(hook);
  }

  async runBeforeHooks () {
    if (this.parent) await this.parent.runBeforeHooks();
    for (const hook of this.beforeHooks) {
      await hook.run();
    }
  }

  async runAfterHooks () {
    if (this.parent) await this.parent.runAfterHooks();
    for (const hook of this.afterHooks) {
      await hook.run();
    }
  }

  async run () {
    console.log(`+ ${this.text}`);
    let failed = 0;
    for (const test of this.tests) {
      await this.runBeforeHooks();
      failed += !await test.run();
      await this.runAfterHooks();
    }
    for (const collection of this.collections) {
      failed += await collection.run();
    }
    return failed;
  }
}

class Test {

  constructor (text, callback) {
    this.text = text;
    this.callback = callback;
  }

  async run () {
    console.log(`- ${this.text}`);
    try {
      await this.callback();
      console.log('  Ok');
      return true;
    } catch (ex) {
      //console.log(`  Actual: ${ex.actual}\n  Expected: ${ex.expected}`);
      console.log(ex);
      return false;
    }
  }
}

class Hook {

  constructor (callback) {
    this.callback = callback;
  }

  async run () {
    await this.callback();
  }

}

const collections = [new Collection()];

export function pushCollection(text, callback) {
  const c = collections[0];
  collections.unshift(c.appendCollection(text, callback));
}

export function popCollection() {
  collections.shift();
}

export function appendTest (text, callback) {
  return collections[0].appendTest(text, callback);
}

export function appendBeforeHook (callback) {
  collections[0].appendBeforeHook(callback);
}

export function appendAfterHook (callback) {
  collections[0].appendAfterHook(callback);
}

export async function run () {
  return await collections[collections.length - 1].run();
}
