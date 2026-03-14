import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VoiceAssistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef(null);

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();

      if (!token) {
        showPopup("Please login first");
        speak("Please login first");
        navigate("/");
        return;
      }

      if (transcript.includes("open home")) {
        showPopup("Opening Home Page...");
        speak("Opening home page");
        navigate("/home");
      }

      if (transcript.includes("open invoice")) {
        showPopup("Opening Invoice Page...");
        speak("Opening invoice page");
        navigate("/invoice");
      }
    };

    recognitionRef.current = recognition;
  }, [navigate, token]);

  const showPopup = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes("Female") ||
        voice.name.includes("Zira") ||
        voice.name.includes("Samantha")
    );

    if (femaleVoice) speech.voice = femaleVoice;

    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    if (!token) {
      showPopup("Please login first");
      speak("Please login first");
      navigate("/");
      return;
    }

    recognitionRef.current.start();
    showPopup("Listening...");
    speak("Listening. Please say a command");
  };

  // ❌ Hide AI on login/signup page
  if (!token || location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <button
        onClick={startListening}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 20px",
          borderRadius: "50px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        🎤 AI Assistant
      </button>

      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#333",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default VoiceAssistant;