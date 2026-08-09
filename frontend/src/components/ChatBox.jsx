function ChatBox({ question }) {
  return (
    <div className="chat">
      <strong>AI Interviewer</strong>
      <p style={{marginTop:"10px"}}>{question}</p>
    </div>
  );
}

export default ChatBox;