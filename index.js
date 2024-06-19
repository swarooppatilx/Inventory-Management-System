const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;
let adminServer;

const users = {
    admin: '1',
    user: '2'
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve login page for admin and user pages without proper authentication
app.get(['/admin.html', '/user.html'], (req, res) => {
    res.sendFile(path.join(__dirname,'login.html'));
});

// Serve admin page with authentication check
app.get('/admin', (req, res) => {
    const password = req.query.password;
    if (password === '1') {
        res.sendFile(path.join(__dirname,'admin.html'));
    } else {
        res.send('Invalid password. Access denied.');
    }
});

// Serve user page with authentication check
app.get('/user', (req, res) => {
    const password = req.query.password;
    if (password === '2') {
        res.sendFile(path.join(__dirname,'user.html'));
    } else {
        res.send('Invalid password. Access denied.');
    }
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        if (username === 'admin' && !adminServer) {
            adminServer = spawn('node', ['server.js']);
            adminServer.stdout.on('data', (data) => {
                console.log(`Admin server stdout: ${data}`);
            });
            adminServer.stderr.on('data', (data) => {
                console.error(`Admin server stderr: ${data}`);
            });
            adminServer.on('close', (code) => {
                console.log(`Admin server exited with code ${code}`);
            });
        }

        const redirectUrl = username === 'admin' ? 'http://localhost:3001/admin.html' : 'http://localhost:3001/user.html';
        res.json({ status: 'success', redirectUrl });
    } else {
        res.json({ status: 'error' });
    }
});

app.post('/logout', (req, res) => {
    const { username } = req.body;

    if (username === 'admin' && adminServer) {
        adminServer.kill();
        adminServer = null;
    }

    res.json({ status: 'success' });
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
