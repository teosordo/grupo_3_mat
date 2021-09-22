window.addEventListener('load', ()=>{
    const cancelButton = document.querySelector('#cancel-button');
    
    // viaja a la página previa
    cancelButton.addEventListener("click", () => {
        window.history.back();
    })
})