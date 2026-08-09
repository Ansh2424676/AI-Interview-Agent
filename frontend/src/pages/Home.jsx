import { motion } from "framer-motion";
import { FaRobot, FaBrain } from "react-icons/fa";
import CandidateForm from "../components/CandidateForm";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a,#312e81)",
          padding: "30px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            width: "100%",
            maxWidth: "700px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "22px",
            padding: "45px",
            boxShadow: "0 25px 60px rgba(0,0,0,.35)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <FaRobot
              size={70}
              color="#60a5fa"
            />

            <h1
              style={{
                marginTop: "15px",
                color: "#fff",
                fontSize: "38px",
                fontWeight: "700",
              }}
            >
              AI Interview Agent
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "12px",
                fontSize: "17px",
              }}
            >
              Smart AI-powered Interview Platform
            </p>

            <div
              style={{
                marginTop: "18px",
                display: "inline-flex",
                gap: "10px",
                background: "#2563eb",
                padding: "10px 20px",
                borderRadius: "40px",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              <FaBrain />
              FastAPI • React • Ollama
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <CandidateForm />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Home;