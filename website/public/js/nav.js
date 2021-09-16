const iconMenu = document.querySelector('.burger');
const hamburguerMenu = document.querySelector('#navbar');

iconMenu.addEventListener('click', (e)=>{
    //cambios de estilos
    hamburguerMenu.classList.toggle('active');
})