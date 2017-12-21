import { later } from './later';

export class Stack extends Array {

  async empty () {
    return later(!!(this.length == 0));
  }

}