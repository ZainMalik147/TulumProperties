// Static preview server with clean URLs: node serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const port = +(process.argv[2] || 3000);
const root = path.join(here, 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.yml': 'text/yaml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif'
};

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) {
    res.writeHead(404, { 'content-type': types['.html'] });
    return fs.createReadStream(path.join(root, '404.html')).pipe(res);
  }
  res.writeHead(200, {
    'content-type': types[path.extname(f).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store'
  });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(Site preview running at: http://localhost:\));
