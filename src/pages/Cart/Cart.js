import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    Grid,
    Rating,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { decreaseCart, deleteToCart, increaseCart } from '../../redux/features/CartSlice';
import { auth } from '../../firebase/Firebase';

const Cart = () => {
    const theme = useTheme();
    const cartItem = useSelector((state) => state.cart?.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const getSubtotal = (cartItem) => {
        return cartItem.reduce((sum, { product, quantity }) => product?.price * quantity + sum, 0);
    };

    const subTotal = getSubtotal(cartItem)?.toFixed(2);

    const handleQuantityUpdate = (e, { product, quantity }) => {
        const updateQuantity = e.target.valueAsNumber;

        if (updateQuantity > quantity) {
            dispatch(increaseCart({ product }));
        } else {
            dispatch(decreaseCart({ product }));
        }
    };

    const handleDeleteCart = ({ product }) => {
        dispatch(deleteToCart({ product }));
    };

    return (
        <Container maxWidth='lg' sx={{ py: 5 }}>
            <Grid container spacing={3}>
                <Grid item container spacing={2} md={8}>
                    {cartItem.map(({ product, quantity }) => {
                        return (
                            <Grid item key={product?.id} xs={12} sx={{ mb: 2 }}>
                                <Card sx={{ display: { xs: 'block', sm: 'flex' }, py: 2 }}>
                                    <CardMedia
                                        component='img'
                                        image={product?.image}
                                        sx={{
                                            width: theme.spacing(30),
                                            height: theme.spacing(30),
                                            objectFit: 'contain',
                                        }}
                                        alt={product?.title}
                                    />

                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Stack spacing={2}>
                                            <Typography>{product?.title}</Typography>

                                            <Rating readOnly precision={0.5} value={product?.rating?.rate} />

                                            <FormControl>
                                                <TextField
                                                    inputProps={{ min: 1 }}
                                                    id={`${product?.id}-product-id`}
                                                    value={product?.quantity}
                                                    label='Quantity'
                                                    sx={{ width: theme.spacing(15) }}
                                                    type='number'
                                                    variant='standard'
                                                    onChange={(e) => handleQuantityUpdate(e, { product, quantity })}
                                                />
                                            </FormControl>

                                            <Button
                                                variant='contained'
                                                sx={{ width: theme.spacing(30) }}
                                                onClick={() => handleDeleteCart({ product })}
                                            >
                                                Delete Product
                                            </Button>
                                        </Stack>

                                        <Box>
                                            <Typography variant='h6' paragraph>
                                                {getSubtotal([{ product, quantity }]).toFixed(2)}$
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                <Grid item md={4} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%' }}>
                        <Card sx={{ p: 2, display: 'flex', gap: 2, flexDirection: 'column' }}>
                            <Typography variant='h6'>Subtotal:</Typography>

                            <Typography variant='h6'>{subTotal}$</Typography>

                            {subTotal > 0 ? (
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        user ? navigate('/checkout') : navigate('/login');
                                    }}
                                >
                                    Buy Now
                                </Button>
                            ) : (
                                <Button variant='contained' onClick={() => navigate('/')}>
                                    Shop Products
                                </Button>
                            )}
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
