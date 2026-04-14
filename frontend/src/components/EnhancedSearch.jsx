import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  Button,
  Chip,
  Rating,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Skeleton,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear,
  ExpandMore,
  ShoppingCart,
  Favorite,
  LocalOffer,
  TrendingUp,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProducts } from '../redux/userHandle';

const SearchContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    padding: theme.spacing(2),
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
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

const FilterButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(1, 2),
  fontWeight: 600,
}));

const EnhancedSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { productData, loading } = useSelector((state) => state.user);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Categories and brands from data
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productData && productData.length > 0) {
      // Extract unique categories and brands
      const uniqueCategories = [...new Set(productData.map(p => p.category))];
      const uniqueBrands = [...new Set(productData.map(p => p.brand || 'Unknown'))];
      
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
      setFilteredProducts(productData);
      
      // Set initial price range based on data
      const prices = productData.map(p => p.price?.cost || 0);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [productData]);

  // Apply filters
  useEffect(() => {
    if (!productData) return;

    let filtered = [...productData];

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.price?.cost || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand || 'Unknown')
      );
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(product => {
        const avgRating = product.reviews && product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0;
        return avgRating >= minRating;
      });
    }

    setFilteredProducts(filtered);
  }, [productData, searchTerm, selectedCategory, priceRange, selectedBrands, minRating]);

  // Apply sorting
  useEffect(() => {
    let sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.price?.cost || 0) - (b.price?.cost || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.price?.cost || 0) - (a.price?.cost || 0));
        break;
      case 'rating':
        sorted.sort((a, b) => {
          const aRating = a.reviews?.length > 0 
            ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length 
            : 0;
          const bRating = b.reviews?.length > 0 
            ? b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length 
            : 0;
          return bRating - aRating;
        });
        break;
      case 'discount':
        sorted.sort((a, b) => (b.price?.discountPercent || 0) - (a.price?.discountPercent || 0));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setDisplayedProducts(sorted);
  }, [filteredProducts, sortBy]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    updateSearchParams({ search: value });
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    updateSearchParams({ category: value });
  };

  const handleBrandToggle = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
  };

  const updateSearchParams = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setMinRating(0);
    setSortBy('relevance');
    setSearchParams(new URLSearchParams());
  };

  const ProductCardComponent = ({ product }) => {
    const avgRating = product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 4.5;

    return (
      <ProductCard onClick={() => navigate(`/product/view/${product._id}`)}>
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
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: alpha('#fff', 0.9),
              '&:hover': { backgroundColor: '#fff' },
            }}
            size="small"
          >
            <Favorite />
          </IconButton>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
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
            <Rating value={avgRating} size="small" readOnly precision={0.5} />
            <Typography variant="caption" color="text.secondary">
              ({product.reviews?.length || 0})
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
      </ProductCard>
    );
  };

  const FilterSidebar = () => (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Filters
        </Typography>
        <Button onClick={clearFilters} size="small" startIcon={<Clear />}>
          Clear All
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Category Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={600}>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Price Range Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={600}>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
              valueLabelFormat={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">
                ₹{priceRange[0].toLocaleString('en-IN')}
              </Typography>
              <Typography variant="caption">
                ₹{priceRange[1].toLocaleString('en-IN')}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Rating Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography fontWeight={600}>Minimum Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[4, 3, 2, 1].map((rating) => (
              <FormControlLabel
                key={rating}
                control={
                  <Checkbox
                    checked={minRating === rating}
                    onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={rating} size="small" readOnly />
                    <Typography variant="body2">& above</Typography>
                  </Box>
                }
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Brands</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 200, overflow: 'auto' }}>
              {brands.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                    />
                  }
                  label={brand}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );

  if (loading) {
    return (
      <SearchContainer maxWidth="xl">
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
      </SearchContainer>
    );
  }

  return (
    <SearchContainer maxWidth="xl">
      {/* Search Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Search Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing products with advanced search and filtering
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search for products, brands, categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm('')} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: '#fff',
            },
          }}
        />
      </Box>

      {/* Filter Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FilterButton
            variant={showFilters ? 'contained' : 'outlined'}
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </FilterButton>
          
          {selectedCategory && (
            <Chip
              label={`Category: ${selectedCategory}`}
              onDelete={() => setSelectedCategory('')}
              color="primary"
            />
          )}
          
          {selectedBrands.length > 0 && (
            <Chip
              label={`${selectedBrands.length} Brand${selectedBrands.length > 1 ? 's' : ''} selected`}
              onDelete={() => setSelectedBrands([])}
              color="primary"
            />
          )}
        </Box>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Customer Rating</MenuItem>
            <MenuItem value="discount">Discount</MenuItem>
            <MenuItem value="newest">Newest First</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showing {displayedProducts.length} of {productData?.length || 0} products
      </Typography>

      <Grid container spacing={3}>
        {/* Desktop Filter Sidebar */}
        {!isMobile && showFilters && (
          <Grid item md={3}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <FilterSidebar />
            </Card>
          </Grid>
        )}

        {/* Products Grid */}
        <Grid item xs={12} md={showFilters && !isMobile ? 9 : 12}>
          {displayedProducts.length > 0 ? (
            <Grid container spacing={3}>
              {displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={showFilters && !isMobile ? 4 : 3} key={product._id}>
                  <ProductCardComponent product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search or filter criteria
              </Typography>
              <Button variant="contained" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        anchor="right"
        open={showFilters && isMobile}
        onClose={() => setShowFilters(false)}
      >
        <FilterSidebar />
      </FilterDrawer>
    </SearchContainer>
  );
};

export default EnhancedSearch;