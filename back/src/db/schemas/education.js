import mongoose, { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("education", EducationSchema);

export { EducationModel };
