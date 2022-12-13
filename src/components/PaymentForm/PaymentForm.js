import { Box, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { updatePayment } from '../../redux/features/CheckoutSlice';

const PaymentForm = () => {
    const payment = useSelector((state) => state.checkout?.payment);
    const dispatch = useDispatch();

    const handleChangePayment = (event) => {
        const { name, value } = event.target ?? {};
        dispatch(updatePayment({ [name]: value }));
    };

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Payment Method
            </Typography>

            <Box component='form' onChange={handleChangePayment}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='cardName'
                            name='name'
                            label='Name on card'
                            fullWidth
                            autoComplete='cc-name'
                            variant='standard'
                            defaultValue={payment.name ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='cardNumber'
                            name='cardNumber'
                            label='Card number'
                            fullWidth
                            autoComplete='cc-number'
                            variant='standard'
                            defaultValue={payment.cardNumber ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='expDate'
                            name='expDate'
                            label='Expiry date'
                            fullWidth
                            autoComplete='cc-exp'
                            variant='standard'
                            defaultValue={payment.expDate ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='cvv'
                            name='cvv'
                            label='CVV'
                            fullWidth
                            autoComplete='cc-csc'
                            variant='standard'
                            defaultValue={payment.cvv ?? ''}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PaymentForm;
