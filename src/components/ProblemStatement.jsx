import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet";
import "./ProblemStatement.css";

const ProblemStatement = () => {
  const [problemStatement, setProblemStatement] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const problemref = collection(db, "problem-statements");
      const snapshot = await getDocs(problemref);
      const problem = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProblemStatement(problem);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSelection = (problem) => {
    setSelectedProblem(problem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Team Name: ${e.target.teamName.value}\nProblem: ${selectedProblem}`);
    // Submit logic goes here
  };
if(loading){
  return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
}else{

  return (
    <div className="problem-container">
      <Helmet>
        <title>PixelIT - Problem Statement Selection</title>
      </Helmet>
      <h1>BYTE'TEMBER</h1>

      <form className="problem-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName">Enter your Team name</label>
          <input type="text" id="teamName" name="teamName" required />
        </div>

        <div className="form-group">
          <label>Select your Problem Statement</label>
          <div className="cards-container">
            {problemStatement.map((problem, index) => (
              <div
                key={problem.id || index}
                className={`problem-card ${
                  selectedProblem === problem.problem ? "selected" : ""
                }`}
                onClick={() => handleSelection(problem.problem)}
              >
                <input
                  type="radio"
                  name="problem-statement"
                  value={problem.problem}
                  checked={selectedProblem === problem.problem}
                  onChange={() => handleSelection(problem.problem)}
                />
                <span className="problem-text">{problem.problem}</span>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
};

export default ProblemStatement;
