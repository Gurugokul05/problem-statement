import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./ProblemStatement.css";

const ProblemStatement = () => {
  const [problemStatement, setProblemStatement] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedProblemId, setSelectedProblemId] = useState("");
  const [
    displaySelectedProbelemStatement,
    setDisplaySelectedProbelemStatement,
  ] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [off, setOff] = useState(false);
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  // Check login & load team from localStorage
  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (!savedTeam) {
      navigate("/");
    } else {
      setTeam(JSON.parse(savedTeam));
    }
  }, [navigate]);

  //  Fetch problems
  useEffect(() => {
    const fetchData = async () => {
      if (!team) return;

      // If team already submitted, just show the selection
      if (team.selectedProblemStatement) {
        const selectedStatement = team.selectedProblemStatement;
        setDisplaySelectedProbelemStatement(selectedStatement);
        setSelectedProblem(team.selectedProblemStatement);
        setSelectedStatus(true);
        // Fetch all problems for display (disabled state)
        // const problemref = collection(db, "problem-statements");
        // const snapshot = await getDocs(problemref);
        // const problems = snapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        // setProblemStatement(problems);
        // return;
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
  useEffect(() => {
    console.log(displaySelectedProbelemStatement);
  }, [displaySelectedProbelemStatement]);
  //  Pre-submit: just select problem in state
  const handleClick = (problemid, problemText) => {
    setSelectedProblemId(problemid);
    setSelectedProblem(problemText);
  };

  //  Submit selection
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
      const teamname = team.id;
      const dbproblems = doc(db, "problem-statements", selectedProblemId);
      const gettingDbProblems = await getDoc(dbproblems);
      const dbTeams = doc(db, "byte'tember", teamname);
      const gettingDbTeams = await getDoc(dbTeams);
      if (gettingDbProblems.exists()) {
        const problemData = gettingDbProblems.data();
        if (problemData.selected === false) {
          await updateDoc(dbproblems, {
            selected: true,
          });
          await updateDoc(dbTeams, {
            selectedProblemStatement: selectedProblem,
          });
        } else {
          throw new Error(
            "You are late !! This problem has been selected by another Team."
          );
        }
      }
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
        html: `Problem submitted successfully!<br><strong>Team:</strong> ${team?.teamName}<br><strong>Problem:</strong> ${selectedProblem}`,
      });
    } catch (error) {
      setLoading(false);
      console.error("Error submitting problem:", error);
      Swal.fire({
        icon: "error",
        title: "Late",
        text: error,
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
  if (off) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          margin: "20px",
          padding: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#343a40",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "22px",
            fontWeight: "600",
            margin: 0,
          }}
        >
          The time for choosing Problem Statement is over
        </h1>
      </div>
    );
  }
  if (selectedStatus) {
    return (
      <div id="selected-problem-only">
        <Helmet>
          <title>PixelIT - Problem Statement Selection</title>
        </Helmet>
        <h1>Your selected problem statement : </h1>
        <p>{displaySelectedProbelemStatement}</p>
      </div>
    );
  } else {
    return (
      <div className="problem-container">
        <header id="user-header">
          <Helmet>
            <title>PixelIT - Problem Statement Selection</title>
          </Helmet>
          <h1>BYTE'TEMBER</h1>
          <p>PixelIT X Frames 24</p>
        </header>

        <form className="problem-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 style={{ textAlign: "center" }}>Welcome {team?.teamName}</h2>
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
                      onChange={() => handleClick(problem.id, problem.problem)}
                      disabled={isSubmitted && !isSelected}
                    />
                    <span className="problem-text">{problem.problem}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {!team?.selectedProblemStatement && (
            <button type="submit" style={{ marginBottom: "10px" }}>
              Submit
            </button>
          )}
        </form>
        <footer id="user-footer">
          <p>Designed and developed by PixelIT Web Team</p>
        </footer>
      </div>
    );
  }
};

export default ProblemStatement;
