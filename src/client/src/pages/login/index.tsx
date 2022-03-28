import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BaseInput, FormWrapper, BaseButton } from "@components";
import { PositionEnum } from "@interfaces";
import { RequestResponse, UserDataResponse, UserLoginData } from "@models";
import { apiStructure } from "@const";
import { httpClient, setUserToken } from "@utils";
import { setUserData } from "@store/user/user.reducer";
import "./login.scoped.scss";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = () => {
    setWasSubmitted(true);
    const isFormValid = isValid();
    if (isFormValid) {
      setLoading(true);
      const userData: UserLoginData = {
        login,
        password,
      };
      httpClient
        .post(apiStructure.auth.login, userData)
        .then((userData: RequestResponse<UserDataResponse>) => {
          storeUserData(userData.data);
          navigate("/dashboard");
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const storeUserData = (userData: UserDataResponse) => {
    setUserToken(userData.token || "");
    dispatch(setUserData(userData));
  };

  const isValid = () => {
    return isLoginCorrect && isPasswordCorrect;
  };

  const onClickResiterBtn = () => {
    navigate("register");
  };

  return (
    <div className="full-screen-component-wrapper">
      <div className="card-wrapper">
        <div className="section-title">Sign in</div>
        <FormWrapper>
          <BaseInput
            value={login}
            setValue={setLogin}
            label="Login"
            Icon={AccountCircleIcon}
            showErrors={wasSubmitted}
            setErrorParrent={setIsLoginCorrect}
            validationSettings={{ isRequired: true, maxLength: 50, minLength: 3 }}
          />
          <BaseInput
            value={password}
            setValue={setPassword}
            type="password"
            label="Password"
            Icon={KeyIcon}
            showErrors={wasSubmitted}
            setErrorParrent={setIsPasswordCorrect}
            validationSettings={{ isRequired: true, maxLength: 50, minLength: 6 }}
          />
          <div className="display-row section-margin">
            <BaseButton
              text="register"
              onClick={onClickResiterBtn}
              StartIcon={ArrowBackIcon}
              position={PositionEnum.LEFT}
            />
            <BaseButton
              text="login"
              onClick={onSubmit}
              EndIcon={LoginIcon}
              loading={loading}
              position={PositionEnum.RIGHT}
            />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default LoginPage;
