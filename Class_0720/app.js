//es6 templates in class
//npm install express-es6-template-engine

const express = require('express');
const app = express();
const es6Renderer = require('express-es6-template-engine');

app.engine('html', es6Renderer);

app.set("views", "templates");
app.set("view engine", 'html');

const pets = [
    {"name": "shadow", "type":"cat"},
    {"name": "molly", "type":"dog"},
]

app.get("/", (req, res)=>{
    res.render("home",{
        locals:{
            name:"PJ",
            age:"35"
        }
    })
})

app.get("/pet/:name", (req, res)=>{
    res.render("pet", {
        locals:{
            pet:pets.find(pet=>pet.name === req.params.name) || {name:"none" , type: "none"}
        }
    })
})

app.listen(4567)