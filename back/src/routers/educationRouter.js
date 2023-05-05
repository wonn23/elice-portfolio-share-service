import express from "express";
import { Education } from "../db/models/Education";
import { userAuthService } from "../services/userService";

const educationRouter = express.Router();

// 일단은... 프론트 단에서 유효성 검사로 가드 최소한 하긴 하는데, 제대로 하면 작업량 과다로 쓰러질듯합니다.
// 혹은 백엔드 작업하시는 분 오류 안뜨는 한에서 유효성 검사

educationRouter.post("/", async (req, res) => {
  const { userId, school, major, status } = req.body;
  try {
    const user = await userAuthService.getUserInfo({ user_id: userId });
    const education = await Education.add(user._id, school, major, status);
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
educationRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userAuthService.getUserInfo({ user_id: id });
    const education = await Education.findByUserId(user._id);
    if (!education) {
      res.status(200).json([]);
      console.log(user._id);
    } else {
      res.json(education);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

educationRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { school, major, status } = req.body;
  const education = await Education.updateById(id, { school, major, status });
  if (!education) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json(education);
  }
});

educationRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const education = await Education.deleteById(id);
  if (!education) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json({ educationId: req.params.id });
  }
});

export default educationRouter;
