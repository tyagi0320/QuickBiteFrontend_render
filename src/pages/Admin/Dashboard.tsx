import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Table, TableBody, TableCell, tableCellClasses, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Typography, Box, 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, CircularProgress, Alert, Grid 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FoodService } from '../../services/FoodService';
import { useOrders } from '../../context/OrderContext'; 
import type { Food } from '../../interface/Food';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#141E30',
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));

export default function Dashboard() {
  const { orders } = useOrders(); // Access global orders state
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit States
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Food | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const API_BASE = "http://127.0.0.1:8000";

  // Calculate Stats
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const approvedCount = orders.filter(o => o.status === 'approved').length;

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setLoading(true);
      const data = await FoodService.foods();
      setFoods(data);
    } catch (err) {
      setError("Failed to fetch products from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await FoodService.deleteFood(id);
        setFoods(foods.filter(f => f.id !== id));
      } catch (err) {
        alert("Delete failed. Check permissions.");
      }
    }
  };

  const handleEditOpen = (food: Food) => {
    setEditData(food);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!editData) return;
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('price', editData.price.toString());
    if (editData.description) formData.append('description', editData.description);
    if (selectedFile) formData.append('image', selectedFile);

    try {
      await FoodService.updateFood(editData.id, formData);
      setOpen(false);
      setSelectedFile(null);
      loadFoods();
    } catch (err) {
      alert("Update failed.");
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, color: '#141E30' }}>Admin Dashboard</Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { label: 'Total Orders', value: orders.length, icon: <ShoppingBagIcon />, color: '#1B3B5F' },
          { label: 'Pending', value: pendingCount, icon: <PendingActionsIcon />, color: '#ffa000' },
          { label: 'Approved', value: approvedCount, icon: <CheckCircleIcon />, color: '#4caf50' },
        ].map((stat, i) => (
          <Grid size={{xs:12 ,sm:4}} key={i}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: `${stat.color}15`, color: stat.color, borderRadius: 2 }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="body2" sx={{color:"text.secondary", fontWeight:"700"}}>{stat.label}</Typography>
                <Typography variant="h5" sx={{fontWeight:"900"}}>{stat.value}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Manage Menu Items</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Price (Rs.)</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food, index) => (
              <StyledTableRow key={food.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <img 
                    src={`${API_BASE}/images/${food.image}`} 
                    alt={food.name} 
                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>{food.name}</StyledTableCell>
                <StyledTableCell>{food.description}</StyledTableCell>
                <StyledTableCell align="right">{food.price}</StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={1} sx={{justifyContent:'center'}}>
                    <IconButton color="primary" onClick={() => handleEditOpen(food)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(food.id)}><DeleteIcon /></IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog remains same */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Food Item</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Name" fullWidth value={editData?.name || ''} onChange={(e) => setEditData(prev => prev ? {...prev, name: e.target.value} : null)} />
          <TextField label="Price" type="number" fullWidth value={editData?.price || ''} onChange={(e) => setEditData(prev => prev ? {...prev, price: Number(e.target.value)} : null)} />
          <TextField label="Description" multiline rows={3} fullWidth value={editData?.description || ''} onChange={(e) => setEditData(prev => prev ? {...prev, description: e.target.value} : null)} />
          <Button variant="outlined" component="label" sx={{ mt: 1 }}>
            Update Product Image
            <input type="file" hidden onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate} sx={{ bgcolor: '#141E30' }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
