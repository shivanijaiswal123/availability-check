var express = require("express");
var db = require("./Models/db_connection.js");
const bodyParser = require("body-parser");

const availability = require("./Controllers/availability.routes");

// Initialize Express App
const app = express();

app.use(express.json());
app.use(bodyParser.json());

//Base URL
app.use("/api", availability);

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected to databases");
});

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});
