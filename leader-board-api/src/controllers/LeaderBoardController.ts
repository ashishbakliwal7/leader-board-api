import { Request, Response } from "express";
import { Board } from "../models/BoardModel";

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const record = await Board.findOne({ rank: id });

  res.send({
    data: record,
  });
};

const addOne = async (req: Request, res: Response) => {
  const maxQuery = await Board.find({})
    .sort({ rank: -1 })
    .limit(1)
    .then((item) => (item[0] ? item[0].rank : 0));

  const addRecord = await Board.create({
    name: req.body.name,
    rank: maxQuery + 1,
  });

  res.send({
    id: addRecord,
  });
};

const listAll = async (req: Request, res: Response) => {
  const id = req.params.id;
  const board = await Board.find();

  res.send({
    board,
  });
};

const destroy = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id)
    return res.send({
      message: "No id",
    });

  let resultDestroyed = await Board.findOneAndRemove({ rank: id });
  let result = await Board.find({ rank: { $gte: id } });
  result.map(async (item) => {
    // Update record order after destroying any record
    const filter = { rank: item.rank };
    const update = { rank: item.rank - 1 };
    const user = await Board.findOneAndUpdate(filter, update);
  });

  res.send({
    data: result,
  });
};

const updateRecord = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;

  if (!id)
    return res.send({
      message: "No id",
    });

  const filter = { rank: id };
  const update = { name: body.name };
  const user = await Board.findOneAndUpdate(filter, update);

  res.send({
    id: user,
  });
};

const reorderList = async (req: Request, res: Response) => {
  const body = req.body;
  let listArr = body.data;

  let result = await Promise.all(
    listArr.map(async (item: any, i: number) => {
      // Update list with new order
      const filter = { rank: i + 1 };
      const update = { name: item.name };
      return await Board.findOneAndUpdate(filter, update);
    })
  );

  res.send({
    id: result,
  });
};

const LeaderBoardController = {
  addOne,
  getOne,
  listAll,
  updateRecord,
  destroy,
  reorderList,
};

export default LeaderBoardController;
