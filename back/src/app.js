import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import musicRouter from "./routers/musicRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { awardRouter, certificateRouter, educationRouter, projectRouter } from "./routers";

import { login_required } from "./middlewares/login_required";
import storyRouter from "./routers/storyRouter";

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(["/education", "/award", "/certificate", "/certificate"], login_required);
app.use("/education", educationRouter);
app.use("/award", awardRouter);
app.use("/certificate", certificateRouter);
app.use("/project", projectRouter);
app.use("/audio", musicRouter); // 여기에는 login_required 적용 아직 시키지 말아주세요. 오디오 헤더 문제를 해결하면 그때 연결해주세요. 사실 필요없긴 합니다
app.use("/mystory", storyRouter);
// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
