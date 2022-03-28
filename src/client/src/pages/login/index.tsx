import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BaseInput, FormWrapper, BaseButton, Capatcha, CapatchaHandleRef } from "@components";
import { PositionEnum } from "@interfaces";
import { RequestResponse, UserLoginData } from "@models";
import { httpClient } from "@utils";
import { apiUrls } from "@const";
import "./login.scoped.scss";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const capatchaRef = useRef<CapatchaHandleRef>(null);

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
        .post(apiUrls.auth.login, userData)
        .then((userData: RequestResponse) => {
          console.log(userData)
          navigate("/dashboard");
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const storeUserData = (userData: RequestResponse) => {
    
  }

  const isValid = () => {
    const isCorrectCapatcha = capatchaRef.current.checkResults();
    return isCorrectCapatcha && isLoginCorrect && isPasswordCorrect;
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
          <Capatcha ref={capatchaRef} wasSubmitted={wasSubmitted} />
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
