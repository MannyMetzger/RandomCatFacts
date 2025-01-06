import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Simulate __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Set EJS as the templating engine and point to views directory
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to render the main page
app.get("/", (req, res) => {
  res.render("index", { fact: null });
});

// Route to fetch a random cat fact
app.get("/get-fact", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    res.render("index", { fact: response.data.fact });
  } catch (error) {
    res.render("index", { fact: "Error fetching cat fact." });
  }
});

// Export for Vercel
export default app;
