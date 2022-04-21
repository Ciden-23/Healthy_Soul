const nav = document.querySelector('.nav1');
window.addEventListener('scroll',function(){
    nav.classList.toggle('active', window.scrollY >0)
});
const nav3 = document.querySelector('.barramenu');
window.addEventListener('scroll',function(){
    nav3.classList.toggle('active', window.scrollY >0)
});