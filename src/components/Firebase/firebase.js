import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// import 'firebase/database';
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


class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
        // this.db = app.database();
    }

    // the authentification functionality
    initUserEmailPass = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    };

    signInWithEmailPass = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    signOutUser = () => {
        this.auth.signOut();
    };

    //might not need this. ig it's nice to have nonetheless though
    passReset = email => {
        this.auth.sendPasswordResetEmail(email);
    };
}

export default Firebase;