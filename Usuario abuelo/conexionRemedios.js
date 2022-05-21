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
/*
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

}*/

var val2=obtenerValor('id');
  const v2= val2.slice(1,-1);
  const v22= v2.slice(1,-1);
  const v222= v22.slice(1,-1);
  var idRem=v222;
  console.log(idRem);
   
 // var docRef = db.collection(vvv).doc(v222);
  
  var val3=obtenerValor('state');
  const v3= val3.slice(1,-1);
  const v33= v3.slice(1,-1);
  const v333= v33.slice(1,-1);
  console.log(v333);

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


    db.collection("Dolores").doc(idRem).collection("Remedios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var ide =doc.id;
            var nom =doc.data().Nombre;
            var img = doc.data().Imagen;
            //console.log(ide);
            //console.log(nom);
            //OBTIENE EL ID DE CADA RECETA DE UN REMEDIO 
            imagen.innerHTML += `<div class="tarjeta" id="tarjeta"><a class="refer" href="ModeloRecetaGeneral3.html?id='${ide}'&id2='${v222}'">
                        <img src="${img}">
                        <div class="tamaño"><h3>${nom}</h3></div>
                    </a>
                    
                    </div>`;
        });

    });



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

function clasificarCat(categ){
    ocultar();
    cargar();
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

function ocultar(){
    var a= document.querySelector(".menu li:hover .desplegable");
    a.style.display = "none";
    setTimeout(mostrar, 500);
    
}

function mostrar(){
    var a= document.querySelector(".menu  .desplegable");
    a.style.display= "block";
    a.style.visibility="hidden"
}


const men= document.querySelector(".menu");
men.addEventListener("click", function(){
    var a= document.querySelector(".menu li:hover .desplegable");
    a.style.visibility="visible"; 
})

function cargar(){
    loader.innerHTML += `<div class="lds-dual-ring" id="loader"></div>`;
    baa();
}

function baa(){
    var no = document.querySelector(".lds-dual-ring");
    no.style.display = "block";
    var fo = document.querySelector(".fo");
    fo.style.display = "none";
    var x = document.querySelector(".contenedor");
    x.style.display = "none";
    disableS();
    
    setTimeout(bb, 800);
}

function bb() {
    var no = document.querySelector(".lds-dual-ring");
    no.style.display = "none";
    var x = document.querySelector(".contenedor");
    x.style.display = "block";
    var fo = document.querySelector(".fo");
    fo.style.display = "block";
    enableS();
    document.body.style.overflow = "scroll";
    document.body.style.overflowX="hidden";
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
