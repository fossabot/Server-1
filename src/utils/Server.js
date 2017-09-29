import { ipcRenderer } from 'electron';
import EventEmitter from 'event-emitter';

class Server {
  constructor() {
    this.events = new EventEmitter();

    ipcRenderer.on('SERVER_STATUS', (event, data) => {
      this.events.emit('SERVER_STATUS', data);
    });
  }

  on(...args) {
    this.events.on(...args);
  }

  requestServerStatus = () => {
    ipcRenderer.send('REQUEST_SERVER_STATUS');
  }
}

export default Server;
