import {
    Autocomplete,
    Box,
    Button,
    CardActions,
    CardContent,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { useGetCategoriesQuery, useGetProductsQuery } from '../../redux/services/apiSlice';
import { CardDesc, CardImg, CardItem, CardTitle } from './Home.Styled';
import { Slider } from '../../components';
import { addToCart } from '../../redux/features/CartSlice';

const Home = () => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
    const { data: products, isSuccess } = useGetProductsQuery();
    const dispatch = useDispatch();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchChange = (event, value) => {
        setSearchTerm(value?.label);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
    };

    let filterProducts =
        selectedCategory && selectedCategory !== 'all'
            ? products.filter((product) => product?.category === selectedCategory)
            : products;

    filterProducts = searchTerm
        ? filterProducts.filter((product) => product?.title.toLowerCase().includes(searchTerm.toLowerCase()))
        : filterProducts;

    return (
        <>
            <Slider />

            <Container sx={{ mt: 5, display: 'flex' }} maxWidth='md'>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id='demo-simple-select-label'>Category</InputLabel>

                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Category'
                        autoWidth
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        {!isLoadingCategories &&
                            categories?.map((category) => (
                                <MenuItem key={category} value={category} sx={{ textTransform: 'capitalize' }}>
                                    {category}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Autocomplete
                    freeSolo
                    disablePortal
                    id='combo-box-demo'
                    fullWidth
                    onChange={handleSearchChange}
                    options={
                        isSuccess
                            ? Array.from(
                                  selectedCategory === 'all'
                                      ? products
                                      : products.filter((product) => product?.category === selectedCategory),
                                  (product) => ({ id: product?.id, label: product?.title })
                              )
                            : []
                    }
                    renderInput={(params) => <TextField {...params} label='List' />}
                />
            </Container>

            <Container sx={{ py: 8 }} maxWidth='xl'>
                <Grid container spacing={4}>
                    {isSuccess &&
                        filterProducts?.map((product) => (
                            <Grid item key={product?.id} xs={12} sm={6} md={3}>
                                <CardItem>
                                    <CardImg
                                        component='img'
                                        image={product?.image}
                                        alt={product?.title}
                                        sx={{ width: theme.spacing(25), height: theme.spacing(25) }}
                                    ></CardImg>

                                    <CardContent>
                                        <CardTitle variant='h6' gutterBottom my={2}>
                                            {product?.title}
                                        </CardTitle>

                                        <CardDesc mb={3} paragraph>
                                            {product?.description}
                                        </CardDesc>

                                        <Box display='flex' justifyContent='space-between'>
                                            <Typography fontSize='large' fontWeight='500'>
                                                {product?.price}$
                                            </Typography>

                                            <Rating readOnly precision={0.5} value={product?.rating?.rate} />
                                        </Box>
                                    </CardContent>

                                    <CardActions sx={{ alignSelf: 'center', pb: '20px' }} disableSpacing>
                                        <Button variant='contained' onClick={() => handleAddToCart(product)}>
                                            <AddShoppingCartIcon />
                                            Add To Cart
                                        </Button>
                                    </CardActions>
                                </CardItem>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </>
    );
};

export default Home;
