import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Grid, 
    Chip, 
    Divider, 
    IconButton,
    Stack,
    Paper,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
    Add, 
    Remove, 
    Delete, 
    ShoppingCart, 
    ArrowBack,
    LocalOffer
} from '@mui/icons-material';
import { addToCart, removeAllFromCart, removeFromCart } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../../../assets/cartimg.png";

const ModernContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    minHeight: '80vh',
}));

const CartCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        transform: 'translateY(-2px)',
    },
}));

const ProductImage = styled(CardMedia)({
    width: 140,
    height: 140,
    objectFit: 'cover',
    borderRadius: '12px 0 0 12px',
});

const QuantityBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
}));

const PriceCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    border: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    top: theme.spacing(2),
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    borderRadius: theme.shape.borderRadius * 3,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    '&:hover': {
        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    },
}));

const EmptyCartContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
    padding: theme.spacing(4),
}));

const Cart = ({ setIsCartOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    let cartDetails = currentUser?.cartDetails || [];

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveAllFromCart = () => {
        dispatch(removeAllFromCart());
    };

    const handleDeleteItem = (product) => {
        // Remove all quantities of this item
        for (let i = 0; i < product.quantity; i++) {
            dispatch(removeFromCart(product));
        }
    };

    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalOGPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.mrp), 0);
    const totalNewPrice = cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);
    const totalSavings = totalOGPrice - totalNewPrice;

    const productViewHandler = (productID) => {
        navigate("/product/view/" + productID);
        if (setIsCartOpen) setIsCartOpen(false);
    };

    const proceedToCheckout = () => {
        console.log('Proceeding to checkout...', currentUser);
        if (setIsCartOpen) setIsCartOpen(false);
        
        // Navigate directly to checkout
        setTimeout(() => {
            navigate("/Checkout");
        }, 100);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    if (cartDetails.length === 0) {
        return (
            <ModernContainer>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => setIsCartOpen && setIsCartOpen(false)}
                        sx={{ mr: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
                
                <EmptyCartContainer>
                    <img 
                        src={emptyCart} 
                        alt="Empty Cart" 
                        style={{ width: '300px', marginBottom: '2rem', opacity: 0.7 }}
                    />
                    <Typography variant="h4" gutterBottom fontWeight="bold" color="text.secondary">
                        Your Cart is Empty
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                        Looks like you haven't added anything to your cart yet
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCart />}
                        onClick={() => {
                            navigate('/');
                            if (setIsCartOpen) setIsCartOpen(false);
                        }}
                        sx={{ borderRadius: 3, px: 4, py: 1.5 }}
                    >
                        Start Shopping
                    </Button>
                </EmptyCartContainer>
            </ModernContainer>
        );
    }

    return (
        <ModernContainer maxWidth="lg">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => setIsCartOpen && setIsCartOpen(false)}
                        sx={{ mr: 2 }}
                    >
                        Continue Shopping
                    </Button>
                    <Typography variant="h4" fontWeight="bold">
                        Shopping Cart
                    </Typography>
                    <Chip 
                        label={`${totalQuantity} items`} 
                        color="primary" 
                        sx={{ ml: 2 }}
                    />
                </Box>
                
                <Button
                    color="error"
                    onClick={handleRemoveAllFromCart}
                    startIcon={<Delete />}
                >
                    Clear Cart
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Stack spacing={2}>
                        {cartDetails.map((item, index) => (
                            <CartCard key={index}>
                                <ProductImage
                                    image={item.productImage}
                                    title={item.productName}
                                />
                                <CardContent sx={{ flex: 1, p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                                {item.productName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {item.category} • {item.subcategory}
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                                                <Typography variant="h6" color="primary" fontWeight="bold">
                                                    {formatCurrency(item.price.cost)}
                                                </Typography>
                                                {item.price.discountPercent > 0 && (
                                                    <>
                                                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                                            {formatCurrency(item.price.mrp)}
                                                        </Typography>
                                                        <Chip 
                                                            icon={<LocalOffer />}
                                                            label={`${item.price.discountPercent}% OFF`} 
                                                            color="success" 
                                                            size="small"
                                                        />
                                                    </>
                                                )}
                                            </Box>
                                        </Box>
                                        
                                        <IconButton 
                                            color="error" 
                                            onClick={() => handleDeleteItem(item)}
                                            sx={{ mt: 1 }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <QuantityBox>
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleRemoveFromCart(item)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography 
                                                variant="body1" 
                                                fontWeight="bold" 
                                                sx={{ px: 2, minWidth: '40px', textAlign: 'center' }}
                                            >
                                                {item.quantity}
                                            </Typography>
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                <Add />
                                            </IconButton>
                                        </QuantityBox>
                                        
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button 
                                                variant="outlined" 
                                                size="small"
                                                onClick={() => productViewHandler(item._id)}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </CartCard>
                        ))}
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <PriceCard elevation={2}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Order Summary
                        </Typography>
                        
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body1">Price ({totalQuantity} items)</Typography>
                                <Typography variant="body1">{formatCurrency(totalOGPrice)}</Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body1" color="success.main">Discount</Typography>
                                <Typography variant="body1" color="success.main">-{formatCurrency(totalSavings)}</Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body1">Delivery Charges</Typography>
                                <Typography variant="body1" color="success.main">FREE</Typography>
                            </Box>
                            
                            <Divider />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" fontWeight="bold">Total Amount</Typography>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    {formatCurrency(totalNewPrice)}
                                </Typography>
                            </Box>
                            
                            {totalSavings > 0 && (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    You will save {formatCurrency(totalSavings)} on this order!
                                </Alert>
                            )}
                            
                            <CheckoutButton
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={proceedToCheckout}
                                sx={{ mt: 3 }}
                            >
                                Proceed to Checkout
                            </CheckoutButton>
                            
                            <Typography variant="caption" color="text.secondary" align="center">
                                Safe and secure payments. 100% authentic products.
                            </Typography>
                        </Stack>
                    </PriceCard>
                </Grid>
            </Grid>
        </ModernContainer>
    );
};

export default Cart;
