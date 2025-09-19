import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";
import "./User.css";
import { useNavigate } from "react-router";
const User = () => {
  const [terms, setTerms] = useState(true);
const navigate = useNavigate();
  if (terms) {
    return (
      <div id="terms">
        <header id="user-header">
          <Helmet>
            <title>PixelIT - Byte'tember</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>
        <div id="terms-container">
          <h1>ALERT</h1>
          <ul>
            <li>
              Teams are responsible for any electrical or furniture damage.
            </li>
            <li>All sessions must be attended by every team member.</li>
            <li>
              If any team member is absent, they cannot be replaced; the absent
              member will be considered as absent for the session.
            </li>
            <li>
              Each team must bring at least one laptop preinstalled with Unity
              and Unreal Engine software.
            </li>
            <li>
              Any indiscipline, misconduct, or unnecessary interference in
              activities will result in disciplinary action, including removal
              by the coordinators.
            </li>
            <li>College ID cards must be carried by all team members.</li>
            <li>Teams must sit in their allocated spaces only.</li>
          </ul>
          <Button
            variant="contained"
            onClick={() => {
              setTerms(false);
            }}
          >
            I Accept
          </Button>
        </div>
        <footer id="user-footer">
          <p>Designed and developed by PixelIT Web Team</p>
        </footer>
      </div>
    );
  } else {
    return (
      <div id="main">
        <header id="user-header">
          <Helmet>
            <title>PixelIT - Byte'tember</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>
        <div id="main-container">
          <div id="user-mark">
            <h1>View Marks</h1>
            <Button variant="contained" onClick={()=>{navigate("/user/marks")}}>View</Button>
          </div>
          <div id="user-problem">
            <h1>Select Problem Statement</h1>
            <Button variant="contained" onClick={()=>{navigate("/user/problem-statement-selection")}}>Select</Button>
          </div>
          <div id="user-attendence">
            <h1>View attendence</h1>
            <Button variant="contained" onClick={()=>{navigate("/user/attendence")}} >View</Button>
          </div>
        </div>
        <footer id="user-footer">
          <p>Designed and developed by PixelIT Web Team</p>
        </footer>
      </div>
    );
  }
};

export default User;
