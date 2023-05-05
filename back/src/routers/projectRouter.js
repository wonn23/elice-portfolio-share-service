import express from "express";
import { Project } from "../db/models/Project";
import { userAuthService } from "../services/userService";

const projectRouter = express.Router();

projectRouter.post("/", async (req, res) => {
  const { userId, projectName, projectLink, introduction, startDate, myRole, detail } = req.body;
  try {
    const user = await userAuthService.getUserInfo({ user_id: userId });
    const project = await Project.add(user._id, projectName, projectLink, introduction, startDate, myRole, detail);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

projectRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userAuthService.getUserInfo({ user_id: id });
    const project = await Project.findByUserId(user._id);
    if (!project) {
      res.status(200).json([]);
    } else {
      res.json(project);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

projectRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { projectName, projectLink, introduction, startDate, myRole, detail } = req.body;
  const project = await Project.updateById(id, { projectName, projectLink, introduction, startDate: new Date(startDate), myRole, detail });
  if (!project) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json(project);
  }
});

projectRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await Project.deleteById(id);
  if (!project) {
    res.status(404).json({ message: "에러" });
  } else {
    res.json({ projectId: req.params.id });
  }
});

export default projectRouter;
