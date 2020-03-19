

// const d3 = require("d3");
// const path = d3.geoPath();
// const uStates = require("./uStates.js");
function tooltipHtml(n, d) {
  /* function to create html content string in tooltip div. */
  return (
    "<h4>" +
    n +
    "</h4><table>" +
    "<tr><td>Positive</td><td>" +
    d.positive +
    "</td></tr>" +
    "<tr><td>Negative</td><td>" +
    d.negative +
    "</td></tr>" +
    "<tr><td>Deaths</td><td>" +
    d.death +
    "</td></tr>" +
    "</table>"
  );
}

axios.get("/api/statecovid").then(function(response) {
  let currentData = [];
  for(let i = 0; i < 51; i++){
    currentData.push(response.data[i]);
  }
  //let stateArray = currentData.map(item => item.state)
  var sampleData = {}; /* Sample random data. */
  [
    "HI",
    "AK",
    "FL",
    "SC",
    "GA",
    "AL",
    "NC",
    "TN",
    "RI",
    "CT",
    "MA",
    "ME",
    "NH",
    "VT",
    "NY",
    "NJ",
    "PA",
    "DE",
    "MD",
    "WV",
    "KY",
    "OH",
    "MI",
    "WY",
    "MT",
    "ID",
    "WA",
    "DC",
    "TX",
    "CA",
    "AZ",
    "NV",
    "UT",
    "CO",
    "NM",
    "OR",
    "ND",
    "SD",
    "NE",
    "IA",
    "MS",
    "IN",
    "IL",
    "MN",
    "WI",
    "MO",
    "AR",
    "OK",
    "KS",
    "LS",
    "VA"
  ].forEach(function(d, i) {
    sampleData[d] = {
      positive: currentData[i].positive,
      negative: currentData[i].negative,
      death: currentData[i].death,
      color: d3.interpolate("#ffffcc", "#800026")(currentData[i].positive / 100)
    };
  });
  console.log(sampleData)
  uStates.draw("#statesvg", sampleData, tooltipHtml);

  d3.select(self.frameElement).style("height", "600px");
});

/* draw states on id #statesvg */
// uStates.draw("#statesvg", sampleData, tooltipHtml);

