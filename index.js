const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    // Serve the index.html file
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('A new client connected!');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
