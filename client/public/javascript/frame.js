// Frame JS
(function () {
    // Retrieve remote BrowserWindow
    const { BrowserWindow } = require('electron').remote
    const f11 = document.getElementById('title-bar');

    function init() {
        // Minimize task
        document.getElementById("min-btn").addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            window.minimize();
        });

        // Maximize window
        document.getElementById("max-btn").addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            if (window.isMaximized()) {
                window.unmaximize();
            } else {
                window.maximize();
            }
        });

        // Close app
        document.getElementById("close-btn").addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            window.close();
        });

        // Toggle Dev Tools
        document.getElementById('dropbtn').addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            window.webContents.openDevTools()
        })

        // Fullscreen via F11
        window.addEventListener('keydown', keyPressed => {
            if (keyPressed.keyCode == 122) {
                var window = BrowserWindow.getFocusedWindow();
                if (!window.isFullScreen()) {
                    f11.style.display = 'none'
                    console.log('Fullscreen enabled')
                } else {
                    f11.style.display = 'block'
                    console.log('Fullscreen disabled')
                }
            }
        }, true);
    };

    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            init();
        }

    };
})();