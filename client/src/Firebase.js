import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyA0wU6eEb5-Raca0AMeMpAY6Bjqfy-ycWo",
    authDomain: "workout-application-2c6ad.firebaseapp.com",
    projectId: "workout-application-2c6ad",
    storageBucket: "workout-application-2c6ad.appspot.com",
    messagingSenderId: "124744908444",
    appId: "1:124744908444:web:3716c7cb22699e8bb1b759",
    measurementId: "G-E6TJ03WGCJ"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const auth = firebaseapp.auth()
  const db = firebaseapp.database(); 


export {auth, db};