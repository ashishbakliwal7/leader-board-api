import mongoose from "mongoose";

interface BoardDoc extends mongoose.Document {
  rank: number;
  name: string;
}

const boardSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true,
    index: true,
    unique: true,
    dropDups: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Board = mongoose.model<BoardDoc>("Board", boardSchema);

export { Board };
