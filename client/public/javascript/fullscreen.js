const sqlite = require('sqlite3').verbose();
const { BrowserWindow } = require('electron').remote

let db = new sqlite.Database('../server/DB/DataBase/FULLSCREEN.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected FULLSCREEN DB')

    }
});

db.all('SELECT * FROM FULLSCREEN;', (err, rows) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Got Data')
        setValue(rows)
    }
})


db.close((err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Closed FULLSCREEN DB')
    }
})


function setValue(value) { 
    var window = BrowserWindow.getFocusedWindow();
    if (value[0].FULLSCREEN == 1) {
        window.setFullScreen(true)
        document.getElementById('title-bar').style.display = 'none'
        document.getElementById('opt').removeAttribute('selected', 'selected')
    } else {
        window.setFullScreen(false)
        document.getElementById('title-bar').style.display = 'block'
        document.getElementById('opt').setAttribute('selected', 'selected')

    }
}

function changeToFullScreen() {
    var e = document.getElementById("modal");
    var strUser = e.options[e.selectedIndex].value;
    let data = strUser;

    let db = new sqlite.Database('../server/DB/DataBase/FULLSCREEN.db', sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Connected FULLSCREEN DB')

        }
    });

    db.run('UPDATE FULLSCREEN SET FULLSCREEN  = ?', data, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('Row(s) updated')
        }
    })

    db.close((err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('Closed FULLSCREEN DB')
        }
    })

    document.getElementById('modal-content').style.display = 'none'
}