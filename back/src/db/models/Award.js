import { AwardModel } from "../schemas/award";

class Award {
  static async add(userId, association, contest, startDate, prize, detail) {
    const award = new AwardModel({ userId, association, contest, startDate: new Date(startDate), prize, detail });
    await award.save();
    return award;
  }

  static async findByUserId(userId) {
    const awards = await AwardModel.find({ userId });
    return awards;
  }

  static async updateById(id, update) {
    const award = await AwardModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return award;
  }

  static async deleteById(id) {
    const award = await AwardModel.findByIdAndDelete(id);
    return award;
  }
}

export { Award };
