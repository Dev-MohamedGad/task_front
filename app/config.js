
// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDInAXZjbBTRPG1wo8ducPH92d29w-tpC8",
  authDomain: "tasknextjs.firebaseapp.com",
  projectId: "tasknextjs",
  storageBucket: "tasknextjs.appspot.com",
  messagingSenderId: "497819387693",
  appId: "1:497819387693:web:30880945192d0301e175a4",
  measurementId: "G-192QCEPXQZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };

