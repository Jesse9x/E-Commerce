import { Avatar, Box, Button, Container, CssBaseline, Link, TextField, Typography, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { logInWithEmailAndPassword } from '../../firebase/Auth';
import { signInSchema } from './SignInSchema';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: async (values) => {
            await logInWithEmailAndPassword(values.email, values.password);

            navigate('/');
        },
    });

    return (
        <Container maxWidth='xs' component='main'>
            <CssBaseline />

            <Box
                sx={{
                    mt: theme.spacing(10),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>

                <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ width: theme.spacing(50) }}>
                    <TextField
                        margin='normal'
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && (
                        <Typography variant='subtitle2' sx={{ color: 'error.main' }}>
                            {formik.errors.email}
                        </Typography>
                    )}

                    <TextField
                        margin='normal'
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    {formik.errors.password && (
                        <Typography variant='subtitle2' sx={{ color: 'error.main' }}>
                            {formik.errors.password}
                        </Typography>
                    )}

                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>

                    <Link onClick={() => navigate('/register')} variant='body2' sx={{ cursor: 'pointer', mr: 9 }}>
                        Do not have an account? Sign up
                    </Link>

                    <Link onClick={() => navigate('/')} variant='body2' sx={{ cursor: 'pointer' }}>
                        Go To Home
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
