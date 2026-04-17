import { useEffect } from 'react';
import { 
  Box, Typography, Container, Card, Stack, Chip, Button, 
  Grid, Skeleton, IconButton, Tooltip 
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useOrders } from '../../context/OrderContext';

const ManageOrders = () => {
  const { orders, loading, fetchOrders, approveOrder } = useOrders();
  const MID_NAVY = '#1B3B5F';

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleApprove = async (orderId: number) => {
    if (window.confirm("Approve this order? This will clear the customer's cart.")) {
      await approveOrder(orderId);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* HEADER SECTION */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Box>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
              <ReceiptIcon sx={{ color: MID_NAVY, fontSize: 35 }} />
              <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>
                Order Management
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary">
              Review and approve incoming gourmet requests
            </Typography>
          </Box>
          <Tooltip title="Refresh List">
            <IconButton onClick={() => fetchOrders()} sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <RefreshIcon sx={{ color: MID_NAVY }} />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* ORDERS LIST */}
        <Grid container spacing={3}>
          {loading ? (
            [1, 2, 3].map((i) => (
              <Grid size={{xs:12}} key={i}>
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 4 }} />
              </Grid>
            ))
          ) : (
            <AnimatePresence>
              {orders.map((order, index) => (
                <Grid size={{xs:12}} key={order.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card sx={{ 
                      borderRadius: 4, 
                      p: 3, 
                      border: '1px solid #e2e8f0', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 3,
                      bgcolor: order.status === 'pending' ? '#fff' : '#f1f5f9'
                    }}>
                      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flex: 1 }}>
                        <Box sx={{ 
                          p: 2, bgcolor: order.status === 'pending' ? `${MID_NAVY}10` : '#e2e8f0', 
                          borderRadius: 3 
                        }}>
                          <Typography variant="h6" sx={{ fontWeight: 900, color: MID_NAVY }}>
                            #{order.id}
                          </Typography>
                        </Box>
                        
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>
                            CUSTOMER ID: {order.user_id}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            Rs.{order.total_price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <Chip 
                          label={order.status.toUpperCase()} 
                          sx={{ 
                            fontWeight: 900, 
                            bgcolor: order.status === 'pending' ? '#fff7ed' : '#f0fdf4',
                            color: order.status === 'pending' ? '#c2410c' : '#15803d',
                            border: '1px solid',
                            borderColor: order.status === 'pending' ? '#fed7aa' : '#bbf7d0'
                          }} 
                        />
                        
                        {order.status === 'pending' && (
                          <Button
                            variant="contained"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApprove(order.id)}
                            sx={{ 
                              bgcolor: MID_NAVY, 
                              px: 3, 
                              borderRadius: 2,
                              '&:hover': { bgcolor: '#142d4a' } 
                            }}
                          >
                            Approve
                          </Button>
                        )}
                      </Stack>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ManageOrders;
