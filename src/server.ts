import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { createConnection } from "typeorm";
import { router } from "./routes/routes";
import { AppError } from "./errors/AppError";
import cors from "cors";
import dotenv from "dotenv";
router.use(cors());
dotenv.config();
createConnection();
const app = express();
app.use(express.json());
app.use(router);
const port = Number(process.env.PORT) || 80;

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }
    return response.status(500).json({
      status: "Error",
      message: `Internal Server Error ${err.message}`
    });
  }
);

app.listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}`);
});
