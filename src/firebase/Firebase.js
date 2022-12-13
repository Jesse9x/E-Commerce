import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCT4U6yXXLaqjo9lD6-cHCjMscFVGTltuY',
    authDomain: 'e-commerce-efd8e.firebaseapp.com',
    projectId: 'e-commerce-efd8e',
    storageBucket: 'e-commerce-efd8e.appspot.com',
    messagingSenderId: '540922619471',
    appId: '1:540922619471:web:29caec939761b17d08ec3a',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
