import { model, Schema, Document } from "mongoose";

const KaficiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  vibes: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
  },
  nVotes: {
    type: Number,
    required: false,
  },
  petFriendly: {
    type: Boolean,
    required: false,
  },
  ownerID: {
    type: String,
    required: false,
  },
  adr: {
    type: String,
    required: false,
  },
});

const KaficiModel = model("kafici", KaficiSchema);
export default KaficiModel;
