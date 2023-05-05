import express from "express";
import { Award } from "../db/models/Award";
import { userAuthService } from "../services/userService";

const awardRouter = express.Router();

awardRouter.post("/", async (req, res) => {
  const { userId, association, contest, startDate, prize, detail } = req.body;
  try {
    const user = await userAuthService.getUserInfo({ user_id: userId });
    const award = await Award.add(user._id, association, contest, startDate, prize, detail);
    res.json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

awardRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userAuthService.getUserInfo({ user_id: id });
    const award = await Award.findByUserId(user._id);
    if (!award) {
      res.status(200).json([]);
    } else {
      res.json(award);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

awardRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { association, contest, startDate, prize, detail } = req.body;
  const award = await Award.updateById(id, { association, contest, startDate: new Date(startDate), prize, detail });
  if (!award) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json(award);
  }
});

awardRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const award = await Award.deleteById(id);
  if (!award) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json({ awardId: req.params.id });
  }
});

export default awardRouter;
