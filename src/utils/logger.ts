/** @format */

import { EventEmitter } from 'events';

class Logger extends EventEmitter {
  constructor() {
    super();
  }
  log(message: string, payload: any) {
    this.emit(message, payload);
  }
}

export default Logger;
