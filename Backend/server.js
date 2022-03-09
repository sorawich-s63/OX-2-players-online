const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

const xo = db.xo;
const xodata = {
    history: JSON.stringify(Array(9).fill(null)),
    stepnumber: 0,
    xisnext: 1
  };

//xo.create(xodata)

//db.sequelize.sync();
async function createTable(){
await db.sequelize.sync();

if (await xo.findByPk(1)) {
    console.log("already have table")
    // console.log(xo.findByPk(1))
} else{
    console.log("create table success")
    await xo.create(xodata)
}
}
createTable();
// xo.create(xodata)


app.get("/", (req, res) => {
    res.json({ message: "Welcome to XO-APP."});
});

require("./app/routes/xo.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

