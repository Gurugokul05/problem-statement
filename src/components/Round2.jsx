import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import "./Round1.css";
import { useNavigate } from "react-router";
const Round2 = () => {
  const [teamDetails, setTeamDetails] = useState([]);
  const [selectedTeamDetails, setSelectedTeamDetails] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [marksUpdate, setMarksUpdate] = useState(false);
  const [feild1Marks, setFeild1Marks] = useState(0);
  const [feild2Marks, setFeild2Marks] = useState(0);
  const [feild3Marks, setFeild3Marks] = useState(0);
  const [feild4Marks, setFeild4Marks] = useState(0);
  
  const navigate = useNavigate();
  
  //default data fetching
  useEffect(() => {
    const fetchData = async () => {
      const gettingTeamDetails = collection(db, "byte'tember");
      const teamRef = await getDocs(gettingTeamDetails);
      const showingTeam = teamRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamDetails(showingTeam);
    };
    fetchData();
  }, []);
  //selected team data fetching
  useEffect(() => {
    if (!currentTeam) return;
    const fetchData = async () => {
      const teamId = currentTeam;
      const gettingTeamDetails = doc(db, "byte'tember", teamId);
      const docSnap = await getDoc(gettingTeamDetails);
      if (docSnap.exists()) {
        setSelectedTeamDetails([{ id: docSnap.id, ...docSnap.data() }]);
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [currentTeam, marksUpdate]);
//   useEffect(() => {
//     if (!total) return;
//     console.log(total);
//   }, [total]);
  const handleMarkSubmission = async () => {
    
     const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to submit the mark`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
        
       let  totalRound2Marks = feild1Marks + feild2Marks + feild3Marks + feild4Marks  ;
     const teamId = currentTeam;
      const updateTeamMark = doc(db, "byte'tember", teamId);
      const teamRef = await getDoc(updateTeamMark)
      if(teamRef.exists()){
        const teamData = teamRef.data();
        const round1Mark = teamData.round1Marks
        const round2Total = totalRound2Marks
        await updateDoc(updateTeamMark, {
          round2Marks: round2Total,
          totalMarks:round1Mark + round2Total,
        });
      }
    
       
      await Swal.fire({
              icon: "success",
              title: "Submitted!",
              html: `Marks successfully!`,
            });
            setMarksUpdate(false);
            setFeild1Marks(0);
            setFeild2Marks(0);
            setFeild3Marks(0);
            setFeild4Marks(0);
    } catch (error) {
   
      console.error("Error submitting problem:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
    
  };
  
  if (marksUpdate) {
    return (
      <div id="round1-container">
        <header id="round1-header">
          <Helmet>
            <title>Round 2 Marks - PixelIT</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>

        <main id="round1-content">
          {selectedTeamDetails.map((team) => (
            <div key={team.id} className="round1-team-card">
              <h3>{team.teamName}</h3>
              <p>
                <b>Selected Problem Statement : </b>{" "}
                {team.selectedProblemStatement}
              </p>
              <label htmlFor="">
                <b>Implementation & Functionality - 15 :</b>{" "}
              </label>
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Marks"
                variant="outlined"
                onChange={(e) => {
                  const numberValue = parseInt(e.target.value, 10);
                  setFeild1Marks(numberValue);
                }}
                type="number"
              />
              <br />
              <br />
              <label htmlFor="">
                <b>Creativity & Innovation in Game - 20 : </b>
              </label>
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Marks"
                variant="outlined"
                onChange={(e) => {
                  const numberValue = parseInt(e.target.value, 10);
                  setFeild2Marks(numberValue);
                }}
                type="number"
              />
              <br />
              <br />
              <label htmlFor="">
                <b>Presentation & Communication - 5 : </b>
              </label>
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Marks"
                variant="outlined"
                onChange={(e) => {
                  const numberValue = parseInt(e.target.value, 10);
                  setFeild3Marks(numberValue);
                }}
                type="number"
              />
              <br />
              <br />
              <label htmlFor="">
                <b>Completion & Team Effort - 20 : </b>
              </label>
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Marks"
                variant="outlined"
                onChange={(e) => {
                  const numberValue = parseInt(e.target.value, 10);
                  setFeild4Marks(numberValue);
                }}
                type="number"
              />
              <br />
              <br />
              <Button variant="contained" onClick={handleMarkSubmission}>
                Update Mark
              </Button>
            </div>
          ))}
        </main>

        <footer id="round1-footer">
          <p>
            Designed and Developed by <b>PixelIT Web Team</b>
          </p>
        </footer>
      </div>
    );
  } else {
    return (
      <div id="round1-container">
        <header id="round1-header">
          <Helmet>
            <title>Round 2 Marks - PixelIT</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>

        <main id="round1-content">
          <h2>Round - 2</h2>
          {teamDetails.map((team) => (
            <div key={team.id} className="round1-team-card">
              <h3>{team.teamName}</h3>

              <Button
                variant="contained"
                onClick={() => {
                  setCurrentTeam(team.id);
                  setMarksUpdate(true);
                }}
              >
                Select Team
              </Button>
            </div>
          ))}
        </main>

        <footer id="round1-footer">
          <p>
            Designed and Developed by <b>PixelIT Web Team</b>
          </p>
        </footer>
      </div>
    );
  }
};

export default Round2;
