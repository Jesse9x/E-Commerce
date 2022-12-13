import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email').email('Invalid Email'),
    password: Yup.string().required('Please enter your password'),
});
