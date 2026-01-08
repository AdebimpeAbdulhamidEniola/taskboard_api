import cors from "cors";
import express, { Application } from "express";
import dotenv from "dotenv";
import apiRoutes from "../routes";
import errorHandling from "../middleware/errorHandler";
import { notFoundHandler } from "../general/notFoundHandler";
import boardRoutes from "../routes/boardRoutes";
import taskRoutes from "../routes/taskRoutes";


dotenv.config();

export const createApp = (): Application => {
  const app: Application = express();

  app.use(express.json());

  app.use(cors());

  app.use("/api", boardRoutes);
  app.use("/api", taskRoutes);

  app.use(notFoundHandler);
  app.use(errorHandling);

  return app;
};
