import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { setName } from "@store/user/user.reducer";
import Button from '@mui/material/Button';

const App = () => {
  const [value, setValue] = useState("");
  const nameuser = useSelector((state: RootState) => state.user.username);
  const url = process.env.REACT_APP_URL || process.env.PUBLIC_URL;
  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();
  const getData = () => {
    fetch(`${url}/about`)
      .then(response => response.json())
      .then(data => setValue(data));
  };
  return (
    <div className="App">
      <header className="App-header">
        <button aria-label="Increment value" onClick={() => dispatch(setName("test"))}>
          set name
        </button>
        <Button variant="contained">Hello World</Button>
        {nameuser}
        {value}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default App;
