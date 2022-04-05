import { Response, NextFunction } from "express";
import { AuthRequest, RequestError, RequestResponse, UserDataDb, UserData } from "@models";
import { UserModel } from "@schemas";
import { errorMessages } from "@utils";

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
        settings: user.settings,
        id: userId,
      },
    };

    res.status(200).json(response);
  });
};
