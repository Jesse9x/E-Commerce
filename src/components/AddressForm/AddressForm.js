import { Grid, Typography, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { updateAddress } from '../../redux/features/CheckoutSlice';

const AddressForm = () => {
    const address = useSelector((state) => state.checkout?.address);
    const dispatch = useDispatch();

    const handleChangeAddress = (event) => {
        const { name, value } = event.target ?? {};
        dispatch(updateAddress({ [name]: value }));
    };

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping Address
            </Typography>

            <Box component='form' onChange={handleChangeAddress}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='firstName'
                            name='firstName'
                            label='First name'
                            fullWidth
                            autoComplete='given-name'
                            variant='standard'
                            defaultValue={address.firstName ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='lastName'
                            name='lastName'
                            label='Last name'
                            fullWidth
                            autoComplete='family-name'
                            variant='standard'
                            defaultValue={address.lastName ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id='address1'
                            name='address1'
                            label='Address line 1'
                            fullWidth
                            autoComplete='shipping address-line1'
                            variant='standard'
                            defaultValue={address.address ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id='address2'
                            name='address2'
                            label='Address line 2'
                            fullWidth
                            autoComplete='shipping address-line2'
                            variant='standard'
                            defaultValue={address.address2 ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='city'
                            name='city'
                            label='City'
                            fullWidth
                            autoComplete='shipping address-level2'
                            variant='standard'
                            defaultValue={address.city ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='zip'
                            name='zip'
                            label='Zip / Postal code'
                            fullWidth
                            autoComplete='shipping postal-code'
                            variant='standard'
                            defaultValue={address.zip ?? ''}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='country'
                            name='country'
                            label='Country'
                            fullWidth
                            autoComplete='shipping country'
                            variant='standard'
                            defaultValue={address.country ?? ''}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AddressForm;
