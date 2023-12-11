import corn from "node-cron";
import { logging } from "./logging.js";
import { connectDB } from "./db/index.js";
import { Nifty } from "./models/nifty.model.js";

async function FetchData() {
  try {
    const responce = await fetch(
      "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
    );
    const resData = await responce.json();

    const date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:00`;
    let price = resData.records.underlyingValue;

    let cuData = resData.filtered.data.map((sp) => ({
      strikePrice: sp.strikePrice,
      time: time,
      PE: {
        OI: sp.PE.openInterest,
        cOI: sp.PE.changeinOpenInterest,
      },
      CE: {
        OI: sp.CE.openInterest,
        cOI: sp.CE.changeinOpenInterest,
      },
    }));
    const nifty = await Nifty.findOne({ date: date.toDateString() });
    if (nifty) {
      nifty.data = [...nifty.data, ...cuData];
      nifty.save();
    } else {
      await Nifty.create({
        date: date.toDateString(),
        data: cuData,
      });
    }
  } catch (error) {
    logging(error);
  }

  // console.log(Json);
}

//FetchData();

connectDB()
  .then(() => {
    console.log("index.js");
    corn.schedule("* * * * *", () => {
      FetchData();
    });
  })
  .catch((err) => console.log("Error index:dbcon :", err));
