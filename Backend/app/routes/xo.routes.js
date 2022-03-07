module.exports = app => {
    const xo = require("../controllers/xo.controller.js");
    
    var router = require("express").Router();

    router.put("/", xo.update);
    router.get("/", xo.findOne);
    router.delete("/", xo.deleteAll);

    app.use('/api/xo', router);
};