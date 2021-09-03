window.addEventListener('load', function(){
    let form = document.querySelector('#useredit');
    form.addEventListener("submit", function(e){
        //VALIDACIÓN DE NOMBRE - el campo debe estar completo por al menos dos caracteres
        let errorNombre = [];
        let firstName = document.querySelector('#firstName');
        if(firstName.value == ''){
            errorNombre.push('Completá con tu nombre.')
        } else if(firstName.value.length <= 1){
            errorNombre.push('Tu nombre debe tener al menos 2 letras.')
        }
        //Si hay errores los muestra
        if(errorNombre.length > 0){
            e.preventDefault()
            let error = document.querySelector('#errorFirstName');
            for(let i = 0; i < errorNombre.length; i++){
                error.innerHTML = `<p class="errors">${errorNombre[i]}</p>`;
            }
        }

        //VALIDACIÓN DE APELLIDO - el campo debe estar completo por al menos dos caracteres
        let errorApellido = [];
        let lastName = document.querySelector('#lastName');
        if(lastName.value == ''){
            errorApellido.push('Completá con tu apellido.')
        } else if(lastName.value.length <= 1){
            errorApellido.push('Tu apellido debe tener al menos 2 letras.')
        }
        //Si hay errores los muestra
        if(errorApellido.length > 0){
            e.preventDefault()
            //Selecciono la sección de errores y agrego una nueva linea de texto
            let error = document.querySelector('#errorLastName');
            for(let i = 0; i < errorApellido.length; i++){
                error.innerHTML = `<p class="errors">${errorApellido[i]}</p>`;
            }
        }
        
        //VALIDACIÓN DE USERNAME - El campo debe completarse con al menos 5 caracteres
        let errorUsername = [];
        let username = document.querySelector('#username');
        if(username.value == ''){
            errorUsername.push('Completá con tu nombre de usuario.')
        } else if(username.value.length < 5){
            errorUsername.push('Tu nombre de usuario debe tener al menos 5 letras.')
        }
        //Si hay errores los muestra
        if(errorUsername.length > 0){
            e.preventDefault()
            //Selecciono la sección de errores y agrego una nueva linea de texto
            let error = document.querySelector('#errorUsername');
            for(let i = 0; i < errorUsername.length; i++){
                error.innerHTML = `<p class="errors">${errorUsername[i]}</p>`;
            }
        }
        
        //VALIDACIÓN DE CONTRASEÑA - el campo debe completarse
        let errorPassword = [];
        let password = document.querySelector('#password');
        if(password.value == ''){
            errorPassword.push('Ingresa tu contraseña actual.')
        }
        //Si hay errores los muestra
        if(errorPassword.length > 0){
            e.preventDefault()
            //Selecciono la sección de errores y agrego una nueva linea de texto
            let error = document.querySelector('#errorPassword');
            for(let i = 0; i < errorPassword.length; i++){
                error.innerHTML = `<p class="errors">${errorPassword[i]}</p>`;
            }
        }

        //VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA - el campo debe completarse con la misma contraseña que el anterior
        let errorPasswordCeck = [];
        let passwordCeck = document.querySelector('#passwordConfirm');
        if(passwordCeck.value == ''){
            errorPasswordCeck.push('Ingresa tu contraseña actual.')
        }else if(passwordCeck.value != password.value){
            errorPasswordCeck.push('Debes repetir tu contraseña actual.')
        }
        //Si hay errores los muestra
        if(errorPasswordCeck.length > 0){
            e.preventDefault()
            //Selecciono la sección de errores y agrego una nueva linea de texto
            let error = document.querySelector('#errorPasswordCeck');
            for(let i = 0; i < errorPasswordCeck.length; i++){
                error.innerHTML = `<p class="errors">${errorPasswordCeck[i]}</p>`;
            }
        }
        
        //VALIDACIONES DE AVATAR - si se completa el campo debe ser con una imagen
        let errorAvatar = [];
        const avatar = document.querySelector('input#avatar');
        function extValidation(){
            let allowExt = /(\.jpg|\.jpeg|\.png)$/i;
            return allowExt.exec(avatar.value) ? true : false;
        }
        //Si se llena el campo debe ser una imagen
        //Si el campo esta lleno desde el back esta seteado que se recargue el avatar preexistente de cada user
        if(avatar.value != ''){
            if(!extValidation()){
                errorAvatar.push('Extensión de archivo inválido')
            }
        }
        //Si hay errores los muestra
        if(errorAvatar.length > 0){
            e.preventDefault()
            //Selecciono la sección de errores y agrego una nueva linea de texto
            let error = document.querySelector('#errorAvatar');
            for(let i = 0; i < errorAvatar.length; i++){
                error.innerHTML = `<p class="errors">${errorAvatar[i]}</p>`;
            }
        }
    })
})