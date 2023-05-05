import { EducationModel } from "../schemas/education";

class Education {
  static async add(userId, school, major, status) {
    const education = new EducationModel({ userId, school, major, status });
    await education.save();
    return education;
  }

  static async findByUserId(userId) {
    const educations = await EducationModel.find({ userId });
    return educations;
  }

  static async updateById(id, update) {
    const education = await EducationModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return education;
  }

  static async deleteById(id) {
    const education = await EducationModel.findByIdAndDelete(id);
    return education;
  }
}

export { Education };
