import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4F8Bt2jqsl6_8jv1i6_hIqKqHYCWFjHY",
  authDomain: "user-email-pass-auth12.firebaseapp.com",
  projectId: "user-email-pass-auth12",
  storageBucket: "user-email-pass-auth12.appspot.com",
  messagingSenderId: "730853679393",
  appId: "1:730853679393:web:7772d5e89c1adf76815e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export default auth;