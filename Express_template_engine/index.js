const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
const db = require('./db');


const es6Renderer = require('express-es6-template-engine'); //importing module
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            title: 'Address Book App'
        },
        partials: {
            head: '/partials/head'
        }
    });
});

app.get('/friends', (req, res) => {
    res.render('friends-list', {
        locals: {
            title: 'Friends List',
            friends: db,
            path: req.path //This gives us a path variable that can be used as a placeholder in our template.
        },
        partials: {
            head: '/partials/head'
        }
    });
});

app.get('/friends', (req, res) => {
    res.render('friend', {
        locals: {
            title: `${friend.name}'s info`,
            friend
        },
        partials: {
            head: '/partials/head'
        }
    });
});


app.get('/friends/:handle', (req, res) => {
    const {handle} = req.params;
    const friend = db.find(f => f.handle === handle);

    if (friend) {
        res.render('friend', {
            locals: {
                friend
            },
            partials: {
                head: '/partials/head'
            }
        });
    } else {
        res.status(404)
            .send(`no friend with handle ${handle}`)
    }
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});