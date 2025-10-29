import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(localStorage.getItem("user_email") || "");
  const [sessionId, setSessionId] = useState(localStorage.getItem("session_id") || "");

  // Save email persistently
  const saveEmail = (value) => {
    setEmail(value);
    localStorage.setItem("user_email", value);
  };

  // ✅ Create new session ID (for new login or "New Chat")
  const createNewSession = () => {
    const newSession = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    localStorage.setItem("session_id", newSession);
    setSessionId(newSession);
    return newSession;
  };

  // ✅ Set existing session ID (when opening from history)
  const setExistingSession = (existingId) => {
    setSessionId(existingId);
    localStorage.setItem("session_id", existingId);
  };

  // ✅ Logout handler (clears user data)
  const clearUserData = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("session_id");
    setEmail("");
    setSessionId("");
  };

  return (
    <UserContext.Provider
      value={{
        email,
        sessionId,
        setEmail: saveEmail,
        createNewSession,
        setExistingSession,
        clearUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
