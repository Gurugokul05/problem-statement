import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./ProblemStatement.css";

const ProblemStatement = () => {
  const [problemStatement, setProblemStatement] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  // 🔹 Check login & load team from localStorage
  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) {
      navigate("/"); // redirect to login
    } else {
      setTeam(JSON.parse(savedTeam));
    }
  }, [navigate]);

  // 🔹 Fetch problems
  useEffect(() => {
    const fetchData = async () => {
      if (!team) return;

      // If team already submitted, just show the selection
      if (team.selectedProblemStatement) {
        setSelectedProblem(team.selectedProblemStatement);
        setLoading(false);

        // Fetch all problems for display (disabled state)
        const problemref = collection(db, "problem-statements");
        const snapshot = await getDocs(problemref);
        const problems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProblemStatement(problems);
        return;
      }

      // Otherwise fetch only unselected problems
      const problemref = collection(db, "problem-statements");
      const check = query(problemref, where("selected", "==", false));
      const snapshot = await getDocs(check);
      const problems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProblemStatement(problems);
      setLoading(false);
    };

    fetchData();
  }, [team]);

  // 🔹 Pre-submit: just select problem in state
  const handleClick = (problemText) => {
    setSelectedProblem(problemText);
  };

  // 🔹 Submit selection
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProblem) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a problem before submitting.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to submit this problem?\n\n"${selectedProblem}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      // 1️⃣ Update problem-statements collection
      const problemref = collection(db, "problem-statements");
      const snapshot = await getDocs(problemref);

      const problemPromises = snapshot.docs.map((docsnap) => {
        const updatedDocRef = doc(db, "problem-statements", docsnap.id);
        return updateDoc(updatedDocRef, {
          selected: docsnap.data().problem === selectedProblem,
        });
      });
      await Promise.all(problemPromises);

      // 2️⃣ Update the team's document in byte'tember
      const teamDocRef = doc(db, "byte'tember", team.id);
      await updateDoc(teamDocRef, {
        selectedProblemStatement: selectedProblem,
      });

      // 3️⃣ Update localStorage & state
      const updatedTeam = {
        ...team,
        selectedProblemStatement: selectedProblem,
      };
      localStorage.setItem("team", JSON.stringify(updatedTeam));
      setTeam(updatedTeam);

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Submitted!",
        html: `✅ Problem submitted successfully!<br><strong>Team:</strong> ${team?.teamName}<br><strong>Problem:</strong> ${selectedProblem}`,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error submitting problem:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while submitting. Try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="problem-container">
      <Helmet>
        <title>PixelIT - Problem Statement Selection</title>
      </Helmet>
      <h1>BYTE'TEMBER</h1>

      <form className="problem-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 style={{textAlign:"center"}}>Welcome {team?.teamName}</h2>
        </div>

        <div className="form-group">
          <label>Select your Problem Statement</label>
          <div className="cards-container">
            {problemStatement.map((problem, index) => {
              const isSelected = selectedProblem === problem.problem;
              const isSubmitted = !!team?.selectedProblemStatement;

              return (
                <label
                  key={problem.id || index}
                  className={`problem-card ${isSelected ? "selected" : ""} ${
                    isSubmitted && !isSelected ? "disabled" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="problem-statement"
                    value={problem.problem}
                    checked={isSelected}
                    onChange={() => handleClick(problem.problem)}
                    disabled={isSubmitted && !isSelected}
                  />
                  <span className="problem-text">{problem.problem}</span>
                </label>
              );
            })}
          </div>
        </div>

        {!team?.selectedProblemStatement && (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default ProblemStatement;
