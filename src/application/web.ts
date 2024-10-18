import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api";

export const app = express();

app.use(express.json());
// set up router
// tidak perlu login (publik api)
app.use(publicRouter);
// perlu login (private api)
app.use(apiRouter);
app.use(errorMiddleware);
