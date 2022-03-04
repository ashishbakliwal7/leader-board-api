import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

//import { dbCreateConnection } from "./orm/dbCreateConnection";
import LeaderBoardRoutes from "../src/routes/LeaderBoardRoutes";
import { Board } from "./models/BoardModel";

export const app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/leader-board", LeaderBoardRoutes);

mongoose.connect("mongodb://localhost:27017/test-todo", {}, () => {
  console.log("connected to database");
});

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
