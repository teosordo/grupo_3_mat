window.onload = () => {
    const iconMenu = document.querySelector('.burger');
    const hamburguerMenu = document.querySelector('#navbar');

    iconMenu.addEventListener('mouseover', (e)=>{
        //cambios de estilos
        hamburguerMenu.classList.toggle('activeMenu');
    })
}