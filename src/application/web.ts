import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";

export const app = express();

app.use(express.json());

// set up router
// tidak perlu login (publik api)
app.use(publicRouter);
app.use(errorMiddleware);

// perlu login (private api)
