import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Drawer,
} from "@mui/material";
import { MessageSquare, X,Clock } from "lucide-react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function SideNavbar({
  open,
  onClose,
  email,
  sessionId,
  setSessionId,
  setMessages,
  sessionsLoading: externalSessionsLoading,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const loading = externalSessionsLoading ?? sessionsLoading;
  const API_BASE_URL = process.env.REACT_APP_API_URL;



  // Fetch sessions from backend whenever email changes
  useEffect(() => {
    if (!email) return;

    const fetchSessions = async () => {
      setSessionsLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/sessions/${encodeURIComponent(email)}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.sessions)) {
          setSessions(data.sessions);
        } else {
          console.warn("Unexpected session format:", data);
          setSessions([]);
        }
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
        setSessions([]);
      } finally {
        setSessionsLoading(false);
      }
    };

    fetchSessions();
  }, [email]);

  const handleSessionClick = (sid) => {
    if (!email || !sid || sid === sessionId) return; // Don't do anything if clicking the same session
    setSessionId(sid); // Only set the session ID, let Dashboard handle message loading
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={isMobile ? onClose : undefined}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        width: open ? 260 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          ...(isMobile ? {
            height: '100%',
            top: 0,
            paddingTop: '64px'
          } : {
            height: '100%',
           
          }),
          background: "#EEEDE8",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          boxShadow: 'none',
          position: isMobile ? 'fixed' : 'relative',
        },
        '& .MuiBackdrop-root': {
          top: isMobile ? '64px' : '64px',
          display: isMobile ? undefined : 'none'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Clock size={18} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            History
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
        >
          <X size={18} />
        </IconButton>
      </Box>

      {/* Session List */}
      <List sx={{ overflowY: "auto", flexGrow: 1 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Box
              key={i}
              sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}
            >
              <Skeleton variant="circular" width={36} height={36} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </Box>
            </Box>
          ))
        ) : sessions.length === 0 ? (
          <Typography
            sx={{ textAlign: "center", p: 2, color: "#666", fontSize: 14 }}
          >
            No sessions yet
          </Typography>
        ) : (
          [...sessions]
            .map((session) => (
              <ListItem
                button
                key={session.session_id}
                selected={session.session_id === sessionId}
                onClick={() => {
                  handleSessionClick(session.session_id);
                }}
                sx={{
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <MessageSquare size={18} color="#555" />
                </ListItemIcon>
                <ListItemText
                  primary={session.title || "New Chat"}
                  secondary={
                    session.created_at
                      ? new Date(session.created_at).toLocaleString()
                      : ""
                  }
                  primaryTypographyProps={{ noWrap: true, fontSize: 14 }}
                />
              </ListItem>
            ))
        )}
      </List>
    </Drawer>
  );
}
