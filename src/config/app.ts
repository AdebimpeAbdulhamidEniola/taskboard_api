import cors from "cors";
import express, { Application } from "express";
import dotenv from "dotenv";

import errorHandling from "../middleware/errorHandler";
import { notFoundHandler } from "../general/notFoundHandler";
import boardRoutes from "../routes/boardRoutes";



dotenv.config();

export const createApp = (): Application => {
  const app: Application = express();

  app.use(express.json());

  app.use(cors());

  app.use("/api/boards", boardRoutes);
  

  app.use(notFoundHandler);



  app.use(errorHandling);

  return app;
};
