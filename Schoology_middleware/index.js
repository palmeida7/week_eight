const express = require('express');
const { get } = require('http');
const app = express();

const checkPlace = require("./checkPlace");
const db = require("./db");

const createMessage = (req,res,next)=>{
    res.locals.message = db[Math.floor(Math.random() * 4)]
    next()
}

//app.use(checkPlace); //this will now be used on every route
//app.use(createMessage); cant use before the actual function is initialized

const PORT = 5050;


// const createMessage = (req,res,next)=>{
//     res.locals.message = `Hey ${res.locals.place.name} your slogan is ${res.locals.place.slogan}`
//     next();
// }


app.get("/", createMessage, (req, res)=>{
    res.send(res.locals.message)
});

app.get("/names", createMessage, (req, res)=>{
    res.send(`<h1>You are on the Restaurants page</h1> ${res.locals.message}`)
});


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});