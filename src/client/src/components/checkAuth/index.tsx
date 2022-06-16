import { SizeEnum, UserStatusEnum } from "@interfaces";
import React, { useState } from "react";
import { RootState } from "@store/rootReducer";
import { fetchUserProfile } from "@store/user/user.thunks";
import { getUserToken } from "@utils";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoadingIcon } from "@components";
import { AppDispatch } from "@store/index";

export const CheckAuth = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const { userStatus, isUserDataPending } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const isToken = getUserToken();
    const isRejected = userStatus === UserStatusEnum.REJECTED;
    if (isToken && !isUserDataPending && !isRejected) {
      dispatch(fetchUserProfile(null));
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    console.log(userStatus)
    if (userStatus === UserStatusEnum.CONFIRMED) {
      navigate("/dashboard");
    }
  }, [userStatus]);

  return <>{isUserDataPending || !checked ? <LoadingIcon sizeValue={SizeEnum.BIG} fullScreen /> : children}</>;
};
