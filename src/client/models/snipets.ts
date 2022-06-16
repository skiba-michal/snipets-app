import { ObjectId } from "mongoose";
import { CreatedBy } from "./requests";

export interface SnipetCategoryCreateRequest {
  name: string;
  language: string;
  html: boolean;
  css: boolean;
}

export interface SnipetCategory extends SnipetCategoryCreateRequest {
  id?: string;
  _id?: ObjectId;
  children: SnipetCategoryItem[],
  createdBy: CreatedBy,
}

export interface SnipetCategoryItem {
  name: string;
  id: string;
}

export interface SnipetCreateRequest {
 categoryId: string;
 name: string;
}

export interface Snipet {
  id?: string;
  name: string;
  description?: string;
  mainCode?: string;
  htmlCode?: string;
  cssCode?: string;
  createdBy: CreatedBy,
  categoryData: {
    id: string;
    name: string;
  }
}

export interface SnipetDB extends Snipet {
  _id: ObjectId;
}
