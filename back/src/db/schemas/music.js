import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
  userId: String,
  title: String,
  artist: String,
  cover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
  music: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
});

const MusicModel = mongoose.model("Music", MusicSchema);

export default MusicModel;
