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
  var val=obtenerValor('tipo');
  const v= val.slice(1,-1);
  const vv= v.slice(1,-1);
  const vvv= vv.slice(1,-1); 
  
  
  var val2=obtenerValor('id');
  const v2= val2.slice(1,-1);
  const v22= v2.slice(1,-1);
  const v222= v22.slice(1,-1);
 
  var docRef = db.collection(vvv).doc(v222);
  
  var val3=obtenerValor('state');
  const v3= val3.slice(1,-1);
  const v33= v3.slice(1,-1);
  const v333= v33.slice(1,-1);
  
  
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
    mov();
  //variable que se puede declarar en cada archivo que necesite la bd 
   
  
  
  //const obtener = () => db.collection('Desayunos').get();
  //const contenedor = document.getElementById('contenedor')
  /*const imagen =document.getElementById('myimg');
            imagen.style.height = "300px";
            imagen.src = doc.data().ImgUrl;*/
  
           /* window.onload= function(){
              conection();
           //   changee();
          }
        
          function conection(){
           
            
          }
          //  function changee(){
            
         // }*/     
           docRef.get().then((doc) => {
                if (doc.exists) {
                  const nomb =document.querySelector(".tit");
                  nomb.textContent=  doc.data().Nombre;
                  const next =document.querySelector(".iconProfile");
                  next.src=  doc.data().Imagen;
                  const tex =document.querySelector(".prue");
                  tex.innerHTML +=  `<p class="valor2">  
                  ${saltoPorSeparador2(doc.data().Ingredientes)}
                  </p>`;
                  const prepa =document.querySelector(".prepara");
                  prepa.innerHTML +=  `<p class="valor">  
                  ${saltoPorSeparador2(doc.data().Preparacion)}
                  </p>`;
                  const nutri =document.querySelector(".nutrici");
                  nutri.innerHTML +=  `<p class="valor">  
        ${saltoPorSeparador2(doc.data().ValorNutricional)}
        </p>`;
                  
                } else {
                    // doc.data() will be undefined in this case
                    
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
  
  /*window.addEventListener('DOMContentLoaded', async (e) => {
      const querySnapshot = await obtener()
      querySnapshot.forEach(doc => {
    console.log(doc.data())  
          contenedor.innerHTML +=  `<div>
              ${doc.data().Nombre}
              </div>`;
              contenedor.innerHTML +=  `<div> Porciones: 
              ${doc.data().Porciones}
              </div>`;
              contenedor.innerHTML +=  `<div>Ingredientes: 
              \n${doc.data().Ingredientes}
              </div>`;
              contenedor.innerHTML +=  `<div>Preparación: 
              ${doc.data().Preparacion}
              </div>`;
              contenedor.innerHTML +=  `<div id="valor">Valor Nutriconal: 
              ${doc.data().ValorNutricional}
              </div>`;
              
      })
  })*/
  
  function saltoDeLineaPorciones(texto){
      return texto.replace("</br>"," ")
    }
    function saltoPorSeparador(texto){
      return texto.replace(/-/g,'</br>')
    }
  
    function saltoPorSeparador2(texto){
      return texto.replace(/-/g,'<li/>')
    }
  /*function saltoDeLinea(valorNut){
      for(i=0; i<valorNut.length; i++)
      var letra = valorNut.charAt(i)
       if(letra == '-')
         return valorNut.replace(letra, '<br/>-')
        }*/
  
        
        function mov(){
           if(v333==1){
              
            let xxx =document.querySelector(".x");
            xxx.href="ListaRecetas.html?state=1&clase="+vvv;
           }else{
            if(v333==2){
              let xxx =document.querySelector(".x");
              xxx.href="ListaRecetas.html?state=2&clase=Favoritos";

            }

           }
  
        }




      let uid;
      let na;
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              let displayName = user.displayName;
              let email = user.email;
              let emailVerified = user.emailVerified;
              let photoURL = user.photoURL;
              let isAnonymous = user.isAnonymous;
               uid = user.uid;
              let providerData = user.providerData;
             
              let pos;
              let tipou;
              pos = email.search(/@healthysoul.com/i);
              if (pos >= 0) {
                  tipou = "admin"
                  window.location.href = "Usuario Admin/ListaRecetas.html";
              }
          } else {
              if (na == "1") {
                  window.location.href = "../index.html";
              } else {
                  window.location.href = "../login.html";
                 
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

var stado=false;
	
var cat="Cenas";
var idd="LLKCpfc5pvwhdP3w2PBO";
function inicio(){

  
  //const user = firebase.auth().currentUser;
  //let uidd = user.uid;
  //console.log(uidd);
    var docRefa = db.collection('dattaUser').doc('user').collection(uid).doc('favoritos').collection(vvv).where("id", "==", v222);
  
  docRefa.get().then(function(doc){ 
      if (!doc.empty){
         
       
       stado=true;
       const rojo=document.querySelector(".heartbutton1");
       rojo.style.opacity="0";
       }else {
      console.log(idd);
      console.log("No existe");
       }
    }).catch(function(error) {
      console.log("Error getting document:", error);
  });

}

setTimeout(inicio,2000);
setTimeout(active,3000);
function active(){
  let heart = document.querySelector(".heart") ;
  heart.style.display= "block";
  }	
function anade(){
  const nombree=document.querySelector(".tit").textContent;
  const linkk=document.querySelector(".iconProfile").src;
	const initialData = {
    Nombre: nombree ,
    Imagen: linkk ,
		state: 'liked',
		id:  v222
	  };
if( stado==false){		  		
 /*                         /mismo/         /mismo/            /iduser/   /mismo/                  /categoria/   /IDcomida/                 /se necesita para que funcione/  */
	var res =db.collection('dattaUser').doc('user').collection(uid).doc('favoritos').collection(vvv).doc(v222).set(initialData);	  
	 
	 stado=true;
   const rojo=document.querySelector(".heartbutton1");
   rojo.style.opacity="0";
}else{

	if(stado==true){
	// alert("Borrar")
	var dd= db.collection('dattaUser').doc('user').collection(uid).doc('favoritos').collection(vvv);
	dd.doc(v222).delete();
	stado=false;
  const rojo=document.querySelector(".heartbutton1");
  rojo.style.opacity="1";
}
  

}
 

}


