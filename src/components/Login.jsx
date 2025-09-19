import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase"; 
import { collection, query, where, getDocs, getDoc ,doc} from "firebase/firestore";
import { Helmet } from "react-helmet";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    try {
      const q = query(
        collection(db, "byte'tember"),
        where("email", "==", email),
        where("registrationNumber", "==", regNumber)
      );

      //get the admin email and password and first check the admin and then check the user
      // const adminCheck = query(
      //   collection(db,"pixelit-core-members-login"),
      //   where("email","==",email),
      //   where("password","==",regNumber)
      // )
      // const getAdmin = await getDocs(adminCheck);
      const adminCheck = doc(db,"pixelit-core-members-login","admin");
      const gettingAdminDetails = await getDoc(adminCheck);
      if(gettingAdminDetails.exists()){
        const adminDetails = gettingAdminDetails.data();
        if(adminDetails.email == email && adminDetails.password == regNumber){
          navigate("/admin-pannel")
        }
      }
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const teamDoc = querySnapshot.docs[0];
        const teamData = { id: teamDoc.id, ...teamDoc.data() };
        localStorage.setItem("team", JSON.stringify(teamData));
        navigate("/problem-statement-selection");
      } else {
        setError("Invalid Team Name or Registration Number");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
    <Helmet>
      <title>Login | PixelIT</title>
    </Helmet>
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">BYTE'TEMBER</h1>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Registration Number</label>
          <input
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            className="form-input"
            placeholder="Enter your Team Lead reg no"
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
  {loading ? <span className="spinner"></span> : null}
  {loading ? "Logging in..." : "Login"}
</button>
      </form>
    </div>
  );
};

export default Login;
