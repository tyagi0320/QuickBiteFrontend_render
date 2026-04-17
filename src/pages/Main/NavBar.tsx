import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { TokenService } from '../../services/TokenService';
import { useCart } from '../../context/CartContext';

function NavBar() {
  const navigate = useNavigate();
  const { cartCount, clearCart } = useCart();
  
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const isLoggedIn = !!TokenService.getAccessToken();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    TokenService.clearToken();
    clearCart();
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #141E30 0%, #243B55 100%)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QuickBite
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}> Home </Typography>
              </MenuItem>
              {/* Adding to Mobile Menu too for consistency */}
              {isLoggedIn && (
                <MenuItem component={Link} to="/order-history" onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}> My Orders </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
            <Button component={Link} to="/about" sx={{ my: 2, color: 'white', display: 'block' }}>About Us</Button>
            <Button component={Link} to="/fooditems" sx={{ my: 2, color: 'white', display: 'block' }}>Food Items</Button>
            
            {/* ADDED HERE: Shows right after Food Items only when logged in */}
            {isLoggedIn && (
               <Button component={Link} to="/order-history" sx={{ my: 2, color: 'white', display: 'block' }}>My Orders</Button>
            )}
            
            {!isLoggedIn && (
              <>
                <Button component={Link} to="/login" sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
                <Button component={Link} to="/register" sx={{ my: 2, color: 'white', display: 'block' }}>Register</Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {isLoggedIn && (
              <IconButton component={Link} to="/cart" color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            {isLoggedIn && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* Also adding to the dropdown for a complete UX */}
                  <MenuItem component={Link} to="/me" onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>My Profile</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/order-history" onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>My Orders</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
