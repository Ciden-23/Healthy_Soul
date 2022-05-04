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
  console.log(vvv);
  
  var val2=obtenerValor('id');
  const v2= val2.slice(1,-1);
  const v22= v2.slice(1,-1);
  const v222= v22.slice(1,-1);
  console.log(v222);
  var docRef = db.collection(vvv).doc(v222);
  
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
                    console.log("No such document!");
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
           }
  
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
                  window.location.href = "Usuario Admin/ListaRecetas.html";
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