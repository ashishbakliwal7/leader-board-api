import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import LeaderBoardRoutes from "../src/routes/LeaderBoardRoutes";

export const app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/leader-board", LeaderBoardRoutes);

mongoose.connect(
  "mongodb+srv://ashish123:ashish123@cluster0.4hrpt.mongodb.net/test-todo",
  {},
  (err) => {
    if (!err) {
      console.log("connected to database");
    } else {
      console.log(err);
    }
  }
);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port 5000`);
});
