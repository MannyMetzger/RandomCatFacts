import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Set up EJS as the view engine and serve static files
app.set("view engine", "ejs");
app.use(express.static("public"));

// Home route to render the page without a fact
app.get("/", (req, res) => {
  res.render("index.ejs", { fact: null });
});

// Route to fetch a random cat fact when the button is clicked
app.get("/get-fact", async (req, res) => {
  let fact = null;

  try {
    // Fetch cat fact from API
    const response = await axios.get("https://catfact.ninja/fact");
    fact = response.data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    fact = "Unable to fetch a cat fact. Please try again later.";
  }

  // Render the page with the fetched fact
  res.render("index.ejs", { fact });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//export to vercel
export default app;