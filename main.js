const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send(`
    <h1>What is the color of the sky on a clear day?</h1>
    <form action = "/result" method = "POST">
        <input type = "text" name = "color">
        <button>Submit answer</button>
    </form>
    `);
});

app.get('/about', (req, res) => {
    res.send("Thanks for learning more about us!");
});

app.post("/result", (req, res) => {
    if (req.body.color === "blue"){
        res.send("Congrats, that is correct.");
    }
    else {
        res.send("Incorrect, please try again!");
    }
});

app.listen(3000);