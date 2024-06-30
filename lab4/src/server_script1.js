import http from 'node:http';
import { URL } from 'node:url';

function requestListener(request, response) {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');

    const url = new URL(request.url, `http://${request.headers.host}`);

    switch ([request.method, url.pathname].join(' ')) {
        case 'GET /':
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Vanilla Node.js application</title>
                </head>
                <body>
                    <main>
                        <h1>Vanilla Node.js application</h1>
                        <form method="POST" action="/">
                            <label for="name">Give your name</label>
                            <input name="name">
                            <br>
                            <input type="submit">
                            <input type="reset">
                        </form>
                    </main>
                </body>
                </html>
            `);
            response.end();
            break;

        case 'GET /submit':
            const name = url.searchParams.get('name');
            response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write(`Hello ${name}`);
            response.end();
            break;

        case 'POST /':
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                const formData = new URLSearchParams(body);
                const name = formData.get('name');

                response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                response.write(`Hello ${name}`);
                response.end();
            });
            break;

        default:
            response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write('Error 501: Not implemented');
            response.end();
    }
}

const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');
