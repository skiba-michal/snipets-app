import React, { ChangeEvent, useState } from "react";
import { Input, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { InputProps } from "./baseInput.interface";
import { inputErrors } from "@const";
import "./baseInput.scoped.scss";

export const BaseInput = (props: InputProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    value,
    setValue,
    onChange,
    showErrors = false,
    disabled = false,
    fullWidth = true,
    label,
    placeholder = "",
    type = "text",
    Icon,
    multiline = false,
    validationSettings,
  } = props;

  const validateValue = (value: string | number): boolean => {
    const { minLength, maxLength } = validationSettings;
    const isMinLengthIncorrect = minLength ? value.toString().length < minLength : false;
    const isMaxLengthIncorrent = maxLength ? value.toString().length > maxLength : false;

    findAndSetErrorValue(value, isMinLengthIncorrect);

    if (isMaxLengthIncorrent) {
      return false;
    }

    return true;
  };

  const findAndSetErrorValue = (value: string | number, isMinLengthIncorrect: boolean) => {
    if (isMinLengthIncorrect) {
      setErrorMessage(inputErrors.minLengthValue(validationSettings.minLength));
      return;
    }
    setErrorMessage("");
  };
 
  const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value;
    const canSetValue = validationSettings ? validateValue(newValue) : true;
    if (canSetValue) {
      setValue(newValue);
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl className="form-control-wrapper">
      {label && <InputLabel classes={{ focused: "mui-label-focused", root: "mui-label-root" }}>{label}</InputLabel>}
      <Input
        value={value}
        disabled={disabled}
        fullWidth={fullWidth}
        placeholder={placeholder}
        onChange={onChangeValue}
        classes={{
          input: "mui-input",
          underline: "mui-input-underline",
          error: "mui-input-error",
        }}
        multiline={multiline}
        type={type}
        error={showErrors && !!errorMessage}
        startAdornment={
          <>
            {Icon && (
              <div className="input-adornment-start">
                <Icon />
              </div>
            )}
          </>
        }
      />
      {errorMessage && showErrors && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
