import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Store,
  ArrowBack,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../redux/userHandle';

const AuthContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.1)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
}));

const AuthCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 3,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
}));

const SimpleAuth = ({ mode, role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, response, error } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const isLogin = mode === 'Login';
  const isCustomer = role === 'Customer';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!isCustomer && !formData.shopName) {
        newErrors.shopName = 'Shop name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(authUser(formData, role, mode));
  };

  useEffect(() => {
    if (response && response.role) {
      // Store the authentication data in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentRole', response.role);
      localStorage.setItem('currentUser', JSON.stringify(response));
      
      // Redirect based on role
      if (response.role === 'Customer') {
        navigate('/');
      } else if (response.role === 'Seller') {
        navigate('/Seller');
      }
    }
  }, [response, navigate]);

  return (
    <AuthContainer>
      <AuthCard>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton
                component={Link}
                to="/"
                sx={{ mr: 1 }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" fontWeight={700} sx={{ flexGrow: 1 }}>
                {isLogin ? 'Welcome Back' : 'Join ShopCart'}
              </Typography>
            </Box>
            
            <Typography variant="body1" color="text.secondary">
              {isLogin 
                ? `Sign in to your ${role.toLowerCase()} account`
                : `Create a new ${role.toLowerCase()} account`
              }
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Chip
                icon={isCustomer ? <Person /> : <Store />}
                label={`${role} Account`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {!isLogin && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {!isLogin && !isCustomer && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Shop Name"
                    value={formData.shopName}
                    onChange={handleInputChange('shopName')}
                    error={!!errors.shopName}
                    helperText={errors.shopName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                component={Link}
                to={isLogin ? `/${role}register` : `/${role}login`}
                sx={{ ml: 1, fontWeight: 500 }}
                variant="text"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {isCustomer ? (
                <>
                  Want to sell products?{' '}
                  <Button
                    component={Link}
                    to="/Sellerregister"
                    sx={{ fontWeight: 500 }}
                    variant="text"
                  >
                    Become a seller
                  </Button>
                </>
              ) : (
                <>
                  Looking to shop?{' '}
                  <Button
                    component={Link}
                    to="/Customerregister"
                    sx={{ fontWeight: 500 }}
                    variant="text"
                  >
                    Shop as customer
                  </Button>
                </>
              )}
            </Typography>
          </Box>
        </CardContent>
      </AuthCard>
    </AuthContainer>
  );
};

export default SimpleAuth;