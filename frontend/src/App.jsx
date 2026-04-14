import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { Toaster } from 'react-hot-toast';

// Theme
import { theme, darkTheme } from './theme/theme';

// Components
import SimpleHome from './components/SimpleHome';
import SimpleNavbar from './components/SimpleNavbar';
import EnhancedSearch from './components/EnhancedSearch';
import ViewProduct from './pages/ViewProduct';
import AuthenticationPage from './pages/AuthenticationPage';
import SellerDashboard from './pages/seller/SellerDashboard';
import Products from './components/Products';
import EnhancedCustomerOrders from './pages/customer/pages/EnhancedCustomerOrders';
import CheckoutSteps from './pages/customer/pages/CheckoutSteps';
import Profile from './pages/customer/pages/Profile';
import Logout from './pages/Logout';
import CheckoutAftermath from './pages/customer/pages/CheckoutAftermath';
import ViewOrder from './pages/customer/pages/ViewOrder';
import CartPage from './pages/customer/pages/CartPage';

// Redux
import { getProducts } from './redux/userHandle';
import { isTokenValid } from './redux/userSlice';

// Global styles
const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.grey[100],
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[400],
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: theme.palette.grey[500],
        },
      },
      '.swiper-pagination-bullet': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.5,
        '&.swiper-pagination-bullet-active': {
          opacity: 1,
        },
      },
      '.swiper-button-next, .swiper-button-prev': {
        color: theme.palette.primary.main,
      },
    })}
  />
);

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, currentToken, currentRole, productData } = useSelector(state => state.user);
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check token validity first
        if (currentToken) {
          dispatch(isTokenValid());
        }

        // Fetch products
        await dispatch(getProducts());

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
          setDarkMode(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [dispatch, currentToken]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const currentTheme = darkMode ? darkTheme : theme;

  // Show loading state during initialization
  if (!isInitialized) {
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: currentTheme.palette.background.default 
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Loading...</h2>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Determine which interface to show
  const showGuestInterface = !isLoggedIn || currentRole === null;
  const showCustomerInterface = isLoggedIn && currentRole === "Customer";
  const showSellerInterface = isLoggedIn && (currentRole === "Seller" || currentRole === "Shopcart");

  console.log('App State:', { isLoggedIn, currentRole, showGuestInterface, showCustomerInterface, showSellerInterface });

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {globalStyles}
      <BrowserRouter>
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: currentTheme.palette.background.paper,
              color: currentTheme.palette.text.primary,
              borderRadius: '12px',
              border: `1px solid ${currentTheme.palette.divider}`,
              fontSize: '14px',
              fontFamily: currentTheme.typography.fontFamily,
            },
            success: {
              iconTheme: {
                primary: currentTheme.palette.success.main,
                secondary: currentTheme.palette.success.contrastText,
              },
            },
            error: {
              iconTheme: {
                primary: currentTheme.palette.error.main,
                secondary: currentTheme.palette.error.contrastText,
              },
            },
          }}
        />

        {/* Guest/Logged Out Interface */}
        {showGuestInterface && (
          <>
            <SimpleNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={<SimpleHome />} />
              <Route path="/Home" element={<SimpleHome />} />

              <Route path="/Products" element={<Products productData={productData} />} />
              <Route path="/product/view/:id" element={<ViewProduct />} />

              <Route path="/Search" element={<EnhancedSearch />} />
              <Route path="/ProductSearch" element={<EnhancedSearch />} />

              <Route path="/Customerregister" element={<AuthenticationPage mode="Register" role="Customer" />} />
              <Route path="/Customerlogin" element={<AuthenticationPage mode="Login" role="Customer" />} />
              <Route path="/Sellerregister" element={<AuthenticationPage mode="Register" role="Seller" />} />
              <Route path="/Sellerlogin" element={<AuthenticationPage mode="Login" role="Seller" />} />
              <Route path="/Authentication" element={<AuthenticationPage mode="Login" role="Customer" />} />
              
              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </>
        )}

        {/* Customer Interface */}
        {showCustomerInterface && (
          <>
            <SimpleNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={<SimpleHome />} />
              <Route path="/Home" element={<SimpleHome />} />

              <Route path="/Products" element={<Products productData={productData} />} />
              <Route path="/product/view/:id" element={<ViewProduct />} />

              <Route path="/Search" element={<EnhancedSearch />} />
              <Route path="/ProductSearch" element={<EnhancedSearch />} />

              <Route path="/Cart" element={<CartPage />} />
              <Route path="/Checkout" element={<CheckoutSteps />} />
              <Route path="/product/buy/:id" element={<CheckoutSteps />} />
              <Route path="/Aftermath" element={<CheckoutAftermath />} />

              <Route path="/Profile" element={<Profile />} />
              <Route path="/Orders" element={<EnhancedCustomerOrders />} />
              <Route path="/order/view/:id" element={<ViewOrder />} />
              <Route path="/Logout" element={<Logout />} />
              
              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </>
        )}

        {/* Seller Interface */}
        {showSellerInterface && (
          <SellerDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;