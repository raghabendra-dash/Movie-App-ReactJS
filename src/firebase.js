
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC7eLWcelq2SWHN-b8bB84ui0ANDO1VscU",
    authDomain: "movie-app-3a9f5.firebaseapp.com",
    projectId: "movie-app-3a9f5",
    storageBucket: "movie-app-3a9f5.appspot.com",
    messagingSenderId: "43889613033",
    appId: "1:43889613033:web:fbf4b87e0f27160f0ab878"
  };


const app = firebase.initializeApp(firebaseConfig);
export default app;