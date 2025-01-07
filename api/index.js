import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let fact = null;

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    fact = response.data.fact;
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);
    fact = "Unable to fetch a cat fact. Please try again later.";
  }

  res.render("index", { fact });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//export for vercel
export default app;