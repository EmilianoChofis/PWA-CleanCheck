import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Obtener la ruta al directorio donde está el archivo actual
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Rutas a los certificados
const certPath = path.join(__dirname, '../certificate.crt');
const keyPath = path.join(__dirname, '../privkey.key');

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
};

app.prepare().then(() => {
    createServer(options, (req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(443, () => {
        console.log('> Server listening on https://integradora.duckdns.org:8083/');
    });
});
