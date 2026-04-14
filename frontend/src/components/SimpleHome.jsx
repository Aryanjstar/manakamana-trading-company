import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  Skeleton,
  Rating,
  Stack,
} from '@mui/material';
import {
  ArrowForward,
  TrendingUp,
  LocalOffer,
  Star,
  ShoppingCart,
  FlashOn,
  Verified,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../redux/userHandle';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.1)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(8, 4),
  margin: theme.spacing(3, 0),
  position: 'relative',
  overflow: 'hidden',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const DiscountPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  color: theme.palette.success.main,
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 600,
  fontSize: '0.75rem',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const SimpleHome = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productData, loading, error } = useSelector((state) => state.user);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productData && productData.length > 0) {
      // Get featured products (products with highest discount)
      const featured = [...productData]
        .sort((a, b) => (b.price?.discountPercent || 0) - (a.price?.discountPercent || 0))
        .slice(0, 8);
      setFeaturedProducts(featured);

      // Get unique categories
      const uniqueCategories = [...new Set(productData.map(p => p.category))];
      setCategories(uniqueCategories);
    }
  }, [productData]);

  const ProductCard = ({ product, index }) => (
    <StyledCard onClick={() => navigate(`/product/view/${product._id}`)}>
      <Box sx={{ position: 'relative' }}>
        <ProductImage
          image={product.productImage || '/placeholder-image.jpg'}
          title={product.productName}
        />
        {product.price?.discountPercent > 0 && (
          <DiscountBadge
            icon={<LocalOffer />}
            label={`${product.price.discountPercent}% OFF`}
            size="small"
          />
        )}
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.productName}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CategoryChip
            label={product.category}
            size="small"
            variant="outlined"
            color="primary"
          />
          <Rating value={4.5} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            (4.5)
          </Typography>
        </Box>

        <PriceContainer>
          <DiscountPrice>
            ₹{product.price?.cost?.toLocaleString('en-IN')}
          </DiscountPrice>
          {product.price?.discountPercent > 0 && (
            <OriginalPrice>
              ₹{product.price?.mrp?.toLocaleString('en-IN')}
            </OriginalPrice>
          )}
        </PriceContainer>

        <Button
          variant="contained"
          size="small"
          startIcon={<ShoppingCart />}
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </StyledCard>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={24} />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Skeleton variant="text" height={32} width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Unable to load products. Please try again later.
        </Typography>
        <Button
          variant="contained"
          onClick={() => dispatch(getProducts())}
          startIcon={<TrendingUp />}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Discover Amazing Products
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
                Shop from thousands of products across multiple categories with the best deals and fastest delivery.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={Link}
                  to="/Products"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  }}
                >
                  Explore Products
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/ProductSearch"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                  }}
                >
                  Search
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StatsBox>
                    <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {productData?.length || 0}+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Products
                    </Typography>
                  </StatsBox>
                </Grid>
                <Grid item xs={6}>
                  <StatsBox>
                    <Verified sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {categories.length}+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Categories
                    </Typography>
                  </StatsBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h3" align="center" fontWeight={700} sx={{ mb: 6 }}>
          Why Choose ShopCart?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <FlashOn sx={{ fontSize: 48, color: 'warning.main' }} />,
              title: 'Fast Delivery',
              description: 'Get your products delivered within 24 hours with our express delivery service.',
            },
            {
              icon: <Verified sx={{ fontSize: 48, color: 'success.main' }} />,
              title: 'Quality Assured',
              description: 'All products are verified and quality checked before shipping to customers.',
            },
            {
              icon: <Star sx={{ fontSize: 48, color: 'primary.main' }} />,
              title: 'Best Prices',
              description: 'Competitive prices with regular discounts and offers on all categories.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureBox>
                {feature.icon}
                <Typography variant="h5" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureBox>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {featuredProducts.length > 0 && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box>
                <Typography variant="h3" fontWeight={700}>
                  Featured Products
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Discover our top picks with the best deals
                </Typography>
              </Box>
              <Button
                variant="outlined"
                endIcon={<ArrowForward />}
                component={Link}
                to="/Products"
              >
                View All
              </Button>
            </Box>

            <Grid container spacing={3}>
              {featuredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <ProductCard product={product} index={index} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <>
            <Box sx={{ mt: 8, mb: 4 }}>
              <Typography variant="h3" fontWeight={700}>
                Shop by Category
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              {categories.map((category, index) => (
                <Grid item key={category}>
                  <CategoryChip
                    label={category}
                    variant="outlined"
                    clickable
                    size="large"
                    onClick={() => navigate(`/ProductSearch?category=${encodeURIComponent(category)}`)}
                    sx={{
                      py: 2,
                      px: 3,
                      fontSize: '1rem',
                      fontWeight: 500,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default SimpleHome;