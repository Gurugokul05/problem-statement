
import { Routes, Route } from "react-router";
import ProblemStatement from "./components/ProblemStatement";
import Login from "./components/Login";
import AdminPannel from "./components/AdminPannel";
import Round1 from "./components/Round1";
import Round2 from "./components/Round2";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/problem-statement-selection" element={<ProblemStatement/>}/>
      <Route path="/admin-pannel" element={<AdminPannel/>}/>
      <Route path="/admin-pannel" element={<AdminPannel/>}/>
      <Route path="/admin-pannel" element={<AdminPannel/>}/>
      <Route path="/admin-pannel/marks/round-1" element={<Round1/>}/>
      <Route path="/admin-pannel/marks/round-2" element={<Round2/>}/>
      
    </Routes>
  );
}

export default App;
