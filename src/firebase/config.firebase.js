
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBogrTYMXNi7DBRFlqO6ktLGbtbn_nCRs4",
  authDomain: "aide-auth.firebaseapp.com",
  projectId: "aide-auth",
  storageBucket: "aide-auth.appspot.com",
  messagingSenderId: "685294774639",
  appId: "1:685294774639:web:b968e39f0c0d0e6f19e09a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;