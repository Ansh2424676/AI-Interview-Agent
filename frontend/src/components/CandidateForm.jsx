import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import API from "../services/api";

function CandidateForm() {
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    jobRole: "",
    education: "",
  });

  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    });
  };

  const startInterview = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/api/interview", {
        sessionId: "session1",
        candidate: {
          id: "1",
          name: candidate.name,
          jobRole: candidate.jobRole,
          education: candidate.education,
        },
      });

      navigate("/interview", {
        state: {
          sessionId: "session1",
          question: response.data.reply,
        },
      });
    } catch (err) {
      console.log(err);
      alert("Backend Connection Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    marginTop: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.08)",
    color: "#fff",
    fontSize: "16px",
  };

  return (
    <form onSubmit={startInterview}>
      <div style={{ position: "relative" }}>
        <FaUser
          style={{
            position: "absolute",
            left: "15px",
            top: "35px",
            color: "#60a5fa",
          }}
        />

        <input
          style={{ ...inputStyle, paddingLeft: "45px" }}
          type="text"
          placeholder="Candidate Name"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ position: "relative" }}>
        <FaBriefcase
          style={{
            position: "absolute",
            left: "15px",
            top: "35px",
            color: "#60a5fa",
          }}
        />

        <input
          style={{ ...inputStyle, paddingLeft: "45px" }}
          type="text"
          placeholder="Job Role"
          name="jobRole"
          value={candidate.jobRole}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ position: "relative" }}>
        <FaGraduationCap
          style={{
            position: "absolute",
            left: "15px",
            top: "35px",
            color: "#60a5fa",
          }}
        />

        <input
          style={{ ...inputStyle, paddingLeft: "45px" }}
          type="text"
          placeholder="Education"
          name="education"
          value={candidate.education}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "16px",
          border: "none",
          borderRadius: "12px",
          background: "linear-gradient(90deg,#2563eb,#7c3aed)",
          color: "#fff",
          fontSize: "17px",
          fontWeight: "700",
          transition: "0.3s",
          boxShadow: "0 10px 25px rgba(37,99,235,.4)",
        }}
      >
        🚀 Start AI Interview
      </button>
    </form>
  );
}

export default CandidateForm;