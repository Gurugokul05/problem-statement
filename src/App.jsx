import { useState } from "react";
import { Routes, Route } from "react-router";
import ProblemStatement from "./components/ProblemStatement";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProblemStatement/>}></Route>
    </Routes>
  );
}

export default App;
