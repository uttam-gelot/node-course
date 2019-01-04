const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname +"/views/partials");
hbs.registerHelper("getCurrentYear", () =>
{
    return new Date().getFullYear();
});
hbs.registerHelper("toUpperCase", (text) =>
{
    return text.toUpperCase();
});


app.use((req, resp, next) =>
{
    var log = `${new Date().toString()} : ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFileSync("server.log", log +"\n");
    next();
});

// app.use((req, res, next) =>
// {
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) =>
{
    response.render("home.hbs",
    {
        pageTitle: "Home Page",
        pageContent: "This is Home Page...",
        pageHeader: "Home Page.!",
    });
    // response.send("<h1>hello express...!</h1>");
    // response.send(
    // {
    //     name:"uttam",
    //     likes:
    //     [
    //         "programming",height: 41px;
    //         "movie",
    //         "reading"
    //     ]
    // });
});

error =
{
    error: "this is bad request..",
    help: "go to valid page"
}

app.get("/about", (request, response) =>
{
    response.render("home.hbs",
    {
        pageTitle: "About Page",
        pageContent: "this is about page...",
        pageHeader: "About Page.!"
    });
});
app.get("/bad", (request, response) =>
{
    response.send(error);
});
app.listen(5555, () =>
{
    console.log("server is up and running on 5555 port...");
});