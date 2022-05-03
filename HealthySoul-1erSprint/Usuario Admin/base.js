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

let na;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
        console.log(user);
        let pos;
        let tipou;
        pos = email.search(/@healthysoul.com/i);
        if (pos < 0) {
            tipou = "amayor"
            window.location.href = "Usuario abuelo/ListaRecetas.html";
        }
    } else {
        if (na == "1") {
            window.location.href = "../index.html";
        } else {
            window.location.href = "../login.html";
            console.log("No logeado")
        }
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        na = "1";
    }).catch((error) => {
        // An error happened.
    });
}