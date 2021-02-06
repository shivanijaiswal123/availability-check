//requiring database connectivity from db_connection file.
var db = require("../Models/db_connection");
var time = require("time");

//Function to add availability of user.
const addAvailability = (req, res) => {
  query = `INSERT INTO user_availabilities SET ?`;

  userID = req.body.userID;
  startTime = req.body.startTime;
  endTime = req.body.endTime;

  db.query(
    query,
    {
      userID,
      startTime,
      endTime,
    },
    function (err, results) {
      if (err) {
        return res.status(200).json({ success: false, err: err });
      } else {
        return res.status(200).json({
          success: true,
          message: results,
        });
      }
    }
  );
};

//Function to get all availability of user with timeOffset.
var getAvailability = (req, res) => {
  query = `select cast(CONVERT_TZ(FROM_UNIXTIME(startTime/1000),'+05:30',${req.query.timeOffset}) as char) as startTime,cast(CONVERT_TZ(FROM_UNIXTIME(endTime/1000),'+05:30',${req.query.timeOffset}) as char) as endTIme from user_availabilities where userID = ?`;

  console.log(query);
  db.query(query, req.query.userID, function (err, results) {
    if (err) {
      return res.status(200).json({ success: false, err: err });
    } else {
      console.log(results);
      return res.status(200).json({
        success: true,
        message: results,
      });
    }
  });
};

//Function to get single availability of user.
var getSingleAvailability = (req, res) => {
  query = `select startTime,endTime from user_availabilities where userID = ? order by startTime,endTime `;

  console.log(query);
  db.query(query, req.query.userID, function (err, allTimeSlots) {
    if (err) {
      return res.status(200).json({ success: false, err: err });
    } else {
      console.log(allTimeSlots);

      var timeSlots = [];
      var wentInsideElse = false;

      for (i = 0; i < allTimeSlots.length; i++) {
        // console.log(i, allTimeSlots.length - 1);

        if (i != allTimeSlots.length - 1) {
          console.log(
            "out of if ",
            i,
            "op> ",
            allTimeSlots[i + 1].startTime,
            allTimeSlots[i].endTime
          );

          if (allTimeSlots[i + 1].startTime > allTimeSlots[i].endTime) {
            console.log(
              "inside of if ",
              i,
              "op> ",
              allTimeSlots[i + 1].startTime,
              allTimeSlots[i].endTime
            );

            console.log("out of if wentInsideElse value: ", wentInsideElse);
            if (
              wentInsideElse &&
              allTimeSlots[i + 1].startTime < allTimeSlots[i].endTime
            ) {
              console.log("inside of if,if wentInsideElse ");
              slot = {};
              slot.startTime = timeSlots[i - 1].startTime;
              slot.endTime = allTimeSlots[i].endTime;

              timeSlots.push(slot);
              console.log("tslot values of if", i, "op> ", timeSlots);
              // allTimeSlots[i - 1]["endTime"] = allTimeSlots[i].startTime;
            } else {
              console.log("inside of if,else wentInsideElse ");
              slot = {};
              slot.startTime = allTimeSlots[i].startTime;
              slot.endTime = allTimeSlots[i + 1].endTime;

              timeSlots.push(slot);
              console.log("tslot values of if", i, "op> ", timeSlots);
              // allTimeSlots[i - 1]["endTime"] = allTimeSlots[i].startTime;
            }
          } else {
            console.log(
              "inside of else ",
              i,
              "op> ",
              allTimeSlots[i + 1].startTime,
              allTimeSlots[i].endTime
            );

            console.log("out of if wentInsideElse value: ", wentInsideElse);
            if (wentInsideElse) {
              console.log("inside of else,if wentInsideElse ");
              // slot = {};
              // slot.startTime = timeSlots[i - 1].startTime;
              // slot.endTime = allTimeSlots[i + 1].endTime;
            } else {
              console.log("inside of else,else wentInsideElse ");
              slot = {};
              slot.startTime = allTimeSlots[i].startTime;
              slot.endTime = allTimeSlots[i + 1].endTime;
            }

            timeSlots.push(slot);
            console.log("tslot values of if", i, "op> ", timeSlots);

            wentInsideElse = true;
          }
        }

        console.log("before special if ", i, allTimeSlots.length - 1);
        if (i == allTimeSlots.length - 1) {
          if (allTimeSlots[i].startTime > allTimeSlots[i].endTime) {
            console.log(
              "inside of special if ",
              i,
              "op> ",
              allTimeSlots[i].startTime,
              allTimeSlots[i].endTime
            );

            slot = {};
            slot.startTime = allTimeSlots[i].startTime;
            slot.endTime = allTimeSlots[i].endTime;

            timeSlots.push(slot);
            console.log("tslot values of if", i, "op> ", timeSlots);
            // allTimeSlots[i - 1]["endTime"] = allTimeSlots[i].startTime;
          } else {
            console.log(
              "inside of special else ",
              i,
              "op> ",
              allTimeSlots[i].startTime,
              allTimeSlots[i].endTime
            );

            slot = {};
            slot.startTime = allTimeSlots[i].startTime;
            slot.endTime = allTimeSlots[i].endTime;

            timeSlots.push(slot);
            console.log("tslot values of if", i, "op> ", timeSlots);
          }
        }

        // if (allTimeSlots[i].endTime > allTimeSlots[0].endTime) {
        //   // console.log(allTimeSlots[i].endTime, allTimeSlots[0].endTime);
        //   allTimeSlots[0]["endTime"] = allTimeSlots[i].endTime;
        // }

        finalSlot = [];
        if (i == allTimeSlots.length - 1) {
          // console.log(allTimeSlots[0]);

          timeSlots.forEach((element) => {
            // console.log(element);
            // console.log("-----");

            // toTimestamp = `select cast(CONVERT_TZ(FROM_UNIXTIME(${element.startTime}/1000),'+05:30','+05:30') as char) as startTime,cast(CONVERT_TZ(FROM_UNIXTIME(${element.startTime}/1000),'+05:30','+05:30') as char) as endTIme from user_availabilities where userID = ?`;

            // db.query(toTimestamp, req.query.userID, function (err, resp) {
            //   console.log(resp);
            // });

            finalsubSlot = {};

            finalsubSlot.startTime = new time.Date(
              element.startTime
            ).setTimezone(req.query.timeOffset);

            console.log(
              new time.Date(element.endTime).setTimezone(req.query.timeOffset)
            );
            finalsubSlot.endTime = new time.Date(element.endTime).setTimezone(
              req.query.timeOffset
            );

            finalSlot.push = finalsubSlot;
            // console.log(finalSlot);
          });
          return res.status(200).json({
            success: true,
            message: timeSlots,
          });
        }
      }
    }
  });
};

//exporting local module to import in another file.
module.exports = {
  addAvailability,
  getAvailability,
  getSingleAvailability,
};
