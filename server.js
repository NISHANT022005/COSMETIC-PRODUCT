const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(__dirname)); // Serves your HTML and images

// In-memory user store (for demo only)
const users = [];

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: 'Username already exists.' });
    }
    users.push({ username, email, password });
    res.json({ success: true, message: 'Signup successful!' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.json({ success: false, message: 'Invalid credentials.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});