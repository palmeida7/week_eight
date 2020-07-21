const db = require("./db");

const checkPlace = (req, res, next) => {
    let place = db.find(place=>place.name === req.query.name);
    if(!place) return res.send("Guess its hot pockets again...")
    
    res.locals.place = place;
    next()
};

module.exports = checkPlace;