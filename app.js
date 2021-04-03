const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(morgan("dev"));
const api = require("./Develop/routes/api");
const html = require("./Develop/routes/html");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", api);
app.use("/", html);
app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}!`);
});