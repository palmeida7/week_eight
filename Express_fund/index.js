//Express.js is a library for Node.js that helps you organize and optimize your code when building a web application.

const http = require('http'); //not required in express

const hostname = '127.0.0.1'; //Recall that 127.0.0.1 is the IP Address that your computer uses to refer to itself.
const express = require('express'); //imports Express module
const app = express(); //calls the express() function and stores the result in the app variable
const port = 3000; //Port 3000 is an arbitrary, but popular, choice for a port number to use when developing code.

const server = http.createServer(app); //Line 4 creates an HTTP server using our Express app
const db = require('./db');

app.get('/', (req,res)=> { //creating our route
    res.send('Hello from Express!');
});

// app.get('/friends', (req, res) => { //creating a second route that will feature a friends list
//     res.send('This will be the friends list');
// });

// app.get('/friends', (req, res) => {
//     let htmlData = `<ul>`;
//     for (let friend of db) {
//         htmlData += `<li>${friend.name}</li>`;
//     }
//     htmlData += `</ul>`;
//     res.send(htmlData);
// });

app.get('/friends', (req, res) => {
    let htmlData = `<ul>`;
    for (let friend of db) {
        htmlData += `<li>
                        <a href="${req.path}${friend.handle}">${friend.name}</a>
                    </li>`;
    }
    htmlData += `</ul>`;
    res.send(htmlData);
});

// app.get('/friends/:handle', (req, res) => {
//     const {handle} = req.params;
//     res.send(`<h1>${handle}</h1>`)
// });

app.get('/friends/:handle', (req, res) => {
    const {handle} = req.params;
    const friend = db.find(f => f.handle === handle);
    if (friend) {
        let htmlData = ``;
        htmlData += `<h1>${friend.name}</h1>`;
        htmlData += `<h3>${friend.handle}</h1>`;
        htmlData += `<h3>${friend.skill}</h1>`;
        res.send(htmlData);
    } else {
        res.send(`no friend with handle ${handle}`)
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});