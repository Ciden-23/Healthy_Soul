firebase.initializeApp({
  apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
  authDomain: "healthy-soul-db.firebaseapp.com",
  projectId: "healthy-soul-db",
  storageBucket: "healthy-soul-db.appspot.com",
  messagingSenderId: "368826998840",
  appId: "1:368826998840:web:d97a765e96b27dfeb106cd"
  });
  
//variable que se puede declarar en cada archivo que necesite la bd
  var db = firebase.firestore();