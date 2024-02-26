import React, { useState } from "react";
import "./App.css";
import Input from "./Components/input";
import Output from "./Components/output";

function App() {
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const handleFormSubmit = () => {
    setSubmitted(true); // Update submitted state when form is submitted
  };

  const handleFormFetch = () => {
    setSubmitted(false); // Update submitted state when form is submitted
  };

  return (
    <div className="app-container">
      <Input onSubmit={handleFormSubmit} submitted={submitted} />{" "}
      {/* Pass onSubmit callback and submitted state to Input component */}
      <Output submitted={submitted} onFetch={handleFormFetch} />{" "}
      {/* Pass submitted state to Output component */}
    </div>
  );
}

export default App;
