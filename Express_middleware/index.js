const express = require('express');
const { get } = require('http');
const app = express();

const checkName = require("./checkName");

app.use(checkName); //this will now be used on every route
//app.use(createMessage); cant use before the actual function is initialized


const PORT = 5556;

//Express is very focused on object oriented programming
//first argument is always the route; then after are only functions or middleware waiting to be called and processed

// app.get('/', (req, res, next) => { //this is middleware
//     console.log(next);
//     next() 
// }, (req, res) =>{
//     console.log("This was next?")
//     res.send("We are good to go")

// });

// const middleware = (req, res, next)=>{ //example function to demonstrate middleware
//     console.log('Yes!');
//     next()
// }

const createMessage = (req,res,next)=>{
    res.locals.message = `Hey ${res.locals.person.name} your hair color is ${res.locals.person.hair}`
    next();
}

app.get("/", createMessage, (req, res)=>{
    res.send(res.locals.message)
});

app.get("/names", createMessage, (req, res)=>{
    res.send(`<h1>You are on the names page</h1> ${res.locals.message}`)
});



// const checkName = (req, res, next) => {
//     if(req.query.name) {
//         res.locals.message = `Hello there ${req.query.name}`;
//     } else {
//         res.locals.message = "You really should give us your name."
//     } 
//     next()
// };

// const checkAge = (req, res, next) => { //creating second function to check
//     if(req.query.age) {
//         res.locals.message = `You are ${req.query.age}`;
//     } else {
//         return res.send("You really should give us your age.")
//         console.log("It is here!")
//     } 
//     next()
// };

// const test = (req,res, next)=>{
//     console.log("Dit it run?");
//     next()
// }

 

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});