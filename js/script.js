//Stick navbar
let header = document.querySelector('headr');
let menu = document.querySelector(#menu-icon);
let navbar = document.querySelector('.navbar');
window.addEventListener('scrooll', () => {
    header.classList.toggle('shadow, window.scrollY > 0');
});
menu.onclick = () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}