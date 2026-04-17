 import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { TokenService } from '../../services/TokenService';
import { AuthService } from '../../services/AuthService';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg,setErrMsg]=useState('')
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const validate = () => {
    const newErrors: Record<string, string> = {};
 
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    } else if (!formData.email.endsWith('@admin.com')) {
      newErrors.email = 'Admin email must end with @admin.com';
    }
 
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
 
const handleSubmit = async (e:any) => {
  e.preventDefault();
 
  if (!validate()) return;
   try{
      let data= await AuthService.login(formData.email,formData.password)
      TokenService.setToken(data.access_token);
      let decode=TokenService.decodeToken();
      if(decode?.role=="admin"){
         navigate("dashboard")
      }
      else{
        setErrMsg("You are not admin !")
      }


   }
   catch(err){
    setErrMsg("Enter correct email or password !")
   }
 
   
};
 
 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #141E30, #243B55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
 
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
 
            <Avatar
              sx={{
                mb: 1,
                bgcolor: 'error.main',
                width: 56,
                height: 56,
              }}
            >
              <AdminPanelSettingsIcon />
            </Avatar>
 
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Admin Login
            </Typography>
 
            <Typography variant="body2" color="text.secondary">
              Restricted access – administrators only
            </Typography>
               {errMsg!=='' && 
                  <Typography variant="body2" color="text.danger">
                     {errMsg}
                  </Typography>
               }
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Admin Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 2 }}
              />
 
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: 600,
                  background:
                    'linear-gradient(135deg, #141E30, #243B55)',
                }}
              >
                Login as Admin
              </Button>
            </Box>
          </Box>
        </Paper>
 
        {/* ✅ Success Dialog */}
        {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle align="center">
            ✅ Admin Authenticated
          </DialogTitle>
          <DialogContent>
            <Typography align="center">
              Welcome, Admin. Redirecting to dashboard…
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button variant="contained" onClick={handleCloseDialog}>
              Continue
            </Button>
          </DialogActions>
        </Dialog> */}
      </Container>
    </Box>
  );
};
 
export default AdminLogin;
