import { ProjectModel } from "../schemas/project";

class Project {
  static async add(userId, projectName, projectLink, introduction, startDate, myRole, detail) {
    const project = new ProjectModel({ userId, projectName, projectLink, introduction, startDate: new Date(startDate), myRole, detail });
    await project.save();
    return project;
  }

  static async findByUserId(userId) {
    const projects = await ProjectModel.find({ userId });
    return projects;
  }

  static async updateById(id, update) {
    const project = await ProjectModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return project;
  }

  static async deleteById(id) {
    const project = await ProjectModel.findByIdAndDelete(id);
    return project;
  }
}

export { Project };
