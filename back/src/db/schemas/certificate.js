import mongoose, { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const CertificateModel = model("certificate", CertificateSchema);

export { CertificateModel };
