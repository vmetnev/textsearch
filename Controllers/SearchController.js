const fs = require("fs");

let data = fs.readFileSync("Tickers.txt", "utf-8");

let rows = data.split("\r\n");

let output = [];

rows.forEach((row) => {
  let interim = row.split("\t");
   if (interim.length === 6) {
    interim[0] = interim[0].trim();
    interim[1] = interim[1].trim();
    interim[2] = interim[2].trim();
    interim[3] = interim[3].trim();
    interim[4] = interim[4].trim();
    interim[5] = interim[5].trim();
    interim[5] = interim[5].replace("\"","");
    
  }

  output.push(interim);
});

async function searchController(req, res) {
  let searchText = req.query.text;
  console.log(searchText);
  let foundArrayOfTickerLine = [];

  console.log("here");
  output.forEach((instance) => {
    if (instance[5] && instance[5].includes(searchText))
      foundArrayOfTickerLine.push(instance);
  });

  res.json(foundArrayOfTickerLine);
}

module.exports = searchController;
