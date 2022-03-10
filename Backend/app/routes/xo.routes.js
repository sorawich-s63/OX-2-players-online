module.exports = app => {
    const xo = require("../controllers/xo.controllers.js");
    
    var router = require("express").Router();

    router.get("/", xo.findOne);
    router.put("/", xo.update);


    app.use('/api/xo', router);
};