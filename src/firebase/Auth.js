import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

import { auth } from './Firebase';

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (email, password, name) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        updateProfile(user, { name });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logOut = () => {
    signOut(auth);
};
