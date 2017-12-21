import { run } from '..';

import './specs';

run().then(failed => {
  console.log(`\nfailed: ${failed}`);
});