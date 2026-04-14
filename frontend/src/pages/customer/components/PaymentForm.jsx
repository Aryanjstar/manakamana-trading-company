import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { 
    Box, 
    Button, 
    Radio, 
    RadioGroup, 
    FormControlLabel, 
    FormControl, 
    FormLabel, 
    Paper, 
    Alert,
    Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { fetchProductDetailsFromCart, removeAllFromCart, removeSpecificProduct } from '../../../redux/userSlice';

const PaymentForm = ({ handleBack }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { status, currentUser, productDetailsCart } = useSelector(state => state.user);

    const params = useParams();
    const productID = params.id;

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPaymentData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (productID) {
            dispatch(fetchProductDetailsFromCart(productID));
        }
    }, [productID, dispatch]);

    const productsQuantity = currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = currentUser.cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

    const singleProductQuantity = productDetailsCart && productDetailsCart.quantity
    const totalsingleProductPrice = productDetailsCart && productDetailsCart.price && productDetailsCart.price.cost * productDetailsCart.quantity

    const generatePaymentInfo = () => {
        if (paymentMethod === 'cod') {
            return {
                id: `COD-${Date.now()}`,
                status: "Pending",
                method: "Cash on Delivery"
            };
        } else {
            const paymentID = `${paymentData.cardNumber.slice(-4)}-${paymentData.expDate.slice(0, 2)}${paymentData.expDate.slice(-2)}-${Date.now()}`;
            return {
                id: paymentID,
                status: "Successful",
                method: "Online Payment"
            };
        }
    };

    const multiOrderData = {
        buyer: currentUser._id,
        shippingData: currentUser.shippingData,
        orderedProducts: currentUser.cartDetails,
        paymentInfo: generatePaymentInfo(),
        productsQuantity,
        totalPrice,
    }

    const singleOrderData = {
        buyer: currentUser._id,
        shippingData: currentUser.shippingData,
        orderedProducts: productDetailsCart,
        paymentInfo: generatePaymentInfo(),
        productsQuantity: singleProductQuantity,
        totalPrice: totalsingleProductPrice,
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validate online payment fields if selected
        if (paymentMethod === 'online') {
            if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.expDate || !paymentData.cvv) {
                setMessage("Please fill all payment details")
                setShowPopup(true)
                return;
            }
        }

        if (productID) {
            dispatch(addStuff("newOrder", singleOrderData));
            dispatch(removeSpecificProduct(productID));
        }
        else {
            dispatch(addStuff("newOrder", multiOrderData));
            dispatch(removeAllFromCart());
        }
    };

    useEffect(() => {
        if (status === 'added') {
            navigate('/Aftermath');
        }
        else if (status === 'failed') {
            setMessage("Order Failed")
            setShowPopup(true)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, navigate]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment Method
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend">Choose Payment Method</FormLabel>
                    <RadioGroup
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        sx={{ mt: 1 }}
                    >
                        <FormControlLabel 
                            value="cod" 
                            control={<Radio />} 
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Cash on Delivery (COD)
                                    <Chip label="Recommended" size="small" color="success" />
                                </Box>
                            }
                        />
                        <FormControlLabel 
                            value="online" 
                            control={<Radio />} 
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Online Payment
                                    <Chip label="Coming Soon" size="small" color="warning" />
                                </Box>
                            }
                        />
                    </RadioGroup>
                </FormControl>

                {paymentMethod === 'cod' && (
                    <Paper sx={{ p: 2, mb: 3, bgcolor: 'success.light', color: 'success.contrastText' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Cash on Delivery Selected
                        </Typography>
                        <Typography variant="body2">
                            • Pay when your order is delivered to your doorstep
                        </Typography>
                        <Typography variant="body2">
                            • No online payment required
                        </Typography>
                        <Typography variant="body2">
                            • Safe and secure payment method
                        </Typography>
                    </Paper>
                )}

                {paymentMethod === 'online' && (
                    <>
                        <Alert severity="info" sx={{ mb: 3 }}>
                            Online payment feature is coming soon! For now, please use Cash on Delivery.
                        </Alert>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required={paymentMethod === 'online'}
                                    id="cardName"
                                    label="Name on card"
                                    fullWidth
                                    autoComplete="cc-name"
                                    variant="standard"
                                    value={paymentData.cardName}
                                    onChange={handleInputChange}
                                    disabled={paymentMethod === 'online'}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required={paymentMethod === 'online'}
                                    id="cardNumber"
                                    label="Card number"
                                    type='number'
                                    fullWidth
                                    autoComplete="cc-number"
                                    variant="standard"
                                    value={paymentData.cardNumber}
                                    onChange={handleInputChange}
                                    disabled={paymentMethod === 'online'}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required={paymentMethod === 'online'}
                                    id="expDate"
                                    type='date'
                                    helperText="Expiry date"
                                    fullWidth
                                    autoComplete="cc-exp"
                                    variant="standard"
                                    value={paymentData.expDate}
                                    onChange={handleInputChange}
                                    disabled={paymentMethod === 'online'}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required={paymentMethod === 'online'}
                                    id="cvv"
                                    label="CVV"
                                    type='number'
                                    helperText="Last three digits on signature strip"
                                    fullWidth
                                    autoComplete="cc-csc"
                                    variant="standard"
                                    value={paymentData.cvv}
                                    onChange={handleInputChange}
                                    disabled={paymentMethod === 'online'}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        type='submit'
                        sx={{ mt: 3, ml: 1 }}
                        disabled={paymentMethod === 'online'}
                    >
                        {paymentMethod === 'cod' ? 'Place Order (COD)' : 'Coming Soon'}
                    </Button>
                </Box>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </React.Fragment>
    );
}

export default PaymentForm;
