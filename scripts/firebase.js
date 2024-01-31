import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBV5i97GsT1ygsc2HIQ9GyfRMnGlwD_qTc',
  authDomain: 'recipes-28c3d.firebaseapp.com',
  projectId: 'recipes-28c3d',
  storageBucket: 'recipes-28c3d.appspot.com',
  messagingSenderId: '965365013625',
  appId: '1:965365013625:web:c41e6998d8b177e22448a8',
  measurementId: 'G-0K7FJ7LL3Q',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
