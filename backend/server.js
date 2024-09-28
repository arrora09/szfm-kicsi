const express = require("express");
const fs = require("fs");
const app = express();
const port = 4000;
const filePath = "data.json";

app.use(express.json());

app.post("/save", (req, res) => {
  const data = req.body;

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error saving data");
    }
    res.send("Data saved successfully");
  });
});

app.get("/load", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading data");
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (e) {
      res.status(500).send("Error parsing data");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
