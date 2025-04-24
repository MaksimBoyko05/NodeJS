const http = require('http');
const {readFile, readFileSync} = require('fs');

// get file
const homePage = readFileSync('./node-express-course/02-express-tutorial/navbar-app/index.html', 'utf-8');
const homeStyles = readFileSync('./node-express-course/02-express-tutorial/navbar-app/styles.css', 'utf-8');
const homeImage = readFileSync('./node-express-course/02-express-tutorial/navbar-app/logo.svg', 'utf-8');
const homeLogic = readFileSync('./node-express-course/02-express-tutorial/navbar-app/browser-app.js', 'utf-8');
const server = http.createServer( (req, res) => {
const url = req.url;

if(url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(homePage);
    res.end();
}
else if(url === '/about'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>About Page</h1>');
    res.end();
}
else if(url === '/styles.css'){
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(homeStyles);
    res.end();
}
else if(url === '/logo.svg'){
    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.write(homeImage);
    res.end();
}
else if(url === '/browser-app.js'){
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(homeLogic);
    res.end();
}
else if(url === '/contact'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Contact Page</h1>');
    res.end();
}
else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>404 Not Found</h1>');
    res.end();
}
});

server.listen(5000)