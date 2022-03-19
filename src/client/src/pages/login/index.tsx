import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { BaseInput, FormWrapper, BaseButton } from "@components";
import { PositionEnum } from "@interfaces";
import "./login.scoped.scss";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(!loading);
  };

  const onClickResiterBtn = () => {};

  return (
    <div className="full-screen-component-wrapper">
      <div className="card-wrapper">
        <div className="section-title">Sign in</div>
        <FormWrapper>
          <BaseInput value={login} setValue={setLogin} label="Login" Icon={AccountCircleIcon} />
          <BaseInput value={password} setValue={setPassword} type="password" label="Password" Icon={KeyIcon} />
          <div className="display-row section-margin ">
            <BaseButton
              text="register"
              onClick={onClickResiterBtn}
              StartIcon={HowToRegIcon}
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
