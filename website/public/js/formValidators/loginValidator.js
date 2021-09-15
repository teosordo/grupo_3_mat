window.addEventListener('load', ()=>{
    const emailError = false;
    const emailCharacts = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const validarCampo = (e) =>{
        if(emailCharacts.test(email.value)){
            // estilo del input
            document.querySelector('#email').classList.remove('input-error')
            emailError = true;
        }else{
            document.querySelector('.errors').innerHTML = "Debes ingresar un mail válido";
            // estilo del input
            document.querySelector('#email').classList.add('input-error')
        }
        if(emailError==false){
            e.preventDefault();
        }
    }
    //Momentos en donde se corroboran las validaciones
    const inputs = document.querySelectorAll('#loginForm input')
    inputs.forEach((input)=> {
        input.addEventListener('keyup',validarCampo);
        input.addEventListener('blur',validarCampo);
    })
    //Corroboración de validación al enviar el form
    document.querySelector('#loginForm').addEventListener("submit", (e)=>{
        validarCampo();
        if(emailError==false){
            e.preventDefault();
        }
    });
})