import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const url = process.env.REACT_APP_URL || process.env.PUBLIC_URL;
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`${url}/about`)
      .then((response) => response.json())
      .then((data) => setValue(data));
  };
  return (
    <div className="App">
      <header className="App-header">
        {value}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
