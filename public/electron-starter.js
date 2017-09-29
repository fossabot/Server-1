const { app, ipcMain } = require('electron');
const path = require('path');
const { createMainWindow } = require('./components/mainWindow');
const { createTray } = require('./components/tray');
const { createServer } = require('./components/serverManager');

const settingsDb = path.join(app.getPath('userData'), 'db', 'settings');

let server = null;

const mainWindow = createMainWindow();

createServer(8080, settingsDb).then((serverProcess) => {
  server = serverProcess;

  ipcMain.on('REQUEST_SERVER_STATUS', (event) => {
    serverProcess.on(
      'SERVER_STATUS',
      ({ data }) => {
        console.log(data);
        event.sender.send('SERVER_STATUS', data);
        // ipcMain.send('SERVER_STATUS', data);
      }
    );

    serverProcess.send({ action: 'REQUEST_SERVER_STATUS' });
  });
});

const trayMenu = [
  {
    label: 'Overview',
    click: () => { mainWindow.open('/overview'); }
  },
  {
    label: 'Export data',
    click: () => { mainWindow.open('/export'); }
  },
  {
    label: 'Quit',
    click: () => { app.quit(); }
  },
];

app.on('ready', () => {
  // app.dock.hide();
  // app.tray = createTray(trayMenu);
  mainWindow.open('/overview');
});

// Don't quit when all windows are closed.
app.on('window-all-closed', () => { });  // no op

app.on('before-quit', () => {
  // Quit spawned server process
  server.stop();
});
