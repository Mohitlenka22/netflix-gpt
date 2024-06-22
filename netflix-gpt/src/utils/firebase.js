// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFB-5wbAwO6AJA4ZJuqpP-PrIV_NQhDf4',
  authDomain: 'netflix-gpt-e1a12.firebaseapp.com',
  projectId: 'netflix-gpt-e1a12',
  storageBucket: 'netflix-gpt-e1a12.appspot.com',
  messagingSenderId: '122066414847',
  appId: '1:122066414847:web:e05bcf84061aefe036f0ca',
  measurementId: 'G-S2NM04S1L7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
