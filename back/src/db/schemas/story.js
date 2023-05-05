import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  userId: String,
  description: String,
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
});

const StoryModel = mongoose.model("Story", StorySchema);

export default StoryModel;
