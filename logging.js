import fs from "fs";

const logging = (message) => {
  fs.writeFile(
    "log.txt",
    `${new Date().toLocaleString()} :: ${message}\n`,
    { flag: "a+" },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

export { logging };
