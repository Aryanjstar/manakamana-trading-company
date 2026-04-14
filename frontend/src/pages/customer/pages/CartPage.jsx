import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius * 2,
}));

const CartPage = () => {
  const navigate = useNavigate();

  // Mock setIsCartOpen function since the Cart component expects it
  const setIsCartOpen = (isOpen) => {
    if (!isOpen) {
      // When cart is "closed", redirect to home or previous page
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <HeaderPaper elevation={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Shopping Cart
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
          Review your items and proceed to checkout
        </Typography>
      </HeaderPaper>
      
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        borderRadius: 2, 
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Cart setIsCartOpen={setIsCartOpen} />
      </Box>
    </StyledContainer>
  );
};

export default CartPage;