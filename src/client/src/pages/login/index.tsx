import React, { KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BaseInput, FormWrapper, BaseButton, CheckAuth } from "@components";
import { PositionEnum } from "@interfaces";
import { RequestResponse, UserDataResponse, UserLoginData } from "@models";
import { apiStructure } from "@const";
import { httpClient, setUserToken } from "@utils";
import { setUserData } from "@store/user/user.reducer";
import logo from "@assets/logo_transparent.png";
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
    const isFormValid = isLoginCorrect && isPasswordCorrect;
    if (isFormValid) {
      setLoading(true);
      const userData: UserLoginData = {
        login,
        password,
      };
      httpClient
        .post(apiStructure.auth.login, userData)
        .then((userData: RequestResponse<UserDataResponse>) => {
          setUserToken(userData.data.token || "");
          dispatch(setUserData(userData.data));
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const enterListener = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      onSubmit();
    }
  };

  const onClickResiterBtn = () => {
    navigate("register");
  };

  return (
    <div className="full-screen-component-wrapper" onKeyPress={enterListener}>
      <CheckAuth>
        <img src={logo} alt="Logo" className="logo" />
        <div className="card-wrapper">
          <div className="section-title">Zaloguj si??</div>
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
              label="Has??o"
              Icon={KeyIcon}
              showErrors={wasSubmitted}
              setErrorParrent={setIsPasswordCorrect}
              validationSettings={{ isRequired: true, maxLength: 50, minLength: 6 }}
            />
            <div className="display-row section-margin">
              <BaseButton
                text="rejstracja"
                onClick={onClickResiterBtn}
                StartIcon={ArrowBackIcon}
                position={PositionEnum.LEFT}
              />
              <BaseButton
                text="logowanie"
                onClick={onSubmit}
                EndIcon={LoginIcon}
                loading={loading}
                position={PositionEnum.RIGHT}
              />
            </div>
          </FormWrapper>
        </div>
      </CheckAuth>
    </div>
  );
};

export default LoginPage;
