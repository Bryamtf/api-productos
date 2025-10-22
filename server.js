require('dotenv').config();
const http = require("http");
const hostname = "0.0.0.0"|| "127.0.0.1";
const port = process.env.PORT || 4000;
// leer el json
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, 'data.json')
const server = http.createServer((req, res) => { 
    //CORS
    const origin = req.headers.origin || "*";
    res.setHeader(
       "Access-Control-Allow-Origin",
       origin === "null" ? "*" : origin
     );
     res.setHeader("Vary", "Origin");
     res.setHeader(
       "Access-Control-Allow-Methods",
       "GET, POST, PUT, DELETE, OPTIONS"
     );
     res.setHeader(
       "Access-Control-Allow-Headers",
       "Content-Type, Authorization"
     );
     res.setHeader("Access-Control-Allow-Credentials", "true");

   if (req.method === "OPTIONS") {
     res.writeHead(204);
     res.end();
     return;
   }

    if (req.url === '/api/productos' && req.method === 'GET') {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error al leer los datos");
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else { 
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada')
    }
});

server.listen(port, hostname, () => {
    console.log(`El servidor esta corriendo http://${hostname}:${port}`);
});