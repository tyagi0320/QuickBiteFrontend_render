import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Stack, Paper, 
  Container, Alert, InputAdornment 
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { FoodService } from '../../services/FoodService';

const AddFood = () => {
  const [state, setState] = useState({ name: '', description: '', price: '', imagePath: null as File | null });
  const [preview, setPreview] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const [succMsg, setSuccMsg] = useState('');
  
  const MID_NAVY = '#1B3B5F';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setState({ ...state, imagePath: file });
      setPreview(URL.createObjectURL(file)); // Show live preview
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrMsg('');
    setSuccMsg('');

    if (!state.imagePath) {
      setErrMsg("Please upload an image");
      return;
    }

    // FIXED: Added the list values here
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    
    if (!allowedTypes.includes(state.imagePath.type)) {
      setErrMsg("Only support png and jpg images!");
      return;
    }

    try {
      const formsData = new FormData();
      formsData.append("name", state.name);
      formsData.append("description", state.description);
      formsData.append("price", state.price);
      formsData.append("image", state.imagePath);

      await FoodService.addfood(formsData);
      setSuccMsg("Product Added Successfully!");
      
      // Reset form
      setState({ name: '', description: '', price: '', imagePath: null });
      setPreview(null);
    } catch (err) {
      setErrMsg("Something went wrong while adding food.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack direction="row" spacing={2} sx={{alignItems:'center', mb: 4 }}>
            <Box sx={{ bgcolor: `${MID_NAVY}15`, p: 1, borderRadius: 2 }}>
              <FastfoodIcon sx={{ color: MID_NAVY }} />
            </Box>
            <Typography variant="h4" sx={{fontWeight:900 , color: '#0f172a'}}>
              Add New Food
            </Typography>
          </Stack>

          {errMsg && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{errMsg}</Alert>}
          {succMsg && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{succMsg}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Food Name"
                name="name"
                variant="outlined"
                fullWidth
                required
                value={state.name}
                onChange={handleChange}
              />

              <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                required
                value={state.description}
                onChange={handleChange}
                placeholder="Describe the ingredients..."
              />

              <TextField
                label="Price"
                name="price"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={state.price}
                onChange={handleChange}
                slotProps={{
                  htmlInput:{
                  startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
                  }
                }}
              />

              <Box sx={{ 
                border: '2px dashed #e0e0e0', 
                borderRadius: 3, 
                p: 3, 
                textAlign: 'center',
                bgcolor: '#fafafa',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { borderColor: MID_NAVY, bgcolor: '#f0f4f8' }
              }} component="label">
                <input type="file" hidden onChange={uploadImage} />
                {!preview ? (
                  <Stack sx={{alignItems:'center'}}spacing={1}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Click to upload food image (JPG/PNG)
                    </Typography>
                  </Stack>
                ) : (
                  <Box sx={{ position: 'relative' }}>
                    <img 
                        src={preview} 
                        alt="Preview" 
                        style={{ width: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: MID_NAVY, fontWeight: 'bold' }}>
                        Change Image
                    </Typography>
                  </Box>
                )}
              </Box>

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                fullWidth
                sx={{ 
                  bgcolor: MID_NAVY, 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#142d4a' } 
                }}
              >
                Add FoodItem
              </Button>
            </Stack>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AddFood;
