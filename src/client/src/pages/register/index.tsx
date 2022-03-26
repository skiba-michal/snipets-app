import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton, BaseInput, FormWrapper } from "@components";
import { inputErrors } from "@const";
import { PositionEnum } from "@interfaces";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { ResgisterData } from "@models";
import { httpClient } from "@utils";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./register.scoped.scss";

const RegisterPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [secretKey, setSercretKey] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isRepeatedPasswordCorrect, setIsRepeatedPasswordCorrect] = useState(false);
  const [isNameCorrect, setIsNameCorrect] = useState(false);
  const [isSecretKeyCorrect, setIsSecretKeyCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  useEffect(() => {
    if (wasSubmitted) {
      if (password !== repeatPassword) {
        setErrorPassword(inputErrors.passwordsNotTheSame);
      } else {
        setErrorPassword("");
      }
    }
  }, [password, repeatPassword, setRepeatPassword, wasSubmitted]);

  const navigate = useNavigate();

  const onSubmit = () => {
    setWasSubmitted(true);
    const isValidForm = isValid();
    if (isValidForm) {
      setLoading(true);
      const userData: ResgisterData = {
        login,
        password,
        name: userName,
        secretKey,
      };
      httpClient
        .post("test", userData)
        .then(e => {
          console.log(e, "then");
        })
        .catch(a => {
          console.log(a, "erreeeee");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const isValid = () => {
    const isBothPasswordsCorrect = isPasswordCorrect && isRepeatedPasswordCorrect;
    const isPasswordsTheSame = password === repeatPassword;
    return isBothPasswordsCorrect && isPasswordsTheSame && isLoginCorrect && isNameCorrect && isSecretKeyCorrect;
  };

  const onClickLoginBtn = () => {
    navigate("/");
  };

  return (
    <div className="full-screen-component-wrapper">
      <div className="card-wrapper">
        <div className="section-title">Sign up</div>
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
          <BaseInput
            value={repeatPassword}
            setValue={setRepeatPassword}
            type="password"
            label="Repeat password"
            Icon={KeyIcon}
            showErrors={wasSubmitted}
            setErrorParrent={setIsRepeatedPasswordCorrect}
            customErrorMessage={errorPassword}
            validationSettings={{ isRequired: true, maxLength: 50, minLength: 6 }}
          />
          <BaseInput
            value={userName}
            setValue={setUserName}
            label="Name"
            Icon={AccessibilityNewIcon}
            showErrors={wasSubmitted}
            setErrorParrent={setIsNameCorrect}
            validationSettings={{ isRequired: true, maxLength: 50, minLength: 3 }}
          />
          <BaseInput
            value={secretKey}
            setValue={setSercretKey}
            label="Sercret key"
            Icon={QuestionMarkIcon}
            setErrorParrent={setIsSecretKeyCorrect}
            validationSettings={{ isRequired: true, maxLength: 50 }}
          />
          <div className="display-row section-margin">
            <BaseButton
              text="login"
              onClick={onClickLoginBtn}
              StartIcon={ArrowBackIcon}
              loading={loading}
              position={PositionEnum.LEFT}
            />
            <BaseButton text="register" onClick={onSubmit} EndIcon={LoginIcon} position={PositionEnum.RIGHT} />
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default RegisterPage;
