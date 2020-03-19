const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const db = require("../models");

const csvData = [];
db.statecovid.sync({ force: true }).then(function() {
  fs.createReadStream(path.resolve(__dirname, "seed.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", error => console.error(error))
    .on("data", row => {
      csvData.push(row);
      csvData.forEach(data => {
        // data.date = parseInt(data.date);
        if (data.positive === "") {
          data.positive = 0;
        } else {
          data.positive = parseInt(data.positive);
        }
        if (data.negative === "") {
          data.negative = 0;
        } else {
          data.negative = parseInt(data.negative);
        }
        if (data.pending === "") {
          data.pending = 0;
        } else {
          data.pending = parseInt(data.pending);
        }
        if (data.death === "") {
          data.death = 0;
        } else {
          data.death = parseInt(data.death);
        }
        if (data.total === "") {
          data.total = 0;
        } else {
          data.total = parseInt(data.total);
        }
      });
    })
    .on("end", rowCount => {
      console.log(csvData[1]);
      // console.log(csvData[0]);
      db.statecovid.bulkCreate(csvData).then(function(res) {
        console.log(res);
      });
      // connection.query("INSERT INTO ");
    });
});
