import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ messages }) {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {messages.map((msg, idx) => (
        <ListItem
          key={idx}
          sx={{
            justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            alignItems: "flex-start",
            display: "flex",
            flexDirection: msg.sender === "user" ? "row-reverse" : "row",
            gap: 1.5,
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              bgcolor: msg.sender === "ai" ? "#F0DFF3" : "#DDEBF8",
              width: 40,
              height: 40,
            }}
          >
            {msg.sender === "ai" ? (
              <Bot size={20} color="#555" />
            ) : (
              <User size={20} color="#7E7963" />
            )}
          </Avatar>

          {/* Message Bubble */}
          <ListItemText
            primary={
              msg.sender === "ai" ? (
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    maxWidth: "75%",
                    color: "black",
                  }}
                >
                  <ReactMarkdown
                    children={msg.text}
                    components={{
                      p: ({ node, ...props }) => (
                        <Typography
                          {...props}
                          sx={{
                            mb: 1,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        />
                      ),
                      code: ({ node, inline, ...props }) => (
                        <Box
                          component="code"
                          sx={{
                            backgroundColor: "#eee",
                            p: "2px 4px",
                            borderRadius: "4px",
                            fontFamily: "monospace",
                            display: "inline-block",
                          }}
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          style={{
                            marginLeft: "1rem",
                            whiteSpace: "pre-wrap",
                            marginBottom: "0.25rem",
                          }}
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          style={{
                            paddingLeft: "1.2rem",
                            marginTop: "0.25rem",
                            marginBottom: "0.5rem",
                            listStyleType: "disc",
                          }}
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          style={{
                            paddingLeft: "1.2rem",
                            marginTop: "0.25rem",
                            marginBottom: "0.5rem",
                            listStyleType: "decimal",
                          }}
                          {...props}
                        />
                      ),
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    bgcolor: "#D4D3CA",
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    maxWidth: "75%",
                    color: "black",
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              )
            }
            secondary={
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 0.5,
                  opacity: 0.6,
                  textAlign: msg.sender === "ai" ? "left" : "right",
                }}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
