import { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import KaficiModel from "./models/kafici.model";
import UserModel from "./models/users.model";
import RewiesModel from "./models/rewies.model";
var sha1 = require("sha1");

dotenv.config();
const routes = Router();

routes.get("/", async (req, res) => {
  try {
    console.log(mongoose.connection.readyState);

    const findBars = await KaficiModel.find({});

    console.log(findBars);

    return res.json({ findBars });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/bar/:barId", async (req, res) => {
  const barId = req.params.barId;

  try {
    const findBar = await KaficiModel.findById(barId);
    const findRewies = await RewiesModel.find({ placeId: barId });

    console.log(findBar);

    return res.json({ findBar, findRewies });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const findUser = await UserModel.findOne({ _id: userId });

    console.log(findUser);

    return res.json({ findUser });
  } catch (error) {
    console.log(error);
  }
});

routes.get("/owner/:ownerId", async (req, res) => {
  const ownerId = req.params.ownerId;
  console.log(ownerId);
  // return res.json({ ownerId });
  try {
    const findOwnersBars = await KaficiModel.find({ ownerID: ownerId });

    const findOwner = await UserModel.findOne({ _id: ownerId });

    // if(findOwner.owner && findOwner.placesId){
    //   console.log(findOwner.placesId)
    // }

    return res.json({ findOwner, findOwnersBars });
  } catch (error) {
    console.log(error);
  }
});

routes.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, sha1(password));

    const findUser = await UserModel.findOne({
      username: username,
      passwordHashSha1: sha1(password),
    });

    return res.json({ findUser });
  } catch (error) {
    console.log(error);
  }
});

routes.post("/rewies/:placeId", async (req, res) => {
  try {
    const newRewie = {
      username: req.body.username,
      userId: req.body.userId,
      text: req.body.text,
      placeId: req.params.placeId,
    };
    const username = req.body.username;
    const userId = req.body.userId;
    const text = req.body.text;
    const placeId = req.params.placeId;

    const createRewie = await RewiesModel.create(newRewie);

    return res.json({ createRewie });
  } catch (error) {
    console.log(error);
  }
});

routes.delete("/rewies/:placeId", async (req, res) => {
  try {
    const username = req.body.username;
    const userId = req.body.userId;
    const text = req.body.text;
    const placeId = req.params.placeId;

    const findeRewie = await RewiesModel.findOne({ placeId: placeId });
    if (req.body.userId == findeRewie.userId) {
      const updateRewie = await RewiesModel.findByIdAndDelete(findeRewie._id);
      if (!updateRewie) {
        return res.json({ erroe: "error2" });
      } else {
        return res.json({ updateRewie });
      }
    }

    return res.json({ erroe: "error1" });
  } catch (error) {
    console.log(error);
  }
});

routes.put("/rewies/:placeId", async (req, res) => {
  try {
    const rewieId = req.body.data._id;
    const rewie = req.body.data;
    const text = req.body.data.text;
    const placeId = req.params.placeId;
    console.log(req.body.data._id);
    const findeRewie = await RewiesModel.findById({ _id: rewieId });
    console.log(findeRewie);
    const updateRewie = await RewiesModel.findByIdAndUpdate(
      { _id: rewieId },

      { rewie },

      { new: true }
    );
    console.log(updateRewie);
    // if(findeRewie && req.body.userId==findeRewie.userId){
    //   const updateRewie = await RewiesModel.findByIdAndUpdate(rewieId,{text:text});
    //   if (!updateRewie){
    //     return res.json({ erroe:'error2' });
    //   } else{
    //     return res.json({ updateRewie });
    //   }

    // }

    return res.json({ erroe: "error1" });
  } catch (error) {
    console.log(error);
  }
});

export default routes;
