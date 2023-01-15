import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const App = () => {
  const [pin, setPin] = useState(new Array(4).fill(""));
  const [secretMode, setSecretMode] = useState(true);
  const [message, setMessage] = useState("");
  const defaultCode = "1234";

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setPin([...pin.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    if (!isNaN(pastedText)) {
      let pastedArray = pastedText.split("");
      pastedArray = pastedArray.slice(0, 4);
      setPin(pastedArray);
    }
  };

  const inputRefs = useRef([]);

  useEffect(() => {
    const firstEmptyIndex = pin.findIndex((i) => i === "");
    if (inputRefs.current[firstEmptyIndex])
      inputRefs.current[firstEmptyIndex].focus();
  }, [pin]);

  useEffect(() => {
    inputRefs.current.forEach((input) => {
      input.addEventListener("paste", handlePaste);
    });
    return () => {
      inputRefs.current.forEach((input) => {
        input.removeEventListener("paste", handlePaste);
      });
    };
  }, []);

  useEffect(() => {
    if (pin.join("") === defaultCode) {
      alert("Successful");
      setMessage("Successful");
    } else if (pin.join("").length === 4) {
      setMessage("Incorrect code");
    } else {
      setMessage("");
    }
  }, [pin]);

  return (
    <>
      <div>
        <div className="pin-code centered">
          <p>Enter PIN</p>

          {pin.map((data, index) => {
            return (
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                className="pin-field"
                type={secretMode ? "password" : "text"}
                name="pin"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}

          <p>{message}</p>
          <p className="centered">
            <button
              className="sampleButton"
              onClick={(e) => setPin([...pin.map((v) => "")])}
            >
              Clear
            </button>
            <button
              className="sampleButton"
              onClick={() => setSecretMode(!secretMode)}
            >
              {secretMode ? "Show" : "Hide"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;