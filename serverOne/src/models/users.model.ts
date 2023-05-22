import { model, Schema, Document } from 'mongoose';


const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  owner: {
    type: Boolean,
    required: false,
  },
  placesId: {
    type: Array,
    required: false,
  },
  passwordHashSha1: {
    type: String,
    required: false,
  },
});


const UserModel= model("users", UsersSchema);
export default UserModel;
