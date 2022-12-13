import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
    name: Yup.string().max(10, 'Must be 10 characters or less').required('Required'),
    email: Yup.string()
        .required('Required')
        .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid Email'),
    password: Yup.string()
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/,
            ' Password must be between 8 and 15 characters containing at least one lowercase letter, one uppercase letter, one number and one special character'
        ),
});
