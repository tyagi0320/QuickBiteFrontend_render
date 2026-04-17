import { useEffect, useState } from 'react';
import { 
  Box, Typography, Container, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, Stack, CircularProgress 
} from '@mui/material';
import { motion } from 'framer-motion';
import PeopleIcon from '@mui/icons-material/People';
import { UserService } from '../../services/UserService';
import type { User } from '../../interface/User';

const DisplayUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const MID_NAVY = '#1B3B5F';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Stack direction="row" spacing={2} sx={{alignItems:'center', mb: 4 }}>
            <Box sx={{ bgcolor: `${MID_NAVY}15`, p: 1, borderRadius: 2 }}>
              <PeopleIcon sx={{ color: MID_NAVY, fontSize: 30 }} />
            </Box>
            <Typography variant="h4" sx={{fontWeight:900}}>User Management</Typography>
          </Stack>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress sx={{ color: MID_NAVY }} />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Table>
                <TableHead sx={{ bgcolor: MID_NAVY }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={2} sx={{alignItems:'center'}}>
                          <Avatar sx={{ bgcolor: `${MID_NAVY}20`, color: MID_NAVY }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography sx={{fontWeight:600}}>{user.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.role.toUpperCase()} 
                          size="small" 
                          sx={{ 
                            fontWeight: 'bold', 
                            bgcolor: user.role === 'admin' ? '#fee2e2' : '#f0f4f8',
                            color: user.role === 'admin' ? '#ef4444' : MID_NAVY
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>#{user.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default DisplayUser;
