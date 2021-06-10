import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCbGcZhxJNR5W9S7oGGVgZDqTY3AgQEE1k",
  authDomain: "katelyns-reading-list.firebaseapp.com",
  projectId: "katelyns-reading-list",
  storageBucket: "katelyns-reading-list.appspot.com",
  messagingSenderId: "1059273829128",
  appId: "1:1059273829128:web:65865c0544b89c849f5abd"
};

firebase.initializeApp(firebaseConfig);

export default firebase