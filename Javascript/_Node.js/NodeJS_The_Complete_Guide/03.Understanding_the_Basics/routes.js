const fs = require('fs');

const handler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body><h1>Hi</h1></body>');
    res.write('</html>');
    res.end();
  } else if (url === '/todo') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <form action="/message" method="POST">
    <input type="text" name="message">
    <button type="submit">Send</button>
    </form>
  </body>
  </html>`);
    res.end();
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => { // on 'data' recieved Event Listener
      console.log(chunk); // small file -> only one Buffer
      body.push(chunk);
    });
    req.on('end', () => { // on 'end' Event Listener
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // fs.writeFileSync('message.txt', message);
      fs.writeFile('message.txt', message, (err) => {
        res.setHeader('Location', '/');
        res.statusCode = 302;
        console.log('message send'); // executes before req.on.....(async)
        res.end();
      });
      console.log(parsedBody);
      console.log(message);
    });
  }
};

module.exports = handler;
