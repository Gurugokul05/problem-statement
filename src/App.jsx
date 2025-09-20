import { Routes, Route } from "react-router";
import ProblemStatement from "./components/ProblemStatement";
import Login from "./components/Login";
import AdminPannel from "./components/AdminPannel";
import Round1 from "./components/Round1";
import Round2 from "./components/Round2";
import Attendance from "./components/Attendance";
import User from "./components/User";
import Marks from "./components/Marks";
import AdminAttendance from "./components/AdminAttendance";
import AdminAttendance2 from "./components/AdminAttendance2";
import AdminAttendance3 from "./components/AdminAttendance3";
import AdminAttendance4 from "./components/AdminAttendance4";
import AdminAttendance5 from "./components/AdminAttendance5";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/marks" element={<Marks />} />
      <Route path="/user/attendance" element={<Attendance />} />
      <Route
        path="/user/problem-statement-selection"
        element={<ProblemStatement />}
      />
      <Route path="/admin-pannel" element={<AdminPannel />} />
      <Route path="/admin-pannel" element={<AdminPannel />} />
      <Route path="/admin-pannel" element={<AdminPannel />} />
      <Route path="/admin-pannel/marks/round-1" element={<Round1 />} />
      <Route path="/admin-pannel/marks/round-2" element={<Round2 />} />
      <Route path="/admin-pannel/attendance" element={<AdminAttendance />} />
      <Route path="/admin-pannel/attendance-2" element={<AdminAttendance2 />} />
      <Route path="/admin-pannel/attendance-3" element={<AdminAttendance3 />} />
      <Route path="/admin-pannel/attendance-4" element={<AdminAttendance4 />} />
      <Route path="/admin-pannel/attendance-5" element={<AdminAttendance5 />} />
      
    </Routes>
  );
}

export default App;
