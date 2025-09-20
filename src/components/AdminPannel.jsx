import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import "./AdminPannel.css";
const AdminPannel = () => {
  const navigate = useNavigate();
  const [round, setRound] = useState(false);
  const [att, setAtt] = useState(false);
  const handleRound = () => {
    setRound(true);
  };
  const handleRound1 = () => {
    navigate("/admin-pannel/marks/round-1");
  };
  const handleRound2 = () => {
    navigate("/admin-pannel/marks/round-2");
  };
  const handleUpdateAttendence = () => {
    // navigate("/admin-pannel/attendance");
    setAtt(true);
  };
  const handleAttendance1 = () => {
    navigate("/admin-pannel/attendance");
  };
  const handleAttendance2 = () => {
    navigate("/admin-pannel/attendance-2");
  };
  const handleAttendance3 = () => {
    navigate("/admin-pannel/attendance-3");
  };
  const handleAttendance4 = () => {
    navigate("/admin-pannel/attendance-4");
  };
  const handleAttendance5 = () => {
    navigate("/admin-pannel/attendance-5");
  };

  //   const [teamDetails, setTeamDetails] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const gettingTeamDetails = collection(db, "byte'tember");
  //       const teamRef = await getDocs(gettingTeamDetails);
  //       const showingTeam = teamRef.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setTeamDetails(showingTeam);
  //     };
  //     fetchData();
  //   }, []);
  //   useEffect(()=>{
  // console.log(teamDetails);

  //   },[])
  // <div>
  //   <Helmet>
  //     <title>Admin Pannel | PixelIT</title>
  //   </Helmet>
  //   {teamDetails.map((teams) => (
  //     <div key={teams.id} id="admin-team-container">

  //         <h3>{teams.teamName}</h3>
  //         <p><b>Selected Problem statement : </b>{teams.selectedProblemStatement}</p>
  //         <label htmlFor="">Enter the marks</label>
  //         <input type="number" />
  //         <button>Submit</button>
  //     </div>
  //   ))}
  // </div>
  if (round) {
    return (
      <div id="admin-main-container">
        <header id="admin-header">
          <Helmet>
            <title>Admin Pannel - PixelIT</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>
        <div id="admin-cards">
          <div id="marks">
            <h1>Round - 1</h1>
            <Button variant="contained" onClick={handleRound1}>
              GO
            </Button>
          </div>
          <div id="attendence">
            <h1>Round - 2</h1>
            <Button variant="contained" onClick={handleRound2}>
              GO
            </Button>
          </div>
        </div>

        <footer id="admin-footer">
          <p>
            Designed and Developed by <b>PixelIT Web Team</b>
          </p>
        </footer>
      </div>
    );
  }
  if (att) {
    return (
      <div id="admin-main-container">
        <header id="admin-header">
          <Helmet>
            <title>Admin Pannel - PixelIT</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>
        <div id="admin-cards">
          <div id="marks">
            <h1>Attendance - 1</h1>
            <Button variant="contained" onClick={handleAttendance1}>
              GO
            </Button>
          </div>
          <div id="attendence">
            <h1>Attendance - 2</h1>
            <Button variant="contained" onClick={handleAttendance2}>
              GO
            </Button>
          </div>
          <div id="marks">
            <h1>Attendance - 3</h1>
            <Button variant="contained" onClick={handleAttendance3}>
              GO
            </Button>
          </div>
          <div id="attendence">
            <h1>Attendance - 4</h1>
            <Button variant="contained" onClick={handleAttendance4}>
              GO
            </Button>
          </div>
          <div id="marks">
            <h1>Attendance - 5</h1>
            <Button variant="contained" onClick={handleAttendance5}>
              GO
            </Button>
          </div>
        </div>

        <footer id="admin-footer">
          <p>
            Designed and Developed by <b>PixelIT Web Team</b>
          </p>
        </footer>
      </div>
    );
  } else {
    return (
      <div id="admin-main-container">
        <header id="admin-header">
          <Helmet>
            <title>Admin Pannel - PixelIT</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>
        <div id="admin-cards">
          <div id="marks">
            <h1>Update Marks</h1>
            <Button variant="contained" onClick={handleRound}>
              GO
            </Button>
          </div>
          <div id="attendence">
            <h1>Update Attendance</h1>
            <Button variant="contained" onClick={handleUpdateAttendence}>
              GO
            </Button>
          </div>
        </div>

        <footer id="admin-footer">
          <p>
            Designed and Developed by <b>PixelIT Web Team</b>
          </p>
        </footer>
      </div>
    );
  }
};

export default AdminPannel;
