import React, { useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Chip,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Button,
    Stack,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerOrders } from '../../../redux/userHandle';

const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: '100vh',
}));

const OrderCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const ProductCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

const ProductImage = styled(CardMedia)({
    width: 120,
    height: 120,
    objectFit: 'cover',
});

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'processing':
            return 'warning';
        case 'shipped':
            return 'info';
        case 'delivered':
            return 'success';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'successful':
            return 'success';
        case 'pending':
            return 'warning';
        case 'failed':
            return 'error';
        default:
            return 'default';
    }
};

const CustomerOrders = () => {
    const dispatch = useDispatch();
    const { currentUser, loading, specificProductData, responseSpecificProducts } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getCustomerOrders(currentUser._id));
        }
    }, [dispatch, currentUser]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };

    if (loading) {
        return (
            <StyledContainer>
                <Typography variant="h4" align="center">
                    Loading your orders...
                </Typography>
            </StyledContainer>
        );
    }

    if (responseSpecificProducts || !specificProductData || specificProductData.length === 0) {
        return (
            <StyledContainer>
                <Typography variant="h4" align="center" gutterBottom>
                    My Orders
                </Typography>
                <Alert severity="info" sx={{ mt: 4 }}>
                    No orders found. Start shopping to see your orders here!
                </Alert>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                My Orders
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                Track and manage your orders
            </Typography>

            {specificProductData.map((order) => (
                <OrderCard key={order._id} elevation={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Order #{order._id.slice(-8).toUpperCase()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Placed on {formatDate(order.createdAt)}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Chip 
                                label={order.orderStatus} 
                                color={getStatusColor(order.orderStatus)}
                                sx={{ mb: 1 }}
                            />
                            <Typography variant="h6" color="primary">
                                {formatCurrency(order.totalPrice)}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                Order Items ({order.productsQuantity} items)
                            </Typography>
                            {order.orderedProducts.map((product, index) => (
                                <ProductCard key={index}>
                                    <ProductImage
                                        image={product.productImage}
                                        title={product.productName}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {product.category} • {product.subcategory}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                            <Typography variant="body2">
                                                Quantity: {product.quantity}
                                            </Typography>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="h6" color="primary">
                                                    {formatCurrency(product.price.cost)}
                                                </Typography>
                                                {product.price.discountPercent > 0 && (
                                                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                                        {formatCurrency(product.price.mrp)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </ProductCard>
                            ))}
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Payment Details
                                </Typography>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Payment Method:</Typography>
                                        <Typography variant="body2" fontWeight="bold">
                                            {order.paymentInfo.method || 'Online Payment'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Payment Status:</Typography>
                                        <Chip 
                                            label={order.paymentInfo.status} 
                                            color={getPaymentStatusColor(order.paymentInfo.status)}
                                            size="small"
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Payment ID:</Typography>
                                        <Typography variant="body2" fontWeight="bold">
                                            {order.paymentInfo.id.slice(-8).toUpperCase()}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6" gutterBottom>
                                    Shipping Address
                                </Typography>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                    {order.shippingData.address}<br />
                                    {order.shippingData.city}, {order.shippingData.state}<br />
                                    {order.shippingData.country} - {order.shippingData.pinCode}<br />
                                    Phone: {order.shippingData.phoneNo}
                                </Typography>
                            </Box>

                            {order.orderStatus === 'Processing' && (
                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    fullWidth 
                                    sx={{ mt: 2 }}
                                >
                                    Cancel Order
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </OrderCard>
            ))}
        </StyledContainer>
    );
};

export default CustomerOrders;