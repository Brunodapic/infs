import express from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";

class App {
  public server;

  constructor() {
    this.server = express();
    this.server.use(cors());

    mongoose.connect("mongodb+srv://bruno:bruno@kafici.ady4c6y.mongodb.net/database")

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
