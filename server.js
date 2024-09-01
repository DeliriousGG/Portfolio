const http = require('http');
const cors = require('cors');  // Import the cors middleware
const sendEmailHandler = require('./pages/api/sendemail');

const port = process.env.PORT || 3000;

const corsMiddleware = cors();  // Create an instance of the cors middleware

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => {
    // Continue with your existing code

    if (req.method === 'OPTIONS') {
      // Handle preflight requests
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*', // Replace with actual origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    let data = '';

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const body = JSON.parse(data);
        req.body = body;

        if (req.url === '/api/sendEmail' && req.method === 'POST') {
          sendEmailHandler(req, res);
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Not Found' }));
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Bad Request' }));
      }
    });
  });
});

server.listen(port, () => {
  console.log('RUNNING');
});