var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var { Highscore } = require("./Highscore");
const port = process.env.PORT || 3000;
var config = require("./config.json");
const dbUrlReference = process.env.PORT ? "mongodb://" + config.mlab.username + ":" + config.mlab.password + "@ds219532.mlab.com:19532/memoryspeedchallengedb" : "mongodb://localhost:27017/MemorySpeedChallengeDb"

mongoose.connect(dbUrlReference, { useNewUrlParser: true }).then(() =>
{
    console.log("Connected to MemorySpeedChallengeDb");
}, (error) =>
    {
        console.log("Couldn't connect to MemorySpeedChallengeDb. Error message: " + error);
    });

var app = express();
app.use(bodyParser.json());

app.listen(port, () =>
{
    console.log("Started on port " + port);
});

app.get("/", function (req, res)
{
    res.status(200).send("Welcome to MemorySpeedChallenge");
});

app.get("/highscores", function (req, res)
{
    Highscore.find().then((highscores) =>
    {
        res.status(200).send({ highscores });
    }, (error) =>
        {
            res.status(400).send(error);
        });
});

app.post("/highscore", function (req, res)
{
    var _score = req.body.score;
    var _username = req.body.name;

    var newHighscore = new Highscore({
        score: _score,
        username: _username
    });

    newHighscore.save().then((doc) =>
    {
        console.log("Saved new highscore. Document: ", doc);
        res.status(200).send();
    }, (e) =>
        {
            console.log("Unable to save new highscore. Error: ", e);
            res.status(400).send();
        });
});

app.get("*", function (req, res)
{
    res.status(404).send("This is the default GET route");
});

app.post("*", function (req, res)
{
    res.status(404).send("This is the default POST route");
});