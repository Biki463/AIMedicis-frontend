import React from "react";
import { Box } from "@mui/material";

export default function TypingIndicator() {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ display: "flex", alignItems: "center", gap: 1, px: 6 }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            bgcolor: "rgba(0,0,0,0.3)",
            borderRadius: "50%",
            animation: `typingBounce 1.2s ${i * 0.14}s infinite ease-in-out`,
            "@keyframes typingBounce": {
              "0%, 80%, 100%": { transform: "translateY(0)", opacity: 0.3 },
              "40%": { transform: "translateY(-6px)", opacity: 1 },
            },
          }}
        />
      ))}
    </Box>
  );
}
