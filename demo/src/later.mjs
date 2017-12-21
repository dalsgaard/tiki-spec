
export function later (value) {
  return new Promise (resolve => {
    process.nextTick(() => {
      resolve(value);
    });
  });
}
