// Falta validación de contraseñas
// Como correr las validaciones desde submit en lugar de input por input
window.addEventListener('load', ()=>{
    const campos = {
        firstName: false,
        lastName: false,
        email : false,
        username : false,
        password : false,
        passwordConfirm: false,
        avatar : true
    }
    const expresiones = {
        name: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
        username: /^[a-zA-Z0-9\_\-]{5,10}$/,
        password: /^[a-zA-Z0-9!,._-]{8,}$/, // /^(?=.[0-9])(?=.[!,._-])[a-zA-Z0-9!,._-]{8,}$/
        avatar: /(\.jpg|\.jpeg|\.png)$/i,
    }
    const validacionRegister = (e)=>{
        console.log(e.target)
        switch (e.target.name){
            case "firstName":
                validarCampo(expresiones.name, e.target, "firstName", "fn");
                validarNombreCompleto(firstName, "firstName", "fn");
            break;
            case "lastName":
                validarCampo(expresiones.name, e.target, "lastName", "ln");
                validarNombreCompleto(lastName, "lastName", "ln");
            break;
            case "email":
                validarCampo(expresiones.email, e.target, "email", "em");
                if(campos.email == false){
                    document.querySelector('p.em').innerHTML = "Debes ingresar un e-mail válido.";
                }
            break;
            case "username":
                validarCampo(expresiones.username, e.target, "username", "un");
                if(username.value.length < 5 || username.value.length > 10){
                    document.querySelector('p.un').innerHTML = "Tu usuario debe tener de 5 a 10 caracteres.";
                }else if(campos.username == false){
                    document.querySelector('p.un').innerHTML = "Debes ingresar letras y/o carácteres especiales como: '-' y/o '_'";
                }
            break;
            case "password":
                validarCampo(expresiones.password, e.target, "password", "pw")
                if(password.value.length < 8){
                    document.querySelector('p.pw').innerHTML = "Tu contraseña debe tener mínimo 8 caracteres";
                } else if(campos.password == false){
                    document.querySelector('p.pw').innerHTML = "Debes ingresar letras, números y carácteres especiales como: <em>!,._-</em>";
                }
            break;
            case "passwordConfirm":
                if(passwordConfirm.value !== password.value){
                    document.querySelector('p.pwc').innerHTML = "Las contraseñas deben ser iguales";
                    // estilo del input
                    document.querySelector("#passwordConfirm").classList.add('input-error')
                    // estilos del mensaje de error
                    document.querySelector(".pwc").classList.add('viewErrors')
                    document.querySelector(".pwc").classList.remove('errors')
                    campos.passwordConfirm = false
                } else {
                    // estilo del input
                    document.querySelector("#passwordConfirm").classList.remove('input-error')
                    // estilos del mensaje de error
                    document.querySelector(".pwc").classList.remove('viewErrors')
                    document.querySelector(".pwc").classList.add('errors')
                    campos.passwordConfirm = true
                }
            break;
            case "avatar":
                validarCampo(expresiones.avatar, e.target, "avatar", "a");
                if(campos.avatar == false) {
                    document.querySelector('p.a').innerHTML = "Debes ingresar archivos .jpg .jpeg o .png"
                }
            break;
        }
    }
    const validarCampo = (expresion, input, campo, clase) =>{
        if(expresion.test(input.value) && avatar.value == ''){
            // estilo del input
            document.querySelector(`#${campo}`).classList.remove('input-error')
            // estilos del mensaje de error
            document.querySelector(`.${clase}`).classList.remove('viewErrors')
            document.querySelector(`.${clase}`).classList.add('errors')
            campos[campo] = true
        }else if(!expresion.test(input.value) || firstName.value.length < 2 || firstName.value.length > 20 || lastName.value.length < 2 || lastName.value.length > 20 || username.value.length < 5 || username.value.length > 10 || password.value.length < 8){
            // estilo del input
            document.querySelector(`#${campo}`).classList.add('input-error')
            // estilos del mensaje de error
            document.querySelector(`.${clase}`).classList.add('viewErrors')
            document.querySelector(`.${clase}`).classList.remove('errors')
            campos[campo] = false
        }
    }
    const validarNombreCompleto = (valor, campo, clase)=>{
        if(valor.value == ''){
            document.querySelector(`.${clase}`).innerHTML = "!!!!!!";
        } else if(valor.value.length < 2 || valor.value.length > 20){
            document.querySelector(`.${clase}`).innerHTML = "Debes ingresar entre 2 a 20 letras";
        }else if(campos[campo] == false){
            document.querySelector(`.${clase}`).innerHTML = "Debes ingresar sólo letras.";
        }
    }
    //Momentos en donde se corroboran las validaciones
    const inputs = document.querySelectorAll('#registerForm input')
    inputs.forEach((input)=> {
        input.addEventListener('keyup',validacionRegister);
        input.addEventListener('blur',validacionRegister);
    })
    //Corroboración de validación al enviar el form
    document.querySelector('#registerForm').addEventListener("submit", (e)=>{
        for (const campo in campos){
            console.log(`${campo}: ${campos[campo]}`)
            if(campos[campo] == false){
                e.preventDefault();
            }
        }
    });
})