import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  Brain,
  Network,
  Activity,
  Sparkles,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import aimedicisLogo from "./assets/image.png";
import LoginDialog from "./components/LoginDialog";

const WelcomePage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Research",
      description:
        "Leverage cutting-edge generative AI for comprehensive healthcare insights and analysis",
      color: "primary",
    },
    {
      icon: Network,
      title: "Multi-Agent System",
      description:
        "Collaborate with specialized AI agents working together for comprehensive analysis",
      color: "secondary",
    },
    {
      icon: Sparkles,
      title: "Deep Insights",
      description:
        "Uncover patterns and actionable insights from complex healthcare data",
      color: "info",
    },
  ];

  const benefits = [
    "Real-time data processing and analysis",
    "Evidence-based insights from multiple sources",
    "Collaborative multi-agent intelligence",
    "Secure and compliant healthcare data handling",
  ];

  const agents = [
    { label: "AI Agent Active", text: "Analyzing patient outcomes...", delay: 0 },
    { label: "Research Agent", text: "Processing clinical data...", delay: 0.5 },
    { label: "Insight Generator", text: "Generating recommendations...", delay: 1 },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F9F9F6", }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#F9F9F6",
          borderBottom: 1,
          borderColor: "divider",
          backdropFilter: "blur(18px)",
          borderRadius: { xs: 0, sm: 2 }
        }}
      >
        <Toolbar 
          sx={{ 
            width: "auto", 
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: '64px', sm: '70px' }
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center",
              height: { xs: '40px', sm: '45px' }
            }}
          >
            <img 
              src={aimedicisLogo} 
              alt="AIMedicis" 
              style={{  
                width: "clamp(120px, 20vw, 200px)",
                maxHeight: "7vh",
                objectFit: "contain"
              }} 
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => setIsLoginOpen(true)}
            sx={{ 
              textTransform: "none",
              bgcolor: "#7E7963",
              borderRadius: 2,
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              marginLeft: 'auto',
              flexShrink: 0,
              minWidth: { xs: '80px', sm: '100px' },
              '&:hover': {
                bgcolor: '#6B6754'
              }
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {/* Animated background */}
        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden",zIndex: -1 }}>
          <Box
            sx={{
      position: "absolute",
      top: 80,
      left: 80,
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: "radial-gradient(circle at 30% 30%, rgba(126,121,99,0.25), rgba(126,121,99,0.05) 70%)",
      filter: "blur(120px)",
      opacity: 0.7,
      animation: "float 8s ease-in-out infinite",
      mixBlendMode: "soft-light",
      "@keyframes float": {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-25px)" },
      },
    }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 80,
              right: 80,
              width: 384,
              height: 384,
              bgcolor: "#7E7963",
              opacity: 0.1,
              borderRadius: "50%",
              filter: "blur(96px)",
              animation: "float 6s ease-in-out infinite",
              animationDelay: "2s",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 256,
              height: 256,
              bgcolor: "#7E7963",
              opacity: 0.1,
              borderRadius: "50%",
              filter: "blur(96px)",
              animation: "float 6s ease-in-out infinite",
              animationDelay: "4s",
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10, pt: 10, pb: 16 }}>
          <Box sx={{ textAlign: "center", maxWidth: "900px", mx: "auto" }}>
            <Chip
              icon={<Sparkles size={16} />}
              label="Next-Generation Healthcare AI"
              sx={{
                mb: 3,
                bgcolor: "#EDECE7",
                color: "#7E7963",
                opacity: 0.9,
                border: 1,
                borderColor: "#7E7963",
                padding: "20px 20px",
                borderRadius: 4,
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.75rem", lg: "4.5rem" },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.2,
                color:"#333333"
              }}
            >
              Generative AI for Health
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "text.secondary",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Unlocking Insights with Deep Research and Multiple Agents
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                mb: 6,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => setIsLoginOpen(true)}
                sx={{
                  fontSize: "1.125rem",
                  px: 4,
                  height: 56,
                  bgcolor:"#7E7963",
                  borderRadius:2,
                  textTransform: "none",
                  "& .chevron-icon": {
                    transition: "transform 0.2s ease",
                  },
                  "&:hover .chevron-icon": {
                    transform: "translateX(4px)",
                  },
                }}
              >
                Get Started
                <ChevronRight size={20} className="chevron-icon" style={{ marginLeft: "8px" }} />
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  fontSize: "1.125rem",
                  px: 4,
                  height: 56,
                  borderColor: "#7E7963",
                  borderRadius:2,
                  borderWidth: 2,
                  color: "#7E7963",
                  textTransform: "none",
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Learn More
              </Button>
            </Box>

            {/* Floating icons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 8 }}>
              <Box sx={{ animation: "float 6s ease-in-out infinite", opacity: 0.3 }}>
                <Brain size={48} color="currentColor" style={{ color: "#7E7963" }} />
              </Box>
              <Box
                sx={{
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: "1s",
                  opacity: 0.3,
                }}
              >
                <Network size={48} color="currentColor" style={{ color: "#7E7963" }} />
              </Box>
              <Box
                sx={{
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: "2s",
                  opacity: 0.3,
                }}
              >
                <Activity size={48} color="currentColor" style={{ color: "#7E7963" }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: "action.hover" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Typography variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                color:"#333333",
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Powerful AI-Driven Insights
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "text.secondary", 
                maxWidth: "600px", 
                mx: "auto",
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              Leverage cutting-edge technology to transform healthcare research and decision-making
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 4 },
              alignItems: 'stretch',
              justifyContent: 'center',
              px: { xs: 2, sm: 4, md: 0 }
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  flex: { xs: '1', md: '1 1 0' },
                  minWidth: { md: 0 },
                  maxWidth: { xs: '100%', sm: '450px', md: '33%' },
                  mx: 'auto',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: (theme) => `0 8px 24px ${theme.palette.action.hover}`,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: { xs: 48, md: 56 },
                      height: { xs: 48, md: 56 },
                      borderRadius: 3,
                      bgcolor: (theme) => theme.palette[feature.color]?.main || "primary.main",
                      opacity: 0.15,
                      mb: 3,
                    }}
                  >
                    <feature.icon size={28} />
                  </Box>

                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1.5, 
                      color: "#333333",
                      fontSize: { xs: '1.125rem', md: '1.25rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
     <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#fafafa",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ---------- LEFT CONTENT ---------- */}
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 500 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "#2c2c2c",
                  lineHeight: 1.2,
                }}
              >
                Transform Your Healthcare Research
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Experience the power of AI-driven analysis with our intelligent platform built for healthcare professionals.
              </Typography>

              <Box sx={{ mb: 4 }}>
                {benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <CheckCircle
                      size={22}
                      color="#7E7963"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <Typography variant="body1" sx={{ color: "#444" }}>
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={() => setIsLoginOpen(true)}
                sx={{
                  fontSize: "1.1rem",
                  px: 4,
                  height: 56,
                  textTransform: "none",
                  bgcolor: "#7E7963",
                  "&:hover": { bgcolor: "#6f695a" },
                  borderRadius: 3,
                }}
              >
                Start Your Journey
              </Button>
            </Box>
          </Grid>

          {/* ---------- RIGHT FLOATING CONTAINER ---------- */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: { xs: 6, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                left: { md: "-10%" }, // ✅ pulls the right box slightly left
                top: { md: "-30px" }, // ✅ adds subtle vertical offset
                background: "linear-gradient(135deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))",
                borderRadius: 5,
                p: 5,
                width: "100%",
                maxWidth: 520,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {agents.map((agent, index) => (
                  <Card
                    key={index}
                    sx={{
                      borderRadius: 3,
                      boxShadow: 2,
                      borderLeft: `5px solid ${
                        index === 0
                          ? "#1976d2"
                          : index === 1
                          ? "#9c27b0"
                          : "#0288d1"
                      }`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {agent.label}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#333" }}>
                        {agent.text}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, rgba(25, 118, 210, 0.1), rgba(156, 39, 176, 0.1))",
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: "#333333" }}>
            Ready to Unlock Healthcare Insights?
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
            Join researchers and healthcare professionals using AI to drive better outcomes
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setIsLoginOpen(true)}
            sx={{
              fontSize: "1.125rem",
              px: 5,
              height: 56,
              bgcolor:"#7E7963",
              textTransform: "none",
              "& .chevron-icon": {
                transition: "transform 0.2s ease",
              },
              "&:hover .chevron-icon": {
                transform: "translateX(4px)",
              },
            }}
          >
            Get Started Now
            <ChevronRight size={20} className="chevron-icon" style={{ marginLeft: "8px", }} />
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", borderTop: 1, borderColor: "divider", py: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 2, md: 0 } }}>
              <img src={aimedicisLogo} alt="AIMedicis" style={{ height: "7vh", width: "auto" }} />
             
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              © 2025 AIMedicis. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>

      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </Box>
  );
};

export default WelcomePage;