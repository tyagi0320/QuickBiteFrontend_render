import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../context/CartContext';
import { TokenService } from '../../services/TokenService';
import { FoodService } from '../../services/FoodService';

export default function FoodItems({ foodData }: any) {
  const API_URL = "http://127.0.0.1:8000"; // Updated to use the correct local IP
  const { addToCart } = useCart();
  
  // Decode the token to check the user's role
  const user = TokenService.decodeToken();
  const isLoggedIn = !!user;

  const handleAddToCart = () => {
    addToCart(foodData);
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{ height: 180 }}
        image={FoodService.getImageUrl(foodData.image)}
        title={foodData.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {foodData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
          {foodData.description}
        </Typography>
        <Typography variant="h6" color="primary">
          Rs. {foodData.price}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        {!isLoggedIn ? (
          // Case 1: Not logged in
          <Button 
            fullWidth 
            variant="outlined" 
            size="medium" 
            disabled
          >
            Login to Order
          </Button>
        ) : user.role === 'admin' ? (
          // Case 2: Logged in as Admin (Prevent 403 by hiding Add to Cart)
          <Button 
            fullWidth 
            variant="contained" 
            size="medium" 
            disabled
            sx={{ bgcolor: 'secondary.main', color: 'white' }}
          >
            Admin View
          </Button>
        ) : (
          // Case 3: Logged in as User
          <Button 
            fullWidth 
            variant="contained" 
            size="medium" 
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{ fontWeight: 'bold' }}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
