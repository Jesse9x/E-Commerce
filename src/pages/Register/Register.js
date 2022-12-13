import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { registerWithEmailAndPassword } from '../../firebase/Auth';
import { signUpSchema } from './SignUpSchema';

const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: signUpSchema,
        onSubmit: async (values) => {
            await registerWithEmailAndPassword(values.email, values.password, values.name);

            navigate('/login');
        },
    });

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>

                <Box
                    component='form'
                    noValidate
                    sx={{ mt: 3, width: theme.spacing(50) }}
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='given-name'
                                name='name'
                                required
                                fullWidth
                                id='name'
                                label='Name'
                                autoFocus
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />

                            {formik.errors.name && (
                                <Typography variant='subtitle2' sx={{ color: 'error.main' }}>
                                    {formik.errors.name}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoComplete='email'
                                name='email'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />

                            {formik.errors.email && (
                                <Typography variant='subtitle2' sx={{ color: 'error.main' }}>
                                    {formik.errors.email}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='password'
                                autoComplete='new-password'
                                name='password'
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />

                            {formik.errors.password && (
                                <Typography variant='subtitle2' sx={{ color: 'error.main' }}>
                                    {formik.errors.password}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>

                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link onClick={() => navigate('/login')} variant='body2' sx={{ cursor: 'pointer' }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
