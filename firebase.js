import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYvGhRDqGyTxJ0U4gUwuKJygUlYSvAWjA",
  authDomain: "rn-socialmediaapp.firebaseapp.com",
  projectId: "rn-socialmediaapp",
  storageBucket: "rn-socialmediaapp.appspot.com",
  messagingSenderId: "491348151485",
  appId: "1:491348151485:web:f1780bdccff85bd8af3bd4",
  measurementId: "G-1W43DY1C3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };
