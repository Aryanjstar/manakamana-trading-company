import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Search,
  Home,
  Store,
  Dashboard,
  Logout,
  Login,
} from '@mui/icons-material'; // <--- CORRECTED IMPORT PATH
import { styled, alpha } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userSlice'; // This will now work

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.5rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  cursor: 'pointer',
  textDecoration: 'none',
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const SimpleNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, currentRole } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    handleMenuClose();
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <Store />, path: '/Products' },
    { text: 'Search', icon: <Search />, path: '/ProductSearch' },
  ];

  if (currentUser && currentRole === 'Seller') {
    menuItems.push({ text: 'Dashboard', icon: <Dashboard />, path: '/Seller' });
  }

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {currentUser ? (
          <>
            <ListItem button onClick={() => navigate('/Profile')}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/Authentication">
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Logo component={Link} to="/" variant="h6">
              ShopCart
            </Logo>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                  <NavButton
                    key={item.text}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </NavButton>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {currentUser && currentRole === 'Customer' && (
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/Cart"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <Badge badgeContent={currentUser?.cartDetails?.length || 0} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              )}

              {currentUser ? (
                <>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '0.875rem',
                      }}
                    >
                      {currentUser.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        minWidth: 200,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <MenuItem onClick={() => { navigate('/Profile'); handleMenuClose(); }}>
                      <Person sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    {currentRole === 'Customer' && (
                      <MenuItem onClick={() => { navigate('/Orders'); handleMenuClose(); }}>
                        <ShoppingCart sx={{ mr: 1 }} />
                        My Orders
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <NavButton
                  component={Link}
                  to="/Authentication"
                  variant="contained"
                  startIcon={<Person />}
                >
                  Login
                </NavButton>
              )}

              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            borderRadius: '16px 0 0 16px',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default SimpleNavbar;