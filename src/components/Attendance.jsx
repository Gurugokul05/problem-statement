import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet";
import "./Attendance.css";

const Attendance = () => {
  const [team, setTeam] = useState(null);
  const [displayTeam, setDisplayTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) {
      navigate("/");
    } else {
      setTeam(JSON.parse(savedTeam));
    }
  }, [navigate]);
  useEffect(() => {
    if (!team) return;
    const fetchData = async () => {
      try {
        const teamDocRef = doc(db, "byte_tember-attendance", team.id); // 👈 use team.id
        const teamSnap = await getDoc(teamDocRef);

        if (teamSnap.exists()) {
          setDisplayTeam([{ id: teamSnap.id, ...teamSnap.data() }]);
        } else {
          console.log("No such team found!");
        }
      } catch (error) {
        console.log("Error while fetching the data : ", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [team]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }


  return (
    <div className="attendance-container">
      <header id="attendance-header">
        <Helmet>
          <title>PixelIT - Byte'tember</title>
        </Helmet>
        <h1>BYTE'TEMBER</h1>
        <p>PixelIT X Frames 24</p>
      </header>

      <div className="attendance-content">
        <h1 style={{textAlign:"center"}}>Attendance Details</h1>
        {displayTeam.map((team) => (
          <div key={team.id} style={{ marginBottom: "20px" }}>
            <h2 style={{textAlign:"center"}}>Team: {team.id}</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Attendance 1</th>
                  <th>Attendance 2</th>
                  <th>Attendance 3</th>
                  <th>Attendance 4</th>
                  <th>Attendance 5</th>
                  
                </tr>
              </thead>
              <tbody>
                {team.members?.map((member) => (
                  <tr key={`${team.id}-${member.name}`}>
                    <td data-label="Name">{member.name}</td>
                    <td data-label="Attendance 1">{member.attendance1}</td>
                    <td data-label="Attendance 2">{member.attendance2}</td>
                    <td data-label="Attendance 3">{member.attendance3}</td>
                    <td data-label="Attendance 4">{member.attendance4}</td>
                    <td data-label="Attendance 5">{member.attendance5}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <footer id="attendance-footer">
        <p>Designed and developed by PixelIT Web Team</p>
      </footer>
    </div>
  );
};

export default Attendance;
