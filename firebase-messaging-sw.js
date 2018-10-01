importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js')
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBuvoYanfQ5eK-q9v41Z2VWNDtq6ZLu7SY",
    authDomain: "olx-pakistan-9905f.firebaseapp.com",
    databaseURL: "https://olx-pakistan-9905f.firebaseio.com",
    projectId: "olx-pakistan-9905f",
    storageBucket: "olx-pakistan-9905f.appspot.com",
    messagingSenderId: "856774290342"
  };
  firebase.initializeApp(config);
  // Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

