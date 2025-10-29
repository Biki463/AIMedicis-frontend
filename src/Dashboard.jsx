// Dashboard.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import Navbar from "./components/NavBar";
import SideNavbar from "./components/SideNavbar";
import ChatInterface from "./components/ChatInterface";
import LoadingOverlay from "./components/LoadingOverlay";
import { Box } from "@mui/material";
import { UserContext } from "./UserContext";

export default function Dashboard({ sendQueryToBackend }) {
  const { email, sessionId, setExistingSession } = useContext(UserContext);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm your health assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 600);

  const handleToggleHistory = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // ----------------------------
  // Fetch sessions for the user
  // ----------------------------
  const fetchSessions = async () => {
    if (!email) return;
    setSessionsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/sessions/${encodeURIComponent(email)}`
      );
      const data = await res.json();
      const userSessions = data.sessions || [];

      // Sort newest first by updated_at (fallback to created_at)
      const sorted = userSessions.sort((a, b) => {
        const ta = new Date(a.updated_at || a.created_at || 0).getTime();
        const tb = new Date(b.updated_at || b.created_at || 0).getTime();
        return tb - ta;
      });

      setSessions(sorted);
      return sorted;
    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setSessionsLoading(false);
    }
  };

  // Load sessions when email changes
  useEffect(() => {
    fetchSessions();
  }, [email]);

  // Handle auto-selecting the most recent session
  useEffect(() => {
    if (!sessionId && sessions.length > 0) {
      setExistingSession(sessions[0].session_id);
    }
  }, [sessions, sessionId, setExistingSession]);

  // ----------------------------
  // Load messages when session changes
  // ----------------------------
  useEffect(() => {
    if (!email || !sessionId) {
      setMessages([]); // Clear messages if no email or sessionId
      return;
    }

    let isCurrentRequest = true; // For handling race conditions

    const loadMessages = async () => {
      try {
        setMessagesLoading(true);
        
        const res = await fetch(
          `http://localhost:8000/sessions/${encodeURIComponent(email)}/${encodeURIComponent(
            sessionId
          )}/messages`
        );
        const data = await res.json();
        
        if (!isCurrentRequest) return;

        // The backend returns messages array directly
        if (Array.isArray(data)) {
          const uiMessages = data.map((m, idx) => ({
            ...m,
            id: m.id || `${m.timestamp}-${idx}`,
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
          }));
          // If there are messages, show them. Otherwise keep the welcome message
          if (uiMessages.length > 0) {
            setMessages(uiMessages);
          } else {
            setMessages([{
              role: "assistant",
              content: "Hi, I'm your health assistant. How can I help you today?",
              timestamp: new Date(),
              id: 'welcome-message'
            }]);
          }
        } else {
          console.warn("Unexpected message format:", data);
          setMessages([]);
        }
      } catch (err) {
        if (!isCurrentRequest) return;
        console.error("Failed to load messages:", err);
        setMessages([]);
      } finally {
        if (isCurrentRequest) setMessagesLoading(false);
      }
    };

    loadMessages();

    // Cleanup function to handle component unmount or sessionId change
    return () => {
      isCurrentRequest = false;
    };
  }, [email, sessionId]);

  // ----------------------------
  // Send message (new or existing session)
  // ----------------------------



  
  const handleSendMessage = async (text) => {
    if (!text || !text.trim()) return;
    
    // Ensure we have a valid session
    if (!sessionId) {
      console.error("No session ID available");
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    // Add user message to UI
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send message with current session ID
      setIsTyping(true);
      const response = await sendQueryToBackend(text, sessionId);

      // Handle the response
      const botText = response?.summary || 
                     response?.message || 
                     (typeof response === "string" ? response : JSON.stringify(response, null, 2));

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: botText,
        timestamp: new Date(),
      };

      // Update messages in current session
      setMessages((prev) => [...prev, botMessage]);
      
      // Always refresh sessions to get latest state
      await fetchSessions();
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "⚠️ Error: Unable to connect to server.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };


  
  // ----------------------------
  // New Chat (creates session when first message sent)
  // ----------------------------
  const handleNewChat = async () => {
    try {
      // Generate a new session ID
      const tempSessionId = `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      
      // Create new session on backend
      const res = await fetch("http://localhost:8000/new-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          session_id: tempSessionId 
        }),
      });

      const data = await res.json();

      if (data.session_id) {
        const newSessionId = data.session_id;
        
        // First update the sessions list
        await fetchSessions();
        
        // Now update the session ID
        setExistingSession(newSessionId);
        
        // Set welcome message after session update
        setTimeout(() => {
          setMessages([
            {
              id: Date.now(),
              role: "assistant",
              content: "Hi, I'm your health assistant. How can I help you today?",
              timestamp: new Date(),
            },
          ]);
        }, 0);
        
        console.log("✅ New session created:", newSessionId);
      } else {
        console.warn("⚠️ Failed to create new session:", data);
      }
    } catch (err) {
      console.error("Error creating new session:", err);
      setMessages([
        {
          id: Date.now(),
          sender: "ai",
          text: "⚠️ Error creating new session. Please try again.",
          timestamp: new Date(),
        },
      ]);
    }
  };


  // ----------------------------
  // Logout
  // ----------------------------
  const handleLogout = () => {
    localStorage.removeItem("user_email");
    window.location.href = "/";
  };

  // ----------------------------
  // Render guard
  // ----------------------------
  if (!email) {
    return <Box sx={{ p: 4 }}>⚠️ No user logged in. Please login first.</Box>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar 
        onNewChat={handleNewChat} 
        onLogout={handleLogout}
        onToggleHistory={handleToggleHistory}
        showHistory={sidebarOpen}
      />

      <Box
        sx={{
          flex: 1,
          mt: "64px",
          display: "flex",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <SideNavbar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          email={email}
          sessionId={sessionId}
          setSessionId={(sid) => setExistingSession(sid)}
          setMessages={setMessages}
          sessionsLoading={sessionsLoading}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#EEEDE8",
            height: "100%",
            transition: theme => theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
           
          }}
        >
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              messagesLoading={messagesLoading}
              isTyping={isTyping}
            />
            <LoadingOverlay open={messagesLoading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
