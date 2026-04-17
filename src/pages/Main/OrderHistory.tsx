import { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  Stack, 
  Chip, 
  Skeleton, 
  Paper // Added Paper import here
} from '@mui/material';
import { motion } from 'framer-motion';
import { useOrders } from '../../context/OrderContext';
import HistoryIcon from '@mui/icons-material/History';

const OrderHistory = () => {
  const { orders, loading, fetchOrders } = useOrders();
 
  const MID_NAVY = '#1B3B5F';

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusProps = (status: string) => {
    switch (status) {
      case 'pending': return { color: '#ffa000', label: 'Pending Approval' };
      case 'approved': return { color: '#4caf50', label: 'In Preparation' };
      case 'delivered': return { color: MID_NAVY, label: 'Delivered' };
      default: return { color: '#9e9e9e', label: status };
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 4 }}>
          <HistoryIcon sx={{ color: MID_NAVY, fontSize: 40 }} />
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>Order History</Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: MID_NAVY, borderRadius: 2, mt: 1 }} />
          </Box>
        </Stack>

        {loading ? (
          <Stack spacing={2}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: 4 }} />
            ))}
          </Stack>
        ) : orders.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 10, textAlign: 'center', borderRadius: 4, borderStyle: 'dashed' }}>
            <Typography variant="h6" color="text.secondary">No orders found. Time to eat something!</Typography>
          </Paper>
        ) : (
          <Stack spacing={3}>
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card sx={{ borderRadius: 4, p: 3, border: '1px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: MID_NAVY, letterSpacing: 1 }}>
                        ORDER ID: #{order.id}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, my: 0.5 }}>
                        Total: Rs.{order.total_price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Placed on {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Chip 
                      label={getStatusProps(order.status).label}
                      sx={{ 
                        bgcolor: `${getStatusProps(order.status).color}15`, 
                        color: getStatusProps(order.status).color,
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        borderRadius: 2,
                        px: 1
                      }} 
                    />
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default OrderHistory;
