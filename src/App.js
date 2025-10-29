import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider, UserContext } from "./UserContext";
import LoginDialog from "./components/LoginDialog";
import Dashboard from "./Dashboard";
import Welcomepage from "./Welcomepage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="/login" element={<LoginDialog open={true} />} />
          <Route path="/chat" element={<DashboardWithBackend />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

function DashboardWithBackend() {
  const { email, sessionId, setSessionId } = useContext(UserContext);

  // ✅ Automatically generate session if missing
  React.useEffect(() => {
    if (!sessionId) {
      // If a session id was stored in localStorage by login flow, use it first
      const stored = localStorage.getItem("session_id");
      if (stored) {
        setSessionId(stored);
      } else {
        const newSession = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setSessionId(newSession);
      }
    }
  }, [sessionId, setSessionId]);

  const sendQueryToBackend = async (query, currentSessionId) => {
    try {
      const response = await fetch("https://aimedicis-backend.onrender.com/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          email,
          session_id: currentSessionId || sessionId, // Use provided session ID or fallback
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Server ${response.status}: ${errText}`);
      }

      const data = await response.json();
      console.log("✅ Backend response:", data);

      return {
        summary: data.summary || null,
        message: data.message || null,
      };
    } catch (error) {
      console.error("🚨 Error connecting to backend:", error);
      return { message: "⚠️ Unable to connect to the server." };
    }
  };

  return <Dashboard sendQueryToBackend={sendQueryToBackend} />;
}

export default App;
