import { 
  Container, Typography, Box, Paper, List, ListItem, 
  ListItemText, Avatar, IconButton, Button, Stack 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext'; // Added
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const Cart = () => {
  const { cart, allFoods, updateQuantity, removeItem, clearCart } = useCart();
  const { placeOrder, loading } = useOrders(); // Added Order Context
  const navigate = useNavigate(); // For redirection
  const API_URL = "http://localhost:8000";

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const food = allFoods.find(f => f.id === item.food_id);
      return total + (food?.price || 0) * item.quantity;
    }, 0);
  };

const handleCheckout = async () => {
  try {
    await placeOrder();
    navigate('/order-success');
  } catch (err: any) {
    // Check if the backend sent the "pending order" error
    const message = err.response?.data?.detail || "Checkout failed.";
    alert(message); 
  }
};

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1B3B5F',fontWeight:"bold" }}>
        Your Cart
      </Typography>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Button component={Link} to="/fooditems" variant="contained" sx={{ mt: 2, bgcolor: '#1B3B5F' }}>
              Go to Menu
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Button 
                color="error" 
                onClick={clearCart} 
                size="small" 
                startIcon={<DeleteOutlinedIcon fontSize="small" />}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Clear All Items
              </Button>
            </Box>

            <List>
              {cart.map((item) => {
                const food = allFoods.find(f => f.id === item.food_id);
                const foodName = food?.name || "Loading...";
                const foodPrice = food?.price || 0;
                const imageSrc = food?.image ? `${API_URL}/images/${food.image}` : '/placeholder.png';

                return (
                  <ListItem 
                    key={item.id} 
                    divider
                    secondaryAction={
                      <Stack direction="row" sx={{alignItems:'center'}} spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ px: 1.5, fontWeight: 'medium' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <IconButton color="error" onClick={() => removeItem(item.id)}>
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <Avatar 
                      src={imageSrc} 
                      variant="rounded" 
                      sx={{ width: 70, height: 70, mr: 2 }} 
                    />
                    <ListItemText 
                      primary={<Typography variant="subtitle1" sx={{fontWeight:'600'}}>{foodName}</Typography>} 
                      secondary={
                        <Typography variant="body2" color="primary">
                          Rs. {foodPrice} x {item.quantity}
                        </Typography>
                      } 
                    />
                    <Box sx={{ mr: { md: 15, xs: 2 } }}>
                       <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>
                        Rs. {foodPrice * item.quantity}
                      </Typography>
                    </Box>
                  </ListItem>
                );
              })}
            </List>

            <Box sx={{ mt: 4 }}>
              <Stack direction="row" sx={{justifyContent:'flex-end',alignItems:'center'}}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body1" color="text.secondary">Total Amount:</Typography>
                  <Typography variant="h4" sx={{fontWeight:'bold' ,color:'primary.main'}}>
                    Rs. {calculateTotal()}
                  </Typography>
                </Box>
              </Stack>
              
              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                startIcon={<ShoppingBagOutlinedIcon />}
                onClick={handleCheckout} // Linked to logic
                disabled={loading} // Disable while processing
                sx={{ 
                  mt: 4, 
                  py: 1.5, 
                  fontWeight: 'bold',
                  background: loading ? '#ccc' : 'linear-gradient(45deg, #141E30 30%, #243B55 90%)'
                }}
              >
                {loading ? 'Processing Order...' : 'Checkout Now'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Cart;
