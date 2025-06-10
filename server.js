const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serves your HTML/CSS/JS files

const users = []; // In-memory user storage

app.post('/api/signup', (req, res) => {
    const {username, email, password} = req.body;
    if (users.find(u => u.username === username)) {
        return res.json({success: false, message: 'Username already exists'});
    }
    users.push({username, email, password});
    res.json({success: true, message: 'Account created!'});
});

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({success: true, message: 'Login successful!'});
    } else {
        res.json({success: false, message: 'Invalid credentials'});
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));