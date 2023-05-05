import express from "express";
import { Certificate } from "../db/models/Certificate";
import { userAuthService } from "../services/userService";

const certificateRouter = express.Router();

certificateRouter.post("/", async (req, res) => {
  const { userId, agency, credit, grade, acquireDate } = req.body;
  try {
    const user = await userAuthService.getUserInfo({ user_id: userId });
    const certificate = await Certificate.add(user._id, agency, credit, grade, acquireDate);
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

certificateRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userAuthService.getUserInfo({ user_id: id });
    const certificate = await Certificate.findByUserId(user._id);
    if (!certificate) {
      res.status(200).json([]);
    } else {
      res.json(certificate);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

certificateRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { agency, credit, grade, acquireDate } = req.body;
  const certificate = await Certificate.updateById(id, { agency, credit, grade, acquireDate: new Date(acquireDate) });
  if (!certificate) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json(certificate);
  }
});

certificateRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const certificate = await Certificate.deleteById(id);
  if (!certificate) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json({ certificateId: req.params.id });
  }
});

export default certificateRouter;
