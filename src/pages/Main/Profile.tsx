import { useEffect, useState } from 'react';
import { Box, Typography, Container, Avatar, Paper, Divider, Chip } from '@mui/material';
import { UserService } from '../../services/UserService';
import type { User } from '../../interface/User';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const MID_NAVY = '#1B3B5F';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserService.getProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <Typography>Loading profile...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: MID_NAVY }} />
        <Chip label={user?.role.toUpperCase() || 'USER'} sx={{ mb: 2, bgcolor: MID_NAVY, color: 'white' }} />
        
        <Typography variant="h5" sx={{fontWeight:'bold'}}>{user?.name || 'Guest'}</Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'left' }}>
          <Typography color="text.secondary">Email Address</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{user?.email || 'N/A'}</Typography>

          <Typography color="text.secondary">Internal ID</Typography>
          <Typography variant="body1">{user?.id || 'N/A'}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
