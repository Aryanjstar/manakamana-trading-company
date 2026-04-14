import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  InputBase,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  Person,
  Home,
  Store,
  Login,
  PersonAdd,
  Logout,
  ShoppingBag,
  AccountCircle,
  Notifications,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    minWidth: 300,
  },
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  '&:focus-within': {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.5rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  letterSpacing: '-0.5px',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontWeight: 600,
    fontSize: '0.75rem',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(1, 2),
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn, currentUser, currentRole } = useSelector(state => state.user);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  // Mock cart count - replace with actual cart data
  const cartCount = currentUser?.cartDetails?.length || 0;
  const notificationCount = 3; // Mock notification count

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/ProductSearch?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/Logout');
    toast.success('Logged out successfully!');
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Products', path: '/Products', icon: <Store /> },
    { label: 'Search', path: '/ProductSearch', icon: <Search /> },
  ];

  const authItems = isLoggedIn ? [
    ...(currentRole === 'Customer' ? [
      { label: 'Cart', path: '/Checkout', icon: <ShoppingCart />, badge: cartCount },
      { label: 'Orders', path: '/Orders', icon: <ShoppingBag /> },
      { label: 'Profile', path: '/Profile', icon: <Person /> },
    ] : []),
    { label: 'Logout', path: '/Logout', icon: <Logout />, action: handleLogout },
  ] : [
    { label: 'Customer Login', path: '/Customerlogin', icon: <Login /> },
    { label: 'Seller Login', path: '/Sellerlogin', icon: <Login /> },
    { label: 'Sign Up', path: '/Customerregister', icon: <PersonAdd /> },
  ];

  const renderDesktopMenu = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
      {navigationItems.map((item) => (
        <NavButton
          key={item.label}
          component={Link}
          to={item.path}
          color={location.pathname === item.path ? 'primary' : 'inherit'}
          startIcon={item.icon}
        >
          {item.label}
        </NavButton>
      ))}
      
      <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24 }} />
      
      {isLoggedIn ? (
        <>
          {currentRole === 'Customer' && (
            <IconButton
              component={Link}
              to="/Checkout"
              color={location.pathname === '/Checkout' ? 'primary' : 'default'}
            >
              <StyledBadge badgeContent={cartCount} color="error">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>
          )}
          
          <IconButton onClick={handleNotificationsOpen}>
            <StyledBadge badgeContent={notificationCount} color="error">
              <Notifications />
            </StyledBadge>
          </IconButton>
          
          <IconButton onClick={toggleDarkMode} sx={{ ml: 1 }}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
                fontSize: '0.875rem',
              }}
            >
              {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        </>
      ) : (
        <>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          <NavButton
            component={Link}
            to="/Customerlogin"
            color="primary"
            variant="outlined"
            startIcon={<Login />}
          >
            Login
          </NavButton>
          
          <NavButton
            component={Link}
            to="/Customerregister"
            color="primary"
            variant="contained"
            startIcon={<PersonAdd />}
          >
            Sign Up
          </NavButton>
        </>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Logo variant="h6" onClick={() => navigate('/')}>
          ShopCart
        </Logo>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {isLoggedIn ? `Welcome, ${currentUser?.name}` : 'Welcome to ShopCart'}
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {[...navigationItems, ...authItems].map((item, index) => (
          <ListItem
            key={item.label}
            button
            component={item.action ? 'div' : Link}
            to={item.action ? undefined : item.path}
            onClick={() => {
              if (item.action) {
                item.action();
              }
              handleMobileMenuToggle();
            }}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              bgcolor: location.pathname === item.path ? 'primary.50' : 'transparent',
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                minWidth: 40,
              }}
            >
              {item.badge ? (
                <StyledBadge badgeContent={item.badge} color="error">
                  {item.icon}
                </StyledBadge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.label} />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <StyledAppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleMobileMenuToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Logo variant="h6" onClick={() => navigate('/')}>
            ShopCart
          </Logo>

          {/* Search Bar */}
          <SearchContainer sx={{ display: { xs: 'none', sm: 'block' } }}>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              inputProps={{ 'aria-label': 'search products' }}
            />
          </SearchContainer>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {renderDesktopMenu()}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      {renderMobileMenu()}

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2" color="text.secondary">
            {currentUser?.email}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/Profile" onClick={handleMenuClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        {currentRole === 'Customer' && (
          <MenuItem component={Link} to="/Orders" onClick={handleMenuClose}>
            <ListItemIcon>
              <ShoppingBag fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 300,
            maxHeight: 400,
          },
        }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2" fontWeight={600}>
            Notifications
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNotificationsClose}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Order Shipped
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Your order #12345 has been shipped
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              New Product Alert
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Check out the latest iPhone deals
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              Sale Ending Soon
            </Typography>
            <Typography variant="caption" color="text.secondary">
              50% off on electronics ends today
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;