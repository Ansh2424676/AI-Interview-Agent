import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaRedo,
} from "react-icons/fa";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const feedback = location.state?.feedback;

  if (!feedback) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>No Result Available</h1>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 20,
            padding: "15px 35px",
            border: "none",
            borderRadius: 10,
            background: "#2563eb",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#312e81)",
        padding: "40px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(20px)",
            borderRadius: 25,
            padding: 40,
            color: "white",
            boxShadow: "0 25px 60px rgba(0,0,0,.4)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <FaCheckCircle
              color="#22c55e"
              size={70}
            />

            <h1 style={{ marginTop: 20 }}>
              Interview Completed
            </h1>

            <p style={{ color: "#cbd5e1" }}>
              AI Generated Performance Report
            </p>
          </div>

          {/* Score Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
              marginTop: 40,
            }}
          >
            <Card
              title="Overall Score"
              value={feedback.overall_score + "/10"}
            />

            <Card
              title="Performance"
              value={feedback.performance}
            />

            <Card
              title="Recommendation"
              value={feedback.recommendation}
            />
          </div>

          {/* Strengths */}

          <Section
            title="💪 Strengths"
            items={feedback.strengths}
          />

          {/* Gaps */}

          <Section
            title="📚 Areas To Improve"
            items={feedback.gaps}
          />

          {/* Next */}

          <Section
            title="🚀 Next Steps"
            items={feedback.next_steps}
          />

          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              marginTop: 35,
              padding: 18,
              border: "none",
              borderRadius: 15,
              background:
                "linear-gradient(90deg,#2563eb,#7c3aed)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            <FaRedo /> Start New Interview
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: 25,
        borderRadius: 18,
        textAlign: "center",
      }}
    >
      <FaStar color="#fbbf24" size={28} />

      <h3
        style={{
          marginTop: 10,
          color: "#94a3b8",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          marginTop: 10,
        }}
      >
        {value}
      </h2>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div
      style={{
        marginTop: 35,
      }}
    >
      <h2>{title}</h2>

      <div
        style={{
          background: "#1e293b",
          marginTop: 15,
          padding: 20,
          borderRadius: 15,
        }}
      >
        {items.map((item, i) => (
          <p key={i} style={{ margin: 12 }}>
            <FaArrowRight
              color="#60a5fa"
            />{" "}
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Result;