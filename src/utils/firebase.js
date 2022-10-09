// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBahlQII8O_J7Q6VIrFU8CJMn97Id2cVfw",
  authDomain: "fabrik-demo-ef836.firebaseapp.com",
  projectId: "fabrik-demo-ef836",
  storageBucket: "fabrik-demo-ef836.appspot.com",
  messagingSenderId: "323757204572",
  appId: "1:323757204572:web:ea4eefb28d110ecc5d7299",
  measurementId: "G-3ND59G07KW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  Initializing the storage 
const storage = getStorage(app);

export default storage;