import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAK2m8cimiHukGjVlqyPIU5MhZLXr8Y8s8",
    authDomain: "trenesapp-d2fb6.firebaseapp.com",
    databaseURL: "https://trenesapp-d2fb6-default-rtdb.firebaseio.com",
    projectId: "trenesapp-d2fb6",
    storageBucket: "trenesapp-d2fb6.appspot.com",
    messagingSenderId: "721564418447",
    appId: "1:721564418447:web:07e2a1df75580e5d3f8bfa"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// const database = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


