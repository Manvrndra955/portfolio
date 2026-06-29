const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(req.url);
  } catch (e) {
    decodedUrl = req.url;
  }

  let filePath = decodedUrl === '/' || decodedUrl === '/index.html'
    ? path.join(PUBLIC_DIR, 'index.html')
    : path.join(PUBLIC_DIR, decodedUrl);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('404 File Not Found');
      } else {
        res.statusCode = 500;
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\nServer is successfully running at http://localhost:${PORT}`);
  console.log('Serving index.html as the home page.\n');
  
  const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open');
  require('child_process').exec(`${start} http://localhost:${PORT}`);
});
