// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/firestore';
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
let firebaseConfig;

if (import.meta.env.VITE_ON_PRODUCTION === "true") {
    firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
    };
} else {
    firebaseConfig = {
        apiKey: import.meta.env.API_KEY,
        authDomain: import.meta.env.AUTH_DOMAIN,
        projectId: import.meta.env.PROJECT_ID,
        storageBucket: import.meta.env.STORAGE_BUCKET,
        messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
        appId: import.meta.env.APP_ID,
    };
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app);


export {
    auth,
    db
}