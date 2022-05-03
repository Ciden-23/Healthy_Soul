//variable que se puede declarar en cada archivo que necesite la bd
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd"
  });

var db = firebase.firestore();
//Variables que capturan el id y nombre para borrar receta
var ideBorrar;
var categBorrar;
var nom;
var state="0";
disableS();
//Arreglo con el nombre de las categorias
let categorias = [
    "Almuerzos",
    "Cenas",
    "Desayunos",
    "Ensaladas",
    "Jugos",
    "Meriendas",
];

window.onload = param;

function param(){
    var val=obtenerValor('state');
    var cat=obtenerValor('clase');
    console.log("lo que se obtiene del met", val);
    console.log(cat);
    console.log(val);
    if(val == null || val == "0"){
        console.log("estamos en el index");
       
        inicializar();
    }else{
        console.log("estamos volviendo de una categoria");
        volver(cat);
    }

}

function obtenerValor(sParametroNombre){
    var sPaginaURL=window.location.search.substring(1);
    var sURLVariables= sPaginaURL.split('&');
    for(var i = 0;i<sURLVariables.length ;i++){
        var sParametro=sURLVariables[i].split('=');

        if(sParametro[0]==sParametroNombre){
          return sParametro[1];
        }
    }
    return null;
}

function inicializar(){
    //Usar un for para recorrer los elementos de la lista
    for (let i = 0; i < categorias.length; i++) {
        //Guardar en una variable el nombre de la categoria
        const categ = categorias[i];

        const categRef = db.collection(categ);

        categRef.get().then((results) => {
            const data = results.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            //console.log(data, "datos")
            for (var i = 0; i < data.length; i++) {
                var nom = data[i].Nombre
                    //OBTIENE EL ID DE CADA RECETA DE UNA COLEECION (Aqui deberia verificarse que receta fue elegida por el nombre, y obtener su ID 
                    //para generar un HTML de la receta)
                var ide = data[i].id
                var img = data[i].Imagen
                imagen.innerHTML += `<a href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'&state='${state}'"><div class="tarjeta">
                <img src="${img}">
                <h3>${nom} </h3>
            </div></a>`;
            }
        })
    }
}


function alerta(){
    alert("Funciona");
}

function borrar(ide, categor,nomm) {
    ideBorrar=ide;
    categBorrar=categor; 
    nom=nomm;
    //console.log(ideBorrar,categBorrar,nom)
    const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add('show');
   }
function cancelar(){
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove('show');
    ideBorrar="";
    categBorrar="";
    nom="";
    //console.log(ideBorrar,categBorrar,nom, "eliminadas")
}

function borrarReceta(){
    const modalContainer = document.getElementById("modal-container");
   // alert("Borrar")
   db.collection(categBorrar).doc(ideBorrar).delete().then(() => {
    console.log("Documento borrado exitosamente!");
    modalContainer.classList.remove('show');
    ideBorrar="";
    categBorrar="";
    nom="";
    //console.log(ideBorrar,categBorrar,nom, "eliminadas")
    location.reload();
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}

function volver(categ){
    const categRef = db.collection(categ);
    categRef.get().then((results) => {
        const data = results.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        for (var i = 0; i < data.length; i++) {
            var nom = data[i].Nombre
            var ide = data[i].id
            var img = data[i].Imagen
            imagen.innerHTML += `<a href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'&state='${state}'"><div class="tarjeta">
                      <img src="${img}">
                      <h3>${nom} </h3>
                  </div></a>`;
        }
    })
}

function clasificarCat(categ){
    var container = document.getElementById('imagen');
    let tarj = Array.prototype.slice.call(document.getElementsByClassName("tarjeta"), 0);
    for(element of tarj){
        element.remove();
    }
    state="1";
    const categRef = db.collection(categ);
    categRef.get().then((results) => {
        const data = results.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        for (var i = 0; i < data.length; i++) {
            var nom = data[i].Nombre
            var ide = data[i].id
            var img = data[i].Imagen
            imagen.innerHTML += `<a href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'&state='${state}'"><div class="tarjeta">
            <img src="${img}">
            <h3>${nom} </h3>
        </div></a>`;
        }
    })

}


function aa() {
    const no = document.querySelector(".iconProfile");
    no.style.display = "none";
    const fo = document.querySelector(".fo");
    fo.style.display = "block";
    enableS();
    document.body.style.overflow = "scroll";
    document.body.style.overflowX="hidden";
}

function disableS() {
    // To get the scroll position of current webpage
    TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    
        // if scroll happens, set it to the previous value
        window.onscroll = function() {
            window.scrollTo(LeftScroll, TopScroll);
        };
}

function enableS() {
    window.onscroll = function() {};
}
setTimeout(aa, 3000);

function remplaaa( parama){
    history.pushState({}, null, "ListaRecetas.html?state=1&clase="+parama);

}




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
        if (pos >= 0) {
            tipou = "admin"
            window.location.href = "../Usuario Admin/ListaRecetas.html";
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