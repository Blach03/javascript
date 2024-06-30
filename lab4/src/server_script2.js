import http from 'http';
import fs from 'fs';
import url from 'url';

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === '/') {
        if (req.method === 'GET') {
            fs.readFile('guestbook.txt', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                
                const entries = data.split('\n\n');

                
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`
                    <html>
                        <head>
                            <title>Ksiega gosci</title>
                        </head>
                        <body>
                            <h1>Ksiega gosci</h1>
                            <h2>Poprzednie wpisy:</h2>
                `);

               
                entries.forEach(entry => {
                    const [name, message] = entry.split('\n');
                    if (name && message) {
                        res.write(`<div><strong>${name}</strong><br>${message}</div>`);
                    }
                });

                res.write(`
                            <h2>Nowy wpis:</h2>
                            <form method="post" action="/">
                                <div>
                                    <label for="name">Twoje imie i nazwisko:</label><br>
                                    <input type="text" id="name" name="name" style="font-weight: bold; text-transform: uppercase;" required><br><br>
                                </div>
                                <div>
                                    <label for="message">Tresc wpisu:</label><br>
                                    <textarea id="message" name="message" required></textarea><br><br>
                                </div>
                                <button type="submit">Dodaj wpis</button>
                            </form>
                        </body>
                    </html>
                `);
                res.end();
            });
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const formData = new URLSearchParams(body);
                const name = formData.get('name');
                const message = formData.get('message');

                fs.appendFile('guestbook.txt', `${name.toUpperCase()}\n${message}\n\n`, 'utf8', err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                        return;
                    }
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                });
            });
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
