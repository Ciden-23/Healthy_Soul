const nav = document.querySelector('.nav1');
window.addEventListener('scroll', function() {
    nav.classList.toggle('active', window.scrollY > 0)
});