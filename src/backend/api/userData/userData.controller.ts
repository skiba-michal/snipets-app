import { Response, NextFunction } from "express";
import { AuthRequest, RequestError, RequestResponse, UserData, UserSettings } from "@models";
import { UserModel } from "@schemas";
import { errorMessages, succesMessages } from "@utils";

export const getUserProfile = (req: AuthRequest, res: Response, _next: NextFunction) => {
  const userId = req.userId;

  UserModel.findOne({ _id: userId }).then(user => {
    if (!user) {
      const error: RequestError = new Error(errorMessages.userNotFound);
      error.statusCode = 401;
      throw error;
    }
    const response: RequestResponse<UserData> = {
      message: "",
      data: {
        name: user.name,
        permissions: user.permissions,
        settings: user.settings as unknown as UserSettings,
        id: userId,
      },
    };

    res.status(200).json(response);
  });
};

export const editUserSettings = (req: AuthRequest, res: Response, next: NextFunction) => {
  const body = req.body as UserSettings;

  const checkedBody: UserSettings = {
    showOnlyMyData: typeof body.showOnlyMyData === "boolean" ? body.showOnlyMyData : false,
    showSnippets: typeof body.showSnippets === "boolean" ? body.showSnippets : true,
    showScience: typeof body.showScience === "boolean" ? body.showScience : true,
    showProjectSnippets: typeof body.showProjectSnippets === "boolean" ? body.showProjectSnippets : true,
    showInterviewQuestions: typeof body.showInterviewQuestions === "boolean" ? body.showInterviewQuestions : true,
    showLanguages: typeof body.showLanguages === "boolean" ? body.showLanguages : true,
    showCompilators: typeof body.showCompilators === "boolean" ? body.showCompilators : true,
    showGenerators: typeof body.showGenerators === "boolean" ? body.showGenerators : true,
  };

  const userId = req.userId;
  UserModel.updateOne(
    { _id: userId },
    {
      $set: {
        settings: checkedBody,
      },
    }
  )
    .then(() => {
      const response: RequestResponse<UserSettings> = {
        message: succesMessages.changesSaved,
        data: checkedBody,
      };

      res.status(200).json(response);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 404;
      }
      err.message = errorMessages.userNotFound;
      next(err);
    });
};
