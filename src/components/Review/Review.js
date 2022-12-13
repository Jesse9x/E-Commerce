import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Review = () => {
    const cart = useSelector((state) => state.cart.value);
    const address = useSelector((state) => state.checkout?.address);
    const payment = useSelector((state) => state.checkout?.payment);
    const addresses = address ? Object.values(address) : [];
    const payments = payment
        ? [
              { name: 'Card Type', detail: 'Visa' },
              { name: 'Card Number', detail: payment.cardNumber },
              { name: 'Card Name', detail: payment.name },
              { name: 'Expiry Date', detail: payment.expDate },
          ]
        : [];

    const getSubtotal = (cartItem) => {
        return cartItem.reduce((sum, { product, quantity }) => product?.price * quantity + sum, 0);
    };

    return (
        <>
            <Box display='flex' alignItems='center' gap={1}>
                <Typography>
                    <ListAltIcon />
                </Typography>

                <Typography variant='h6' gutterBottom>
                    Order Summary
                </Typography>
            </Box>

            <List disablePadding>
                {cart
                    ? cart.map(({ product, quantity }) => (
                          <>
                              <ListItem key={product?.title} sx={{ py: 1, px: 0 }}>
                                  <ListItemText primary={product?.title} secondary={`Qty: ${quantity}`} />

                                  <Typography variant='body2'>
                                      ${getSubtotal([{ product, quantity }])?.toFixed(2)}
                                  </Typography>
                              </ListItem>
                          </>
                      ))
                    : ''}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary='Total' />

                    <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                        ${getSubtotal(cart)?.toFixed(2)}
                    </Typography>
                </ListItem>
            </List>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>

                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>

                <Grid item container direction='column' xs={12} sm={4}>
                    <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                        Payment Details
                    </Typography>

                    <Grid container flexDirection='column'>
                        {payments.map((payment) => (
                            <Box key={payment.name} display='flex'>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Review;
