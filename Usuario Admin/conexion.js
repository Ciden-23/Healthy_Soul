//variable que se puede declarar en cada archivo que necesite la bd


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
    
    if(val == null || val == "0"){
        
       
        inicializar();
    }else{
       
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

function borrar(ide, categor,nomm) {
    //window.addEventListener('scroll', disableScroll);
    disableScroll();

    ideBorrar=ide;
    categBorrar=categor; 
    nom=nomm;
    //console.log(ideBorrar,categBorrar,nom)
    const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add('show');
   }
function cancelar(){

   // window.addEventListener('scroll', enableScroll);
   enableScroll();
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove('show');
    ideBorrar="";
    categBorrar=""; 

    nom="";
    //console.log(ideBorrar,categBorrar,nom, "eliminadas")
}

function borrarReceta(){

    //window.addEventListener('scroll', enableScroll);  
    enableScroll();
    const modalContainer = document.getElementById("modal-container");
   // alert("Borrar")
   db.collection(categBorrar).doc(ideBorrar).delete().then(() => {
    
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
    apagado=true;
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

var apagado=true;
var tipo= document.getElementById("mennu");
tipo.addEventListener('click',function(){
    var a= document.querySelector(".menu li:hover .desplegable");
     if(apagado){
        a.style.display= "block";
        a.style.visibility="hidden"
        apagado=false;
     }else{
        a.style.display = "none";
        apagado=true;
     }
})

var delRegistro=true;
var mm= document.getElementById("mennuRegistro");
mm.addEventListener('click',function(){
    var a= document.querySelector(".menu li:hover .desplegable");
     if(delRegistro){
        a.style.display= "block";
        a.style.visibility="hidden"
        delRegistro=false;
     }else{
        a.style.display = "none";
        delRegistro=true;
     }
})

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

