import { model, Schema, Document } from "mongoose";

const RewiesSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  placeId: {
    type: String,
    required: false,
  },
});

const RewiesModel = model("rewies", RewiesSchema);
export default RewiesModel;