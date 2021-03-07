const express = require("express");

const app = express();

app.get('/hello', (req, res) => {
    res.send("Hello library films");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
})