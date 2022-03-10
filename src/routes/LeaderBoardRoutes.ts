const express = require('express');

import LeaderBoardController from "../controllers/LeaderBoardController";

const router = express.Router();

router.get("/", LeaderBoardController.listAll);

router.get("/:id", LeaderBoardController.getOne);

router.post("/", LeaderBoardController.addOne);

router.put("/:id", LeaderBoardController.updateRecord);

router.delete("/:id", LeaderBoardController.destroy);

router.post("/reorder", LeaderBoardController.reorderList);

export default router;
