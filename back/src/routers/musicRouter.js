import express from "express";
import multer from "multer";
import { db } from "../db";
import { ObjectID } from "mongodb";
import { createModel } from "mongoose-gridfs";
import { Readable } from "stream";
import MusicModel from "../db/schemas/music";

const musicRouter = express.Router();

let Attachment;

db.once("open", () => {
  Attachment = createModel({
    bucketName: "music",
  });
});

musicRouter.get("/:userId", async (req, res) => {
  try {
    const items = await MusicModel.find({ userId: req.params.userId }).exec();
    const musicList = items.map((item) => ({
      id: item._id,
      userId: item.userId,
      title: item.title,
      artist: item.artist,
      cover: item.cover,
      music: item.music,
    }));

    return res.status(200).json(musicList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to retrieve MusicList",
      error: err.message,
    });
  }
});

musicRouter.get("/cover/:coverID", async (req, res) => {
  try {
    const file = await Attachment.findOne({ _id: ObjectID(req.params.coverID) });
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
      res.json({ image: base64Image });
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

musicRouter.get("/music/:musicID", async (req, res) => {
  try {
    const file = await Attachment.findOne({ _id: ObjectID(req.params.musicID) });
    if (!file) {
      return res.status(404).json({ message: "파일 없음" });
    }
    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    const readStream = Attachment.read({ _id: file._id });
    readStream.pipe(res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "파일 불러오기 실패",
      error: err.message,
    });
  }
});

musicRouter.post("/:userId", (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fileSize: 13000000 },
  }).fields([
    { name: "cover", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]);

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "업로드 실패" });
    } else if (!req.body.title) {
      return res.status(400).json({ message: "타이틀 필드 확인 부탁" });
    }

    const imageReadStream = Readable.from(req.files.cover[0].buffer);
    const imageOptions = {
      filename: req.files.cover[0].originalname,
      contentType: req.files.cover[0].mimetype,
    };

    Attachment.write(imageOptions, imageReadStream, (err, imageFile) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "이미지 업로드 실패" });
      } else {
        console.log("이미지 업로드 성공 :" + imageFile.toString());

        const musicReadStream = Readable.from(req.files.music[0].buffer);
        const musicOptions = {
          filename: req.files.music[0].originalname,
          contentType: req.files.music[0].mimetype,
        };

        Attachment.write(musicOptions, musicReadStream, (err, musicFile) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ message: "하.. 파일 좀 확인하고 보내라.." });
          } else {
            console.log("음악 파일 업로드 성공 :" + musicFile.toString());

            const newMusicItem = new MusicModel({
              userId: req.params.userId,
              title: req.body.title,
              artist: req.body.artist,
              cover: imageFile._id,
              music: musicFile._id,
            });

            newMusicItem.save((err, savedItem) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: "데이터 저장에 실패했습니다." });
              } else {
                return res.status(200).json({
                  message: "데이터베이스에 파일 저장 성공",
                  item: savedItem,
                });
              }
            });
          }
        });
      }
    });
  });
});

export default musicRouter;
