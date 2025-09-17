
import { Routes, Route } from "react-router";
import ProblemStatement from "./components/ProblemStatement";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/problem-statement-selection" element={<ProblemStatement/>}/>
    </Routes>
  );
}

export default App;
