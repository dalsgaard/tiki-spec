import {
  pushCollection,
  popCollection,
  appendAfterHook,
  appendBeforeHook,
  appendTest
} from './collection.mjs';

export function describe (text='', callback) {
  pushCollection(text, callback);
  callback();
  popCollection();
}

export function it (text, callback) {
  return appendTest(text, callback);
}

function should (...args) {
  const test = it(...args);
  test.should = true;
}

it.should = should;

export function before (callback) {
  appendBeforeHook(callback);
}

export function after (callback) {
  appendAfterHook(callback);
}
