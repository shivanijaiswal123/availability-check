var express = require("express");
var db = require("./Models/db_connection.js");
const bodyParser = require("body-parser");

const add_availability = require("./Controllers/availability.routes");

// Initialize Express App
const app = express();

// BodyParser MiddleWare
app.use(express.json());

app.use(bodyParser.json());

app.use("/api", add_availability);

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + db.threadId);
});

// let bubbleSort = (inputArr) => {
//   let len = inputArr.length;
//   let swapped;
//   do {
//     swapped = false;
//     for (let i = 0; i < len; i++) {
//       if (inputArr[i] > inputArr[i + 1]) {
//         let tmp = inputArr[i];
//         inputArr[i] = inputArr[i + 1];
//         inputArr[i + 1] = tmp;
//         swapped = true;
//       }
//     }
//   } while (swapped);
//   return inputArr;
// };

// let arr = bubbleSort([
//   1612510200000,
//   1612513800000,
//   1612517400000,
//   1612521000000,
//   1612512000000,
//   1612519200000,
// ]);
// console.log(arr);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
