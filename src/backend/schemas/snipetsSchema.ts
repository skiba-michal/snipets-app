import mongoose, { Schema } from "mongoose";

const SnipetCategory = new Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  html: {
    type: Boolean,
    required: true,
  },
  css: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    date: {
      type: String,
    }
  },
  children: {
    type: Array,
    default: [],
  },
});

export const SnipetCategoryModel = mongoose.model("SnipetCategory", SnipetCategory);

const Snipet = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  mainCode: {
    type: String,
    default: '',
  },
  htmlCode: {
    type: String,
    default: '',
  },
  cssCode: {
    type: String,
    default: '',
  },
  createdBy: {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    date: {
      type: String,
    }
  },
  categoryData: {
    id: {
      type: String,
    },
    name: {
      type: String,
    }
  }
})

export const SnipetModel = mongoose.model("Snipet", Snipet);