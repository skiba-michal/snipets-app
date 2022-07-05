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
    showOnlyMyData: {
      type: Boolean,
      default: false,
    },
    showSnippets: {
      type: Boolean,
      default: true,
    },
    showScience: {
      type: Boolean,
      default: true,
    },
    showProjectSnippets: {
      type: Boolean,
      default: true,
    },
    showInterviewQuestions: {
      type: Boolean,
      default: true,
    },
    showLanguages: {
      type: Boolean,
      default: true,
    },
    showCompilators: {
      type: Boolean,
      default: true,
    },
    showGenerators: {
      type: Boolean,
      default: true,
    },
  }
});

export const UserModel = mongoose.model("User", UserSchema);
