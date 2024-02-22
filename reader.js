const fs = require("fs");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const database = {
  uri: "mongodb://127.0.0.1:27017/",
  name: "textsearch",
  user: "",
  password: "",
  options: {},
};

function mongooseConnect() {
  mongoose.connect(`${database.uri}${database.name}`, database.options).then(
    () => {
      console.log("Mongo connected...");
    },
    (err) => {
      console.error(err);
    }
  );
}

mongooseConnect();

const Ticker = require("./Models/TickerModel");
writeTickerData();
async function writeTickerData() {
  let fileData = fs.readFileSync("Tickers.txt", "utf-8");
  let rows = fileData.split("\r\n");
  let output = [];

  rows.forEach(async (row) => {
    let instance = row.split("\t");
    output.push(instance);
    let ticker = new Ticker({
      ticker: instance[0],
      companyName: instance[1],
      sector: instance[2],
      industry: instance[3],
      mc: instance[4],
      description: instance[5],
    });

    let savingResult = await ticker.save();
    console.log(`saved ${instance[0]}`);
  });

  console.log(output);
}
