const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function getWeather(req, res, next){
    req.visitorWeather = false;
    if (req.visitorWeather){
        res.send("Please come back to our app when it's not raining!");
    } else {
        next();
    }
}

app.get('/', getWeather, (req, res) => {
    res.render("index");
});
app.get('/home', getWeather, (req, res) => {
    res.render("home.ejs", {
        isRaining: req.visitorWeather,
        pets: [
            {name: "Meowsalot", species: "cat"}, 
            {name: "Barksalot", species: "dog"}
        ]
    });
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

app.get('/api/pets', (req, res) => {
    res.json(
        [
            {name: "Meowsalot", species: "cat"}, 
            {name: "Barksalot", species: "dog"}
        ]
    );
})

app.listen(3000);