import express from "express";
import multer from "multer";
import { db } from "../db";
import { ObjectID } from "mongodb";
import { createModel } from "mongoose-gridfs";
import { Readable } from "stream";
import StoryModel from "../db/schemas/story";

const storyRouter = express.Router();

let Attachment;

db.once("open", () => {
  Attachment = createModel({
    bucketName: "story",
  });
});

storyRouter.get("/:userId", async (req, res) => {
  try {
    const items = await StoryModel.find({ userId: req.params.userId }).exec();
    const storyList = items.map((item) => ({
      id: item._id,
      userId: item.userId,
      description: item.description,
      story: item.story,
    }));

    return res.status(200).json(storyList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to retrieve StoryList",
      error: err.message,
    });
  }
});

storyRouter.get("/story/:storyID", async (req, res) => {
  try {
    const order = req.query.order;
    const file = await Attachment.findOne({ _id: ObjectID(req.params.storyID) });
    if (!file) {
      return res.status(404).json({ message: "파일 없음" });
    }
    res.set("content-type", "image/png");
    res.set("accept-ranges", "bytes");

    const readStream = Attachment.read({ _id: file._id });

    const chunks = [];
    readStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    readStream.on("end", () => {
      const imageData = Buffer.concat(chunks);
      const base64Image = imageData.toString("base64");
      res.json({ image: base64Image, order: parseInt(order) });
    });

    readStream.on("error", (err) => {
      console.log(err);
      return res.status(500).json({
        message: "파일 불러오기 실패",
        error: err.message,
      });
    });

    // readStream.pipe(res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "파일 불러오기 실패",
      error: err.message,
    });
  }
});

storyRouter.post("/:userId", (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fileSize: 13000000 },
  }).fields([{ name: "story", maxCount: 1 }]);

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "업로드 실패" });
    } else if (!req.body.description) {
      return res.status(400).json({ message: "설명 필드 확인 부탁" });
    }

    const imageReadStream = Readable.from(req.files.story[0].buffer);
    const imageOptions = {
      filename: req.files.story[0].originalname,
      contentType: req.files.story[0].mimetype,
    };

    Attachment.write(imageOptions, imageReadStream, (err, imageFile) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "이미지 업로드 실패" });
      } else {
        console.log("이미지 업로드 성공 :" + imageFile.toString());

        const newStoryItem = new StoryModel({
          userId: req.params.userId,
          description: req.body.description,
          story: imageFile._id,
        });

        newStoryItem.save((err, savedItem) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "데이터 저장에 실패했습니다." });
          } else {
            return res.status(200).json({
              message: "데이터베이스에 파일 저장 성공",
              item: savedItem,
              owner: req.params.userId,
            });
          }
        });
      }
    });
  });
});

export default storyRouter;
