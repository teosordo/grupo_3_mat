const iconMenu = document.querySelector('.burger');
iconMenu.addEventListener('mouseover', (e)=>{
    //cambios de estilos
    iconMenu.classList.remove('fa-bars');
    iconMenu.classList.add('fa-home');
})
iconMenu.addEventListener('mouseout', (e)=>{
    //cambios de estilos
    iconMenu.classList.remove('fa-home');
    iconMenu.classList.add('fa-bars');
})