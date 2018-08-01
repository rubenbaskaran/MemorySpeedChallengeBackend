var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

app.listen(3000, () =>
{
    console.log("Started on port 3000");
});

app.get("/highscore", function (req, res)
{
    res.send({
        firstplace: "1000",
        secondplace: "800",
        thirdplace: "500"
    });
})

app.post("/highscore", function (req, res)
{
    var name = req.body.name;
    var score = req.body.score;
    console.log("Name: " + name + " and score: " + score)
    res.status(200).send();
})

app.get("*", function (req, res)
{
    res.send("This is the default route");
})