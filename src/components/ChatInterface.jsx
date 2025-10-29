import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Skeleton, CircularProgress } from "@mui/material";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
export default function ChatInterface({ messages, onSendMessage, messagesLoading = false, isTyping = false }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, messagesLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  

  return (
    <Box sx={{ 
      flex: 1, 
      display: "flex", 
      flexDirection: "column", 
      height: { xs: "calc(100vh - 64px)", sm: "100%" }, 
      bgcolor: "#F9F9F6",
      position: "relative"
    }}>
      
      {/* Chat messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pb: { xs: "70px", sm: "initial" }, // Add padding at bottom for mobile to prevent message hiding behind input
        }}>
      
        {messagesLoading ? (
          // show skeleton placeholders while loading
          Array.from({ length: 3 }).map((_, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="60%" />
                <Skeleton width="90%" />
              </Box>
            </Box>
          ))
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area fixed */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          gap: 1,
          alignItems: "center",
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          position: { xs: "fixed", sm: "sticky" },
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          boxShadow: { xs: "0 -2px 8px rgba(0,0,0,0.05)", sm: "none" }
        }}
      >
     <TextField
  fullWidth
  variant="outlined"
  placeholder="Type your Query"
  value={input}
  onChange={(e) => setInput(e.target.value)}
 
  sx={{
    backgroundColor: "white",
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#7E7963",
      },
      "&:hover fieldset": {
        borderColor: "#7E7963",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7E7963",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: { xs: "15px", sm: "16px" },
      lineHeight: { xs: "1.4", sm: "1.5" }
    }
  }}
/>

        <IconButton type="submit"  color="#7E7963" disabled={!input.trim()} sx={{ height: 56, width: 56,}}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
}
