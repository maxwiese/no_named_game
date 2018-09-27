// Frame JS
(function () {
    // Retrieve remote BrowserWindow
    const { BrowserWindow } = require('electron').remote

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
        document.getElementById('toolbar-file').addEventListener("click", (e) => {
            toggleContainer();
        })

        document.getElementById('foldout-item').addEventListener("click", (e) => {
            var window = BrowserWindow.getFocusedWindow();
            window.webContents.openDevTools()
            toggleContainer();
        })

        // Fullscreen via F11
        window.addEventListener('keydown', keyPressed => {
            let f11 = document.getElementById('title-bar');
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


function toggleContainer() {
    let foldout = document.getElementById('foldout-container');
    let element = document.getElementById("toolbar-file");
    let greyout = document.getElementById("desktop-app-content");



    switch (foldout.style.display) {
        case 'block':
            foldout.style.display = 'none'
            element.classList.add("closed");
            element.classList.add("hover");
            element.classList.remove("open");
            greyout.classList.remove('greyout')
            break

        case 'none':
            document.getElementById('foldout-container').style.display = 'block'
            element.classList.add("open");
            element.classList.remove("hover");
            element.classList.remove("closed");
            greyout.classList.add('greyout')
            break

        default:
            document.getElementById('foldout-container').style.display = 'block'
            element.classList.add("open");
            element.classList.remove("hover");
            element.classList.remove("closed");
            greyout.classList.add('greyout')
    }
}

