import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Mail, ArrowRight } from "lucide-react";
import { UserContext} from "../UserContext";

const LoginDialog = ({ open, onOpenChange }) => {
  const [email, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { setEmail, createNewSession, setExistingSession } = useContext(UserContext);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL;



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;

    // mark as loading to disable the button and prevent double submits
    setLoading(true);

    try {
      // First set the email
      setEmail(email);

      // Try creating a session on the backend
      const res = await fetch(`${API_BASE_URL}/new-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let sessionId;
      if (res.ok) {
        const data = await res.json();
        if (data?.session_id) {
          sessionId = data.session_id;
        }
      }

      // If we didn't get a session ID from the backend, create one locally
      if (!sessionId) {
        sessionId = createNewSession();
      }

      // Set the session ID
      setExistingSession(sessionId);

      // Navigate to chat
      navigate("/chat");
    } catch (err) {
      console.error("Failed to create session on login:", err);
      // Create a fallback session
      const fallbackSessionId = createNewSession();
      setExistingSession(fallbackSessionId);
      navigate("/chat");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => navigate("/")}

      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 2 },
      }}
    >
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <DialogTitle sx={{ p: 0, mb: 1, fontSize: "1.5rem", fontWeight: 700 }}>
            Welcome to AIMedicis
          </DialogTitle>
          <DialogContentText sx={{ color: "#7E7963" }}>
            Enter your email to access AI-powered healthcare insights
          </DialogContentText>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography
              component="label"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Mail size={16} />
              Email Address
            </Typography>
            <TextField
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              autoFocus
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  "&:hover fieldset": {
                    borderColor: "#7E7963",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7E7963",
                  },
                },
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              height: "48px",
              fontWeight: 600,
              textTransform: "none",
              bgcolor: "#7E7963",
              fontSize: "1rem",
              "& .arrow-icon": {
                transition: "transform 0.2s ease",
              },
              "&:hover .arrow-icon": {
                transform: "translateX(4px)",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                Continue
                <CircularProgress size={16} color="inherit" style={{ marginLeft: 8 }} />
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={16} className="arrow-icon" style={{ marginLeft: "8px" }} />
              </>
            )}
          </Button>
        </form>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: "text.secondary",
            mt: 3,
          }}
        >
          By continuing, you agree to AIMedicis' Terms of Service and Privacy Policy
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
