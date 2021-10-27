import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDwzoW6laU_DCuU3I9Lc7t-s_mCWkAM4jc",
    authDomain: "story-hub-570fe.firebaseapp.com",
    projectId: "story-hub-570fe",
    storageBucket: "story-hub-570fe.appspot.com",
    messagingSenderId: "401045218173",
    appId: "1:401045218173:web:b2744719bfae3fd0b86214"
  };
  // Initialize Firebase 
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()