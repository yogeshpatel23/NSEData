import corn from "node-cron";
import { logging } from "./logging.js";

function FetchData() {
  fetch("https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY")
    .then((res) => res.json())
    .then((data) => {
      let time = new Date().toLocaleTimeString();
      data.filtered.data.map((sp) => {
        console.log({
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
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

FetchData();

// corn.schedule("* * * * *", () => {
//   logging("test");
// });
