const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

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
  (err : any) => {
    if (!err) {
      console.log("connected to database");
    } else {
      console.log(err);
    }
  }
);

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
  console.log("Server started.......");
});

