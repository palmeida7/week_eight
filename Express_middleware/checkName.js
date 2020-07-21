const db = require("./db");

const checkName = (req, res, next) => {
    let person = db.find(person=>person.name === req.query.name);
    if(!person) return res.send("Person Not Found.")
    
    res.locals.person = person;
    next()
};

module.exports = checkName;


