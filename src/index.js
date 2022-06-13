import React, { useState, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import debounce from "lodash.debounce";

import "./styles.css";

const SECOND = 1000;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [underInputValue, setUnderInputValue] = useState("");
  const [counter, setCounter] = useState(0);
  const clearTimer = useRef();
  const counterTimer = useRef();

  const debouncedOnChange = useMemo(
    () =>
      debounce((value) => {
        clearTimeout(counterTimer.current);
        let innerCount = 5;

        setUnderInputValue(value);
        setCounter(innerCount);
        clearTimer.current = setTimeout(() => {
          setUnderInputValue("");
          setInputValue("");
        }, 5 * SECOND);

        const updateCounter = () => {
          innerCount -= 1;
          setCounter(innerCount);
          if (innerCount) {
            counterTimer.current = setTimeout(updateCounter, SECOND);
          }
        };

        counterTimer.current = setTimeout(updateCounter, SECOND);
      }, SECOND),
    []
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        value={inputValue}
        onChange={(e) => {
          clearTimeout(clearTimer.current);

          const { value } = e.target;
          setInputValue(value);
          debouncedOnChange(value);
        }}
        placeholder="type something"
      />
      {!!counter && `${counter}s`}
      <p>{underInputValue}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
