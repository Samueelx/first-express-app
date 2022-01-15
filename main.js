const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));

function getWeather(req, res, next){
    req.visitorWeather = true;
    if (req.visitorWeather){
        res.send("Please come back to our app when it's not raining!")
    } else {
        next();
    }
}

app.get('/', getWeather, (req, res) => {
    res.send(`
    <h1>What is the color of the sky on a clear day?</h1>
    <form action = "/result" method = "POST">
        <input type = "text" name = "color">
        <button>Submit answer</button>
    </form>
    <p>${req.visitorWeather ? "It is raining." : "It is not raining."}</p>
    `);
});

app.get('/about', (req, res) => {
    res.send("Thanks for learning more about us!");
});

app.post("/result", (req, res) => {
    if (req.body.color.trim().toUpperCase() === "BLUE"){
        res.send("Congrats, that is correct.");
    }
    else {
        res.send("Incorrect, please try again!");
    }
});

app.listen(3000);