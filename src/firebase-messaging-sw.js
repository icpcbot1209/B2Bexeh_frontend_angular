importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAq3nryW8yb7AknyVZPmdzAceq1Xi-KOK0',
  authDomain: 'superfractor-5e4df.firebaseapp.com',
  databaseURL: 'https://superfractor-5e4df-default-rtdb.firebaseio.com',
  projectId: 'superfractor-5e4df',
  storageBucket: 'superfractor-5e4df.appspot.com',
  messagingSenderId: '359490061017',
  appId: '1:359490061017:web:c0485810df72e6fff834c8',
});

const messaging = firebase.messaging();
