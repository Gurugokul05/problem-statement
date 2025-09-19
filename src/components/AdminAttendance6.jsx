import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import "./AdminAttendance.css";

const AdminAttendance6 = () => {
  const [team, setTeam] = useState([]);
  const [displayTeam, setDisplayTeam] = useState([]);
  const [attUpdate, setAttUpdate] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [selectedTeamDetails, setSelectedTeamDetails] = useState(null);

  const navigate = useNavigate();

  // 🔹 Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(
        collection(db, "byte_tember-attendance")
      );
      const teams = [];
      querySnapshot.forEach((docSnap) => {
        teams.push({ id: docSnap.id, ...docSnap.data() });
      });
      setTeam(teams);
      setDisplayTeam(teams);
    };
    fetchTeams();
  }, []);

  // 🔹 Select a team
  const handleAttUpdate = (teamId) => {
    setCurrentTeam(teamId);
    const teamDetails = team.find((t) => t.id === teamId);
    setSelectedTeamDetails(teamDetails);
    setAttUpdate(true);
  };

  // 🔹 Submit attendance
  const handleSubmission = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to submit the attendance?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      const teamId = currentTeam;
      const updateTeamAtt = doc(db, "byte_tember-attendance", teamId);

      // 🔹 Save updated members back to Firestore
      await updateDoc(updateTeamAtt, {
        members: selectedTeamDetails.members,
      });

      await Swal.fire({
        icon: "success",
        title: "Submitted!",
        html: `Attendance Submitted Successfully!`,
      });

      setAttUpdate(false); // back to team list
    } catch (error) {
      console.error("Error submitting attendance:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div id="attendance-container">
      <header id="round1-header">
        <Helmet>
          <title>Attendance | PixekIT</title>
        </Helmet>

        <h1>BYTE'TEMBER</h1>
        <p>PixelIT X Frames 24</p>
      </header>

      {/* Team Selection View */}
      {!attUpdate && (
        <div > 
          <h2>Select a Team</h2>
          <div className="team-list" style={{marginBottom:"10px"}}>
            {displayTeam.map((team) => (
              <div key={team.id} className="team-card">
                <h3>{team.id}</h3>
                <Button
                  variant="contained"
                  onClick={() => handleAttUpdate(team.id)}
                >
                  Go
                </Button>
              </div>
            ))}
          </div >

          <footer id="round1-footer">
            <p>
              Designed and Developed by <b>PixelIT Web Team</b>
            </p>
          </footer>
        </div>
      )}

      {/* Attendance Update View */}
      {attUpdate && selectedTeamDetails && (
        <div>
          

          <h2>Update Attendance for {selectedTeamDetails.id}</h2>

          <div className="attendance-form">
            {selectedTeamDetails.members?.map((member, idx) => (
              <div key={idx} className="attendance-member">
                <p>{member.name}</p>

                <FormControl style={{ minWidth: 120 }}>
                
                  <Select
                    value={member.attendance6 || ""}
                    onChange={(e) => {
                      const updatedMembers = [...selectedTeamDetails.members];
                      updatedMembers[idx].attendance6 = e.target.value;
                      setSelectedTeamDetails({
                        ...selectedTeamDetails,
                        members: updatedMembers,
                      });
                    }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ))}
          </div>

          <div className="attendance-actions" style={{marginBottom:"10px"}}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmission}
            >
              Submit Attendance
            </Button>

            <Button
              variant="outlined"
              color="secondary" 
              
              onClick={() => setAttUpdate(false)}
            >
              Back
            </Button>
          </div>

          <footer id="round1-footer">
            <p>
              Designed and Developed by <b>PixelIT Web Team</b>
            </p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance6;
