import React from "react";
import { Autocomplete, FormHelperText, InputLabel, TextField } from "@mui/material";
import { Option } from "@interfaces";
import { TheAutocompleteProps } from "./theAutocomplete.interface";
import "./theAutocomplete.scss";

export const TheAutocomplete = ({
  value,
  setValue,
  options,
  errorMessage = "",
  showErrors = false,
  label = "",
  clearIcon = false,
  width = 300,
}: TheAutocompleteProps) => {
  return (
    <div className="auto-complete-wrapper">
      {label && <InputLabel classes={{ root: "mui-label-root" }}>{label}</InputLabel>}
      <Autocomplete
        value={value}
        onChange={(_, newValue: Option) => {
          setValue(newValue);
        }}
        classes={{
          paper: "autocomplete-paper",
          noOptions: "autocomplete-no-options",
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        id="controllable-states-demo"
        noOptionsText="Brak opcji"
        options={options}
        clearIcon={clearIcon}
        sx={{ width: width }}
        renderInput={params => (
          <TextField
            variant="standard"
            error={showErrors && !!errorMessage}
            classes={{
              root: "mui-input",
            }}
            {...params}
          />
        )}
      />
      {errorMessage && showErrors && <FormHelperText error>{errorMessage}</FormHelperText>}
    </div>
  );
};
