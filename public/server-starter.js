const { createServer } = require('./components/serverManager');
const path = require('path');

createServer(8080).then((serverProcess) => {
  serverProcess.on(
    'SERVER_STATUS',
    ({ data }) => {
      console.log(data);
    }
  );

  serverProcess.send({ action: 'REQUEST_SERVER_STATUS' });
});
