/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AddressForm, PaymentForm, Review } from '../../components';
import { cleanUpCart } from '../../redux/features/CartSlice';
import { removeCheckoutInfo } from '../../redux/features/CheckoutSlice';

const Checkout = () => {
    const steps = ['Shipping Address', 'Payment Details', 'Review Your Order'];
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (activeStep === steps.length) {
            dispatch(cleanUpCart());
            dispatch(removeCheckoutInfo());
        }
    }, [activeStep]);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentForm />;
            case 2:
                return <Review />;
            default:
                throw new Error('Unknown Step');
        }
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
            <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component='h1' variant='h4' align='center'>
                    Checkout
                </Typography>

                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === steps.length ? (
                    <>
                        <Typography variant='h5' gutterBottom>
                            Thank you for your order.
                        </Typography>

                        <Typography variant='subtitle1'>
                            We have emailed your order confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </>
                ) : (
                    <>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}

                            <Button variant='contained' onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Checkout;
