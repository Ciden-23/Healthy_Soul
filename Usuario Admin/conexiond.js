var db = firebase.firestore();
var ideBorrar;
var categBorrar;
var nom;
var state="0";
disableS();
let categorias = [
    "Dolores"
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
    db.collection("Dolores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log("------------------");
            console.log(`${doc.id} => ${doc.data().Dolor}`);
            var ide= doc.id
            var nom= doc.data().Dolor;
                console.log(nom);
                console.log(ide);
            imagen.innerHTML += `<div class="tarjeta" id="tarjeta"><a class="refer" href="ListaRemedios.html?tipo=Dolores'&id='${ide}'&state='${state}'">
                <div class="icono"><img src="Assets/icono.png"></div>        
                <div class="tamaño"><h3>${nom}</h3></div>
                <div class="tamaño2"><h3>></h3></div>        
                    </a>
                    </div>`;
        });
    });
}


function alerta(){
    alert("Funciona");
}


  function disableScroll(){  
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function(){ window.scrollTo(x, y) };
}

function enableScroll(){  
    window.onscroll = function() {};
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
            imagen.innerHTML += `<div class="tarjeta" id="tarjeta"><a class="refer" href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'&state='${state}'">
                      <img src="${img}">
                      <div class="tamaño"><h3>${nom}</h3></div>
                  </a>
                  <div>
                  <input type = "button" class="botonBorrar" id="abrir" nombre="${ide}" onclick="borrar('${ide}','${categ}','${nom}');" value="Borrar" style="float: right;"/>
                  </div>
                  </div>`;
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
            imagen.innerHTML += `<div class="tarjeta" id="tarjeta"><a class="refer" href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'&state='${state}'">
                      <img src="${img}">
                      <div class="tamaño"><h3>${nom}</h3></div>
                  </a>
                  <div>
                  <input type = "button" class="botonBorrar" id="abrir" nombre="${ide}" onclick="borrar('${ide}','${categ}','${nom}');" value="Borrar" style="float: right;"/>
                  </div>
                  </div>`;
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

// function cargar(){
//     loader.innerHTML += `<div class="lds-dual-ring" id="loader"></div>`;
//     baa();
// }

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

