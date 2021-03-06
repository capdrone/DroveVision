module.exports = BrowserWindow => {
  // Create a view menu on the menu bar called "View"
  // This view menu supports OSX and other OSs
  const viewMenu = {
    label: 'View',
    submenu: [
      {
        label: 'Dev tools',
        accelerator:
          process.platform === 'darwin'
            ? 'CommandOrControl+Option+I'
            : 'CommandOrControl+Shift+I',
        click() {
          BrowserWindow.webContents.openDevTools();
        },
      },
      {
        label: 'Refresh',
        accelerator: 'CmdOrCtrl+R',
        click() {
          BrowserWindow.reload();
        },
      },
      {
        label: 'Zoom In',
        accelerator: 'CmdOrCtrl+Shift+Plus',
        role: 'zoomin',
      },
      {
        label: 'Zoom Out',
        accelerator: 'CmdOrCtrl+-',
        role: 'zoomout',
      },

      { role: 'togglefullscreen' },
    ],
  };
  return viewMenu;
};
