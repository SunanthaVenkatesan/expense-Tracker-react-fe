
import firebase from 'firebase';
  
const firebaseConfig = {
  apiKey: "AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU",
  authDomain: "react-http-ba0c5.firebaseapp.com",
  databaseURL: "https://react-http-ba0c5-default-rtdb.firebaseio.com",
  projectId: "react-http-ba0c5",
  storageBucket: "react-http-ba0c5.appspot.com",
  messagingSenderId: "542117002880",
  appId: "1:542117002880:web:6f6dc81a0cac0e53d3b065"
};
    
firebase.initializeApp(firebaseConfig);
 var database = firebase.database();
export  var auth=firebase.auth()
export default database
  
