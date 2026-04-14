import React, { useState } from 'react';
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
  Divider,
  Paper,
  Grid,
  Link as MuiLink,
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
  Google,
  Facebook,
  GitHub,
  ArrowBack,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
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
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.light,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
      },
    },
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(1.5),
  borderColor: theme.palette.divider,
  color: theme.palette.text.secondary,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

const ModernAuth = ({ mode, role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, authResponse, error } = useSelector(state => state.user);

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

    try {
      await dispatch(authUser(formData, role, mode));
      
      if (isLogin) {
        toast.success(`Welcome back!`);
      } else {
        toast.success(`Account created successfully!`);
      }
      
      // Navigate based on role
      if (role === 'Customer') {
        navigate('/');
      } else {
        navigate('/seller/dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  const socialProviders = [
    { name: 'Google', icon: <Google />, color: '#db4437' },
    { name: 'Facebook', icon: <Facebook />, color: '#4267b2' },
    { name: 'GitHub', icon: <GitHub />, color: '#333' },
  ];

  return (
    <AuthContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
                    <StyledTextField
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
                  <StyledTextField
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
                  <StyledTextField
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
                    <StyledTextField
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

            {/* Social Login */}
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Or continue with
                </Typography>
              </Divider>

              <Grid container spacing={1}>
                {socialProviders.map((provider) => (
                  <Grid item xs={4} key={provider.name}>
                    <SocialButton
                      fullWidth
                      variant="outlined"
                      startIcon={provider.icon}
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(provider.color, 0.1),
                          borderColor: provider.color,
                        },
                      }}
                    >
                      {provider.name}
                    </SocialButton>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Footer Links */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <MuiLink
                  component={Link}
                  to={isLogin ? `/${role}register` : `/${role}login`}
                  sx={{ ml: 1, fontWeight: 500 }}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </MuiLink>
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {isCustomer ? (
                  <>
                    Want to sell products?{' '}
                    <MuiLink
                      component={Link}
                      to="/Sellerregister"
                      sx={{ fontWeight: 500 }}
                    >
                      Become a seller
                    </MuiLink>
                  </>
                ) : (
                  <>
                    Looking to shop?{' '}
                    <MuiLink
                      component={Link}
                      to="/Customerregister"
                      sx={{ fontWeight: 500 }}
                    >
                      Shop as customer
                    </MuiLink>
                  </>
                )}
              </Typography>
            </Box>
          </CardContent>
        </AuthCard>
      </motion.div>
    </AuthContainer>
  );
};

export default ModernAuth;