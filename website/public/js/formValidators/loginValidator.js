window.addEventListener('load', ()=>{
    let emailError = false;
    const emailCharacts = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const email = document.querySelector('#email')

    const validarCampo = (e) =>{
        if(emailCharacts.test(email.value)){
            // estilo del input
            document.querySelector('#email').classList.remove('input-error')
            document.querySelector('.errors').innerHTML = "";
            emailError = true;
        }else{
            document.querySelector('.errors').innerHTML = "Debes ingresar un e-mail válido";
            // estilo del input
            document.querySelector('#email').classList.add('input-error')
            emailError=false;
        }
        console.log(emailError)
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
    });
})