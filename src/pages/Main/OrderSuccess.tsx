import React from 'react';
import { Box, Typography, Button, Container, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Switched to TaskAlt and direct imports for maximum stability
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const OrderSuccess: React.FC = () => {
  const MID_NAVY = '#1B3B5F';
  const NAVY_GRADIENT = 'linear-gradient(135deg, #f5f7fa 0%, #d6dee9 100%)';

  return (
    <Box sx={{ minHeight: '90vh', background: NAVY_GRADIENT, display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 6, 
              textAlign: 'center', 
              border: '1px solid #e0e0e0', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)' 
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {/* Replacement Icon */}
              <TaskAltIcon sx={{ fontSize: 100, color: MID_NAVY, mb: 3 }} />
            </motion.div>

            <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 2 }}>
              Order Placed!
            </Typography>
            
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1.1rem' }}>
              Your order is just an approval away. Our kitchen will approve your request shortly.
            </Typography>

            <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 4, mb: 4, border: '1px dashed', borderColor: MID_NAVY }}>
              <Typography variant="subtitle2" sx={{ color: MID_NAVY, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                Yay! Your order has been received ;)
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                Don't forget to share your food experience with us!
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Button
                component={Link}
                to="/order-history"
                variant="contained"
                size="large"
                startIcon={<ReceiptLongIcon />}
                sx={{ bgcolor: MID_NAVY, borderRadius: 2, py: 1.5, '&:hover': { bgcolor: '#142d4a' } }}
              >
                Track My Order
              </Button>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ color: MID_NAVY, borderColor: MID_NAVY, borderRadius: 2, py: 1.5 }}
              >
                QuickBite More!
              </Button>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OrderSuccess;
