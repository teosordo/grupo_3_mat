window.onload = () => {
    const iconMenu = document.querySelector('.burger');
    const hamburguerMenu = document.querySelector('#navbar');
    
    const nombres = document.querySelectorAll('.catName');
    const iconInfo = document.querySelectorAll('.fa-info-circle')
  
    //cambios de estilos del hamburguesa
    iconMenu.addEventListener('click', (e)=>{
        hamburguerMenu.classList.toggle('activeMenu');
    })

    //Estilos de detalle de categorias
    iconInfo.forEach(icon =>{
        icon.addEventListener('click', ()=>{

            icon.parentElement.classList.remove('catSelected')

            nombres.forEach(nombre =>{
                if(!nombre.classList.contains('catSelected')){
                    nombre.nextElementSibling.classList.toggle('detailCat')
                    icon.parentElement.classList.add('catSelected')
                }
            })
        })
    })
}