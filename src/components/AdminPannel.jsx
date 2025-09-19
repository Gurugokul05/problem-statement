import React from "react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
const AdminPannel = () => {
  const [teamDetails, setTeamDetails] = useState([]);
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
  useEffect(()=>{
console.log(teamDetails);

  },[])
  return (
    <div>
      <Helmet>
        <title>Admin Pannel | PixelIT</title>
      </Helmet>
      {teamDetails.map((teams) => (
        <div key={teams.id} id="admin-team-container">

            <h3>{teams.teamName}</h3>
            <p><b>Selected Problem statement : </b>{teams.selectedProblemStatement}</p>
            <label htmlFor="">Enter the marks</label>
            <input type="number" />
            <button>Submit</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPannel;
