const { createServer } = require('./components/serverManager');
const path = require('path');

const appSettingsDB = path.join(path.resolve(__dirname), '../', 'db', 'settings');

createServer(8080, appSettingsDB).then((serverProcess) => {
  serverProcess.on(
    'SERVER_STATUS',
    ({ data }) => {
      console.log(data);
    }
  );

  serverProcess.send({ action: 'REQUEST_SERVER_STATUS' });
});
