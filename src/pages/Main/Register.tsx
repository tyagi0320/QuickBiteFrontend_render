import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  Avatar, 
  Link, 
  Alert,
  CircularProgress
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;

    if (!email || !password || !firstName) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await AuthService.register({
        email,
        password,
        name: `${firstName} ${lastName}`.trim()
      });

      // ✅ UPDATED: Navigate to OTP verification page instead of Login
      // We pass the email in the state so the OTP page knows who to verify
      navigate('/verify-otp', { state: { email } });
      
    } catch (err: any) {
      const serverMsg = err.response?.data?.detail || "Registration failed.";
      setError(typeof serverMsg === 'string' ? serverMsg : "Invalid data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f4f7f9' }}>
      <Container maxWidth="xs">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 4, 
            textAlign: 'center',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' 
          }}
        >
          <Avatar sx={{ m: '0 auto', bgcolor: '#1976d2', width: 60, height: 60, mb: 2 }}>
            <PersonAddAlt1Icon sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography variant="h4" sx={{ fontWeight: 800, color: '#222' }}>
            Sign Up
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 4, mt: 1 }}>
            Create your account to get started
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              name="firstName"
              label="First Name"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              autoFocus
            />
            <TextField
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              name="email"
              label="Email Address"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              autoComplete="email"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                mt: 4, 
                mb: 3, 
                py: 1.8, 
                borderRadius: 2, 
                fontSize: '1rem', 
                fontWeight: 700,
                textTransform: 'none',
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>

            <Typography variant="body2" sx={{ color: '#666' }}>
              Already have an account?{' '}
              <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer', color: '#1976d2', fontWeight: 700, textDecoration: 'none' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
