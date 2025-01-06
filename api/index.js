import express from "express";
import axios from "axios";

const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Route to render the main page
app.get("/", (req, res) => {
  res.render("index.ejs", { fact: null });
});

// Route to fetch a random cat fact
app.get("/get-fact", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    res.render("index.ejs", { fact: response.data.fact });
  } catch (error) {
    res.render("index.ejs", { fact: "Error fetching cat fact." });
  }
});

export default app;
