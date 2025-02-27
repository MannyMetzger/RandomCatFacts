import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set up EJS as the view engine and explicitly set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

// Home route to render the page without a fact
app.get("/", (req, res) => {
    res.render("index", { fact: null });
});

// Route to fetch a random cat fact
app.get("/get-fact", async (req, res) => {
    let fact = null;

    try {
        const response = await axios.get("https://catfact.ninja/fact");
        fact = response.data.fact;
    } catch (error) {
        console.error("Error fetching cat fact:", error.message);
        fact = "Unable to fetch a cat fact. Please try again later.";
    }

    res.send(fact);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Export for Vercel
export default app;
