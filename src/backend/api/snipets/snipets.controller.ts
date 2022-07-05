import { Response, NextFunction } from "express";
import {
  AuthRequest,
  RequestError,
  RequestResponse,
  Snipet,
  SnipetCategory,
  SnipetCategoryCreateRequest,
  SnipetCreateRequest,
  SnipetDB,
} from "@models";
import { errorMessages, succesMessages, validateString } from "@utils";
import { SnipetCategoryModel, SnipetModel } from "@schemas";

export const categoriesCreate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const body = req.body as SnipetCategoryCreateRequest;
  const currentDate = new Date();
  const currentDateFormated = currentDate.toISOString().substring(0, 10);

  const isLanguageCorrect = validateString(body.language, { maxLenght: 100 });
  const isNameCorrect = validateString(body.name, { maxLenght: 100, minLenght: 3, basicCharactersOnly: true });

  if (!isLanguageCorrect || !isNameCorrect) {
    const error: RequestError = new Error(errorMessages.incorectData);
    error.statusCode = 422;
    throw error;
  }

  const data: SnipetCategory = {
    name: body.name,
    language: body.language,
    html: !!body.html,
    css: !!body.css,
    children: [],
    createdBy: {
      userId: req.userId,
      userName: req.userName,
      date: currentDateFormated,
    },
  };

  const category = new SnipetCategoryModel(data);
  category
    .save()
    .then(() => {
      const response: RequestResponse<null> = {
        message: succesMessages.categoryCreated,
        data: null,
      };
      res.status(201).json(response);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const snipetCreate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const body = req.query as unknown as SnipetCreateRequest;
  const currentDate = new Date();

  const currentDateFormated = currentDate.toISOString().substring(0, 10);

  SnipetCategoryModel.findOne({ _id: body.categoryId }).then(category => {
    if (!category) {
      const error: RequestError = new Error(errorMessages.categoryNotFound);
      error.statusCode = 401;
      throw error;
    }
    const categoryChildren = category.children;

    const data: Snipet = {
      name: body.name,
      categoryData: {
        id: body.categoryId,
        name: category.name,
      },
      createdBy: {
        userId: req.userId,
        userName: req.userName,
        date: currentDateFormated,
      },
    };

    const snipet = new SnipetModel(data);
    let createdSnipedId = "";
    snipet
      .save()
      .then(snipedData => {
        createdSnipedId = snipedData._id.valueOf() as string;
        categoryChildren.push({
          name: body.name,
          id: createdSnipedId,
        });
        SnipetCategoryModel.updateOne(
          { _id: body.categoryId },
          {
            $set: {
              children: categoryChildren,
            },
          }
        )
          .then(() => {
            const response: RequestResponse<null> = {
              message: succesMessages.snipetCreated,
              data: null,
            };
            res.status(200).json(response);
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

export const getSnipptsCategories = (_req: AuthRequest, res: Response, next: NextFunction) => {
  SnipetCategoryModel.find({})
    .then(snipets => {
      const response: RequestResponse<SnipetCategory[]> = {
        message: "",
        data: snipets as unknown as SnipetCategory[],
      };
      res.status(200).json(response);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
