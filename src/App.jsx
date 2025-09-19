
import { Routes, Route } from "react-router";
import ProblemStatement from "./components/ProblemStatement";
import Login from "./components/Login";
import AdminPannel from "./components/AdminPannel";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/problem-statement-selection" element={<ProblemStatement/>}/>
      <Route path="/admin-pannel" element={<AdminPannel/>}/>
    </Routes>
  );
}

export default App;
