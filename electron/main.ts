import { app, BrowserWindow, ipcMain, session, Tray, Menu, nativeImage, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
let tray: Tray | null = null

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false, // Bypass CORS e evita requisições OPTIONS no LM Studio
    },
    width: 400,
    height: 600,
    alwaysOnTop: true, // Always on top of zoom/meet
    transparent: true, // Transparent background
    frame: false,      // No window frame/titlebar
    hasShadow: false,
    skipTaskbar: true, // Esconde da barra de tarefas
    x: 0, // Position on screen (we can make this dragable later)
    y: 0,
  })

  // Permite fechar o app pelo React
  ipcMain.on('quit-app', () => {
    app.quit();
  });

  // Permite minimizar/esconder pelo React
  ipcMain.on('hide-app', () => {
    win?.hide();
  });

  // Permite abrir links no navegador padrão do sistema
  ipcMain.on('open-external', (event, url) => {
    shell.openExternal(url);
  });

  // MODO FANTASMA: Esconde a janela de capturas de tela e compartilhamento
  win.setContentProtection(true);

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  // Conceder permissão automática para o microfone
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true)
    } else {
      callback(false)
    }
  })

  // Em navegadores baseados em Chromium, isso ajuda na API de reconhecimento de fala
  session.defaultSession.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
    if (permission === 'media') {
      return true;
    }
    return false;
  })

  createWindow()

  // Criar Tray Icon
  const iconPath = path.join(process.env.VITE_PUBLIC, 'icon.png')
  // Usar nativeImage ajuda em algumas plataformas
  const trayIcon = nativeImage.createFromPath(iconPath)
  tray = new Tray(trayIcon)
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Mostrar Second Brain', click: () => win?.show() },
    { label: 'Esconder', click: () => win?.hide() },
    { type: 'separator' },
    { label: 'Encerrar', click: () => app.quit() }
  ])
  
  tray.setToolTip('Second Brain')
  tray.setContextMenu(contextMenu)
  
  // Ao clicar no ícone do Tray, alterna entre mostrar e esconder
  tray.on('click', () => {
    if (win?.isVisible()) {
      win.hide()
    } else {
      win?.show()
    }
  })
})
