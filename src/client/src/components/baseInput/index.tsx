import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { BaseInputProps } from "./baseInput.interface";
import { inputErrors } from "@const";
import "./baseInput.scoped.scss";

export const BaseInput = ({
  value,
  setValue,
  setErrorParrent = () => {},
  onChange,
  customErrorMessage = "",
  showErrors = false,
  label,
  disabled = false,
  fullWidth = true,
  placeholder = "",
  type = "text",
  validationSettings = {},
  multiline = false,
  onFocus = () => {},
  onBlur = () => {},
  Icon,
  width = "",
  inputProps,
}: BaseInputProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    if (showErrors) {
      validateValue(value);
    }
  }, [showErrors]);

  useEffect(() => {
    setErrorParrent(!errorMessage);
  }, [errorMessage, setErrorParrent]);

  useEffect(() => {
    validateValue(value);
  }, [customErrorMessage]);

  const validateValue = (value: string | number): boolean => {
    const { maxLength } = validationSettings;
    const isMaxLengthIncorrent = maxLength ? value.toString().length > maxLength : false;
    findAndSetErrorValue(value);

    if (isMaxLengthIncorrent) {
      return false;
    }

    return true;
  };

  const findAndSetErrorValue = (value: string | number) => {
    const { minLength, isRequired } = validationSettings;

    if (!value.toString() && isRequired) {
      setErrorMessage(inputErrors.isRequired);
      return;
    }

    if (customErrorMessage) {
      setErrorMessage(customErrorMessage);
      return;
    }

    const isMinLengthIncorrect = minLength ? value.toString().length < minLength : false;
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

  const onFocusInput = () => {
    setReadOnly(false);
    onFocus();
  };

  const onBlurInput = () => {
    onBlur();
  }

  return (
    <FormControl className="form-control-wrapper" style={{ width: width ? width : "" }}>
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
        readOnly={readOnly}
        onFocus={() => onFocusInput()}
        onBlur={() => onBlurInput()}
        multiline={multiline}
        type={type}
        inputProps={inputProps}
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
