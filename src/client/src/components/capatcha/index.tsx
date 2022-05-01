import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { BaseInput } from "@components";
import { CapatchaProps, CapatchaHandle } from "./capatcha.interface";
import "./capatcha.scoped.scss";
// Unused component
export const Capatcha = forwardRef<CapatchaHandle, CapatchaProps>(({ wasSubmitted = false }, ref) => {
  const [mathResult, setMathResult] = useState("");
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    generaterRandomValues();
  }, []);

  useImperativeHandle(ref, () => ({
    checkResults() {
      const result = calculateIsCorrectResult();
      if (!result) {
        generaterRandomValues();
      }
      return result;
    },
  }));

  const calculateIsCorrectResult = (): boolean => {
    const correctResultValue = firstValue + secondValue;
    return correctResultValue === +mathResult;
  };

  const generaterRandomValues = () => {
    setFirstValue(Math.floor(Math.random() * 100) + 1);
    setSecondValue(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div className="display-row-center-space capatcha-wrapper">
      <div className="form-place-till">{firstValue}</div>
      <div className="form-place-till">+</div>
      <div className="form-place-till">{secondValue}</div>
      <div className="form-place-till">=</div>
      <BaseInput
        value={mathResult}
        setValue={setMathResult}
        label="Result"
        width={'80px'}
        type="number"
        showErrors={wasSubmitted}
        validationSettings={{ isRequired: true, maxLength: 3 }}
      />
    </div>
  );
});

export type CapatchaHandleRef = React.ElementRef<typeof Capatcha>;
