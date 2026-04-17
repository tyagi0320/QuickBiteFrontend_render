import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Container, TextField, Typography, 
  Paper, Avatar, Alert, CircularProgress, Stack 
} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';

const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Retrieve email from Register.tsx state

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const MID_NAVY = '#1B3B5F';

  // Countdown timer for Resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Redirect if no email is found (user accessed page directly)
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await AuthService.verifyOtp(email, otp);
      setSuccess("Email verified successfully! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await AuthService.resendOtp(email);
      setSuccess("A new OTP has been sent to your email.");
      setResendTimer(60); // Reset timer
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to resend OTP.");
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', bgcolor: '#f4f7f9' }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: 'center', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
          
          <Avatar sx={{ m: '0 auto', bgcolor: MID_NAVY, width: 60, height: 60, mb: 2 }}>
            <MarkEmailReadIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography variant="h4" sx={{ fontWeight: 800, color: '#222' }}>Verify Email</Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 3, mt: 1 }}>
            We've sent a 6-digit code to <br /> <strong>{email}</strong>
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleVerify}>
            <TextField
              fullWidth
              label="6-Digit Code"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              slotProps={{ htmlInput:{maxLength: 6, style: { textAlign: 'center', letterSpacing: '8px', fontSize: '20px', fontWeight: 'bold' }} }}
              required
              disabled={loading}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || otp.length !== 6}
              sx={{ bgcolor: MID_NAVY, py: 1.5, borderRadius: 2, fontWeight: 700, '&:hover': { bgcolor: '#142d4a' } }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Proceed"}
            </Button>
          </Box>

          <Stack sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Didn't receive the code?
            </Typography>
            <Button 
              onClick={handleResend} 
              disabled={resendTimer > 0} 
              sx={{ textTransform: 'none', color: MID_NAVY, fontWeight: 700 }}
            >
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP Now"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyOTP;
