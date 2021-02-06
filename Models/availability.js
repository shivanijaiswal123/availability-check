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

//Function to get availability of user.
var getAvailability = (req, res) => {
  query = `select startTime,endTime from user_availabilities where userID = ? order by startTime,endTime `;

  db.query(query, req.query.userID, function (err, allTimeSlots) {
    if (err) {
      return res.status(200).json({ success: false, err: err });
    } else {
      var timeSlots = [];
      var wentInsideElse = false;

      for (i = 0; i < allTimeSlots.length; i++) {
        if (i != allTimeSlots.length - 1) {
          if (allTimeSlots[i + 1].startTime > allTimeSlots[i].endTime) {
            if (
              wentInsideElse &&
              allTimeSlots[i + 1].startTime < allTimeSlots[i].endTime
            ) {
              slot = {};
              slot.startTime = timeSlots[i - 1].startTime;
              slot.endTime = allTimeSlots[i].endTime;

              timeSlots.push(slot);
            } else {
              slot = {};
              slot.startTime = allTimeSlots[i].startTime;
              slot.endTime = allTimeSlots[i + 1].endTime;

              timeSlots.push(slot);
            }
          } else {
            if (wentInsideElse) {
            } else {
              slot = {};
              slot.startTime = allTimeSlots[i].startTime;
              slot.endTime = allTimeSlots[i + 1].endTime;
            }

            timeSlots.push(slot);

            wentInsideElse = true;
          }
        }

        if (i == allTimeSlots.length - 1) {
          if (allTimeSlots[i].startTime > allTimeSlots[i].endTime) {
            slot = {};
            slot.startTime = allTimeSlots[i].startTime;
            slot.endTime = allTimeSlots[i].endTime;

            timeSlots.push(slot);
          } else {
            slot = {};
            slot.startTime = allTimeSlots[i].startTime;
            slot.endTime = allTimeSlots[i].endTime;

            timeSlots.push(slot);
          }
        }

        finalSlot = [];
        if (i == allTimeSlots.length - 1) {
          timeSlots.forEach((element) => {
            new time.Date(element.startTime).setTimezone(req.query.timeZone);

            finalSubSlot = {};

            finalSubSlot.startTime = new time.Date(element.startTime)
              .setTimezone(req.query.timeZone)
              .toString();
            finalSubSlot.endTime = new time.Date(element.endTime)
              .setTimezone(req.query.timeZone)
              .toString();
            finalSlot.push(finalSubSlot);
          });
          return res.status(200).json({
            success: true,
            message: finalSlot,
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
};
