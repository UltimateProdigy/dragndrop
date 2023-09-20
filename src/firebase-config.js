import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "dragndrop-c88c6.firebaseapp.com",
    projectId: "dragndrop-c88c6",
    storageBucket: "dragndrop-c88c6.appspot.com",
    messagingSenderId: "63195156998",
    appId: "1:63195156998:web:1c9561e8a9dd85401fa987",
    measurementId: "G-WSTVT6PQDK"
  };

  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);