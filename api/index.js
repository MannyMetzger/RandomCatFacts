//import things
import express from "express";
import axios from "axios";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//route to render the main page
app.get("/", (req, res) => {
    res.render("index.js", {fact:null });
});

//route to fetch a random cat fact
app.get("/get-fact", async (req, res) => {
    try {
        const response = await axios.get("https://catfact.ninja/fact");
        res.render("index.js", { fact: response.data.fact });
    } catch (error) {
        res.render("index.js", { fact: "Error fetching cat fact." });
    }
});

//export for vercel
export default app;