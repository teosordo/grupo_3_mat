window.onload = () => {
    const iconMenu = document.querySelector('.burger');
    const linkIcono = document.querySelector('#linkBurguer');
    const hamburguerMenu = document.querySelector('#navbar');
    
    iconMenu.addEventListener('click', (e)=>{
        //cambios de estilos
        hamburguerMenu.classList.toggle('activeMenu');
    })
}