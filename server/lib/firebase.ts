// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeofcuKAVLEIiuxcbMh-iywKf3PS7i3l8",
    authDomain: "nuxt-app-80f59.firebaseapp.com",
    projectId: "nuxt-app-80f59",
    storageBucket: "nuxt-app-80f59.appspot.com",
    messagingSenderId: "668205466081",
    appId: "1:668205466081:web:6d1fa0748555a0da8212a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);