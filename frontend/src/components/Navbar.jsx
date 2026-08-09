import { FaRobot, FaGithub } from "react-icons/fa";

function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "70px",
        background: "rgba(15,23,42,.85)",
        backdropFilter: "blur(15px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#fff",
          fontWeight: "700",
          fontSize: "22px",
        }}
      >
        <FaRobot color="#60a5fa" size={28} />
        AI Interview Agent
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          color: "#cbd5e1",
          fontSize: "15px",
        }}
      >
        <span>FastAPI</span>
        <span>React</span>
        <span>Ollama</span>

        <a
          href="https://github.com/Ansh2424676/AI-Interview-Agent"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#2563eb",
            padding: "10px 18px",
            borderRadius: "10px",
            fontWeight: "600",
          }}
        >
          <FaGithub />
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;