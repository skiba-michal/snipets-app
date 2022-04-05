import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  permissions: {
    type: Array,
    default: [],
  },
  settings: {
    default: {
      showOnlyMyData: false,
    },
    showOnlyMyData: {
      type: Boolean,
      default: false,
    }
  }
});

export const UserModel = mongoose.model("User", UserSchema);
// Example of ref
// posts: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: 'Posts'
//   }
// ]
