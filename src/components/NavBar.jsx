import React from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Tooltip } from "@mui/material";
import { Plus, Upload, LogOut, ChartNoAxesGantt } from "lucide-react";
import aimedicisLogo from "../assets/image.png";

export default function Navbar({ onNewChat, onLogout, onToggleHistory, showHistory = false }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        color: "#333",
        zIndex: 1201,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Toolbar
        sx={{
          height: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={onToggleHistory}
            size="small"
            sx={{
              color: showHistory ? "#7E7963" : "#666",
              bgcolor: showHistory ? "rgba(126,121,99,0.1)" : "transparent",
              '&:hover': { bgcolor: "rgba(126,121,99,0.1)" },
              borderRadius: 2,
              padding: 1
            }}
          >
            <ChartNoAxesGantt size={22} />
          </IconButton>
          <img src={aimedicisLogo} alt="AIMedicis" style={{ height: "40px", width:"20vh" }} />
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="New Chat" arrow>
          <Button
            onClick={onNewChat}
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              color: "#fff",
              bgcolor: "#7E7963",
              border: "none",
              '&:hover': { bgcolor: '#6f695a' },
              borderRadius: 3,
              minWidth: 0,
              px: { xs: 1, sm: 2 },
            }}
          >
            <Plus />
            <Box sx={{ display: { xs: 'none', sm: 'inline' }, ml: 1 }}>New Chat</Box>
          </Button>
           </Tooltip>
           <Tooltip title="Upload File" arrow>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              color: "#fff",
              bgcolor: "#7E7963",
              border: "none",
              '&:hover': { bgcolor: '#6f695a' },
              borderRadius: 3,
              minWidth: 0,
              px: { xs: 1, sm: 2 },
            }}
          >
            <Upload />
            <Box sx={{ display: { xs: 'none', sm: 'inline' }, ml: 1 }}>Upload</Box>
          </Button>
          </Tooltip>
          <Tooltip title="Logout" arrow>
          <Button
            onClick={onLogout}
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              color: "#fff",
              bgcolor: "#7E7963",
              border: "none",
              '&:hover': { bgcolor: '#6f695a' },
              borderRadius: 3,
              minWidth: 0,
              px: { xs: 1, sm: 2 },
            }}
          >
            <LogOut />
            <Box sx={{ display: { xs: 'none', sm: 'inline' }, ml: 1 }}>Logout</Box>
          </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
