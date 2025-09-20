import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet";
import "./Marks.css"

const Marks = () => {
  const [team, setTeam] = useState(null);
  const [teamFullData, setTeamFullData] = useState([]);
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
      const teamDbID = team.id;
      const teamDocRef = doc(db, "byte'tember", teamDbID);
      const teamDocSnap = await getDoc(teamDocRef);

      if (teamDocSnap.exists()) {
        setTeamFullData([teamDocSnap.data()]);
      } else {
        console.log("No such document!");
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
    <div id="marks-page">
      {" "}
      {/* This is already a flex column */}
      <header id="user-header">
        <Helmet>
          <title>PixelIT - Byte'tember</title>
        </Helmet>
        <h1>BYTE'TEMBER</h1>
        <p>PixelIT X Frames 24</p>
      </header>
      <div id="main-content-wrapper">
        {" "}
        {/* New wrapper div */}
        {teamFullData.map((doc, index) => (
          <div key={doc.id} id="marks-container">
            <h1 >{doc.teamName}</h1>
            <p>
              <b>Selected Problem Statement : </b>
              {doc.selectedProblemStatement}
            </p>
            <h2 style={{ textAlign: "center" }}>
              <b>Round 1 marks : </b>
              {doc.round1Marks}
            </h2>
            <h2 style={{ textAlign: "center" }}>
              {" "}
              <b>Round 2 marks : </b>
              {doc.round2Marks}
            </h2>
            <h1 style={{ textAlign: "center" }}>
              <b>Total marks : </b>
              {doc.totalMarks}
            </h1>
          </div>
        ))}
      </div>
      <footer id="user-footer">
        <p>Designed and developed by PixelIT Web Team</p>
      </footer>
    </div>
  );
};

export default Marks;
