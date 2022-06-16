import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "@store/rootReducer";
import { fetchUserProfile } from "@store/user/user.thunks";
import { getUserToken } from "@utils";
import { AppDispatch } from "@store/index";
import { SizeEnum, UserStatusEnum } from "@interfaces";
import { LoadingIcon } from "../loadingIcon";

export const PrivateRoute = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
  const { userStatus, isUserDataPending } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const isTokenStored = !!getUserToken();

    if (userStatus === UserStatusEnum.REJECTED || !isTokenStored) {
      setIsUserAuthenticated(false);
    } else if (userStatus === UserStatusEnum.CONFIRMED) {
      setIsUserAuthenticated(true);
    } else if (userStatus === UserStatusEnum.UNCONFIRMED && !isUserDataPending) {
      dispatch(fetchUserProfile(null));      
    }
  }, [isUserAuthenticated, userStatus, isUserDataPending, dispatch]);

  if (isUserAuthenticated === null) {
    return <LoadingIcon sizeValue={SizeEnum.BIG} fullScreen />;
  }

  return isUserAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
