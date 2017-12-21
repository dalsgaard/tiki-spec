import { run } from '../..';

import './stack-spec';

run().then(failed => {
  console.log(`\nfailed: ${failed}`);
});