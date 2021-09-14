window.addEventListener('load', ()=>{
    // SOLO EMAIL
    const campos = {
        email : false,
        password : false,
    }
    const email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validacionLogin = (e)=>{
        switch (e.target.name){
            case "email":
                validarCampo(email, e.target, "email");
                if(campos.email == false){
                    document.querySelector('p.err').innerHTML = "Debes ingresar un mail válido";
                }
            break;
        }
    }
    const validarCampo = (expresion, input, campo) =>{
        if(expresion.test(input.value)){
            // estilo del input
            document.querySelector(`#${campo}`).classList.remove('input-error')
            // estilos del mensaje de error
            document.querySelector(`.err`).classList.remove('viewErrors')
            document.querySelector(`.err`).classList.add('errors')
            campos[campo] = true
        }else{
            // estilo del input
            document.querySelector(`#${campo}`).classList.add('input-error')
            // estilos del mensaje de error
            document.querySelector(`.err`).classList.add('viewErrors')
            document.querySelector(`.err`).classList.remove('errors')
            campos[campo] = false
        }
    }
    //Momentos en donde se corroboran las validaciones
    const inputs = document.querySelectorAll('#loginForm input')
    inputs.forEach((input)=> {
        input.addEventListener('keyup',validacionLogin);
        input.addEventListener('blur',validacionLogin);
    })
    //Corroboración de validación al enviar el form
    document.querySelector('#loginForm').addEventListener("submit", (e)=>{
        if(campos.email == false && campos.password == false){
            e.preventDefault();
        }
    });
})