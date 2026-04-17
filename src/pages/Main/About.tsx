import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Avatar, 
  Stack, 
  Divider,
  Grid 
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const About = () => {
  const values = [
    { title: "Global Reach", desc: "Shipping products to over 50 countries.", icon: <PublicIcon fontSize="large" color="primary" /> },
    { title: "Fast Delivery", desc: "Lightning-fast shipping with local partners.", icon: <SpeedIcon fontSize="large" color="primary" /> },
    { title: "24/7 Support", desc: "Dedicated team always ready to help.", icon: <SupportAgentIcon fontSize="large" color="primary" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>About MyApp</Typography>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mt: 1 }} gutterBottom>
          Redefining Your Shopping Experience
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Launched in 2024, MyApp makes premium products accessible everywhere.
        </Typography>
      </Box>

      {/* 2. Visual Section */}
      <Box sx={{ width: '100%', height: 400, bgcolor: 'grey.200', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 8 }}>
        <StorefrontIcon sx={{ fontSize: 100, color: 'grey.400' }} />
        <Typography variant="h4" sx={{ color: 'grey.400', mt: 2 }}>Warehouse Photo</Typography>
      </Box>

      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>Why Choose Us?</Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {values.map((item, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card elevation={0} sx={{ textAlign: 'center', height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 8 }} />

      <Grid container spacing={6} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Our Mission</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Delivering consumers a platform for high-quality food.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
             <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.light' }}>CEO</Avatar>
             <Avatar sx={{ width: 100, height: 100, bgcolor: 'secondary.light' }}>CTO</Avatar>
             <Avatar sx={{ width: 100, height: 100, bgcolor: 'success.light' }}>COO</Avatar>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
