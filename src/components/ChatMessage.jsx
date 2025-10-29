import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const isAI = message.role === "assistant" || message.sender === "ai";

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: isAI ? "row" : "row-reverse", 
        gap: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 0 }
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: isAI ? "#F0DFF3" : "#DDEBF8",
          color: "#fff",
          width: { xs: 32, sm: 40 },
          height: { xs: 32, sm: 40 },
          flexShrink: 0
        }}
      >
        {isAI ? <Bot size={18} color="#555" /> : <User size={18} color="#7E7963" />}
      </Avatar>

      {/* Message */}
      <Box
        sx={{
          maxWidth: { xs: "85%", sm: "75%" },
          minWidth: { xs: "50%", sm: "auto" },
          bgcolor: isAI ? "white" : "#D4D3CA",
          color: "black",
          px: { xs: 1.5, sm: 2 },
          py: { xs: 1, sm: 1.5 },
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          wordBreak: "break-word",
        }}
      >
        {/* Markdown-rendered text */}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1,
                  fontSize: { xs: '0.9rem', sm: '0.875rem' },
                  lineHeight: { xs: 1.4, sm: 1.5 }
                }} 
                {...props} 
              />
            ),
            h1: ({ node, ...props }) => (
              <Typography 
                variant="h6" 
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  fontWeight: 600
                }} 
                {...props} 
              />
            ),
            h2: ({ node, ...props }) => (
              <Typography 
                variant="subtitle1" 
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 600
                }} 
                {...props} 
              />
            ),
            li: ({ node, ...props }) => (
              <li 
                style={{ 
                  marginLeft: "1rem", 
                  fontSize: window.innerWidth < 600 ? "0.85rem" : "0.9rem",
                  lineHeight: window.innerWidth < 600 ? 1.4 : 1.5
                }} 
                {...props} 
              />
            ),
            code: ({ inline, ...props }) =>
              inline ? (
                <code
                  style={{
                    background: "#f5f5f5",
                    padding: window.innerWidth < 600 ? "1px 3px" : "2px 4px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: window.innerWidth < 600 ? "0.85rem" : "0.9rem",
                  }}
                  {...props}
                />
              ) : (
                <pre
                  style={{
                    background: "#f5f5f5",
                    padding: window.innerWidth < 600 ? "8px" : "10px",
                    borderRadius: "6px",
                    overflowX: "auto",
                    fontFamily: "monospace",
                    fontSize: window.innerWidth < 600 ? "0.8rem" : "0.9rem",
                  }}
                >
                  <code {...props} />
                </pre>
              ),
          }}
        >
          {message.content || message.text}
        </ReactMarkdown>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            opacity: 0.6,
            textAlign: isAI ? "left" : "right",
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
         hour: "2-digit",
         minute: "2-digit",
  })}
        </Typography>
      </Box>
    </Box>
  );
}
