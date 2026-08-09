import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(
    location.state?.question || ""
  );

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {
    if (answer.trim() === "") {
      alert("Please enter your answer.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/api/interview", {
        sessionId: location.state.sessionId,
        message: answer,
      });

      if (response.data.done) {
        navigate("/result", {
          state: {
            feedback: response.data.feedback,
          },
        });
      } else {
        setQuestion(response.data.reply);
        setAnswer("");
      }
    } catch (err) {
      console.log(err);
      alert("Backend Error");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a,#312e81)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: "100%",
            maxWidth: "850px",
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(18px)",
            borderRadius: "25px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,.35)",
          }}
        >
          <h1
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <FaRobot color="#60a5fa" />
            AI Technical Interview
          </h1>

          <div
            style={{
              marginTop: "25px",
              background: "#1e293b",
              borderRadius: "15px",
              padding: "25px",
            }}
          >
            <h3 style={{ color: "#60a5fa" }}>
              Current Question
            </h3>

            <p
              style={{
                color: "#fff",
                marginTop: "12px",
                lineHeight: "1.7",
                fontSize: "17px",
              }}
            >
              {question}
            </p>
          </div>

          <textarea
            rows="8"
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              width: "100%",
              marginTop: "30px",
              borderRadius: "15px",
              padding: "18px",
              fontSize: "16px",
              border: "none",
              background: "#0f172a",
              color: "#fff",
              resize: "none",
            }}
          />

          <button
            onClick={submitAnswer}
            disabled={loading}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "15px",
              background:
                "linear-gradient(90deg,#2563eb,#7c3aed)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {loading ? "Generating Next Question..." : (
              <>
                <FaPaperPlane /> Next Question
              </>
            )}
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default Interview;