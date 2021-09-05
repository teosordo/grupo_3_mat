window.addEventListener('load', ()=>{
    //Inputs dentro del form
    const inputs = document.querySelectorAll('#useredit input')
    const validacionEdit = (e)=>{
        //Todos los errores
        let errors = false;

        //VALIDACIÓN DE NOMBRE - el campo debe estar completo por al menos dos caracteres
        let errorFirstName;
        let firstName = document.querySelector('#firstName');
        if(firstName.value == ''){
            errorFirstName='Completá con tu nombre.'
            errors = true;
        } else if(firstName.value.length <= 1){
            errorFirstName='Tu nombre debe tener al menos 2 letras.'
            errors = true;
        } else {errorFirstName='';}
        
        //VALIDACIÓN DE APELLIDO - el campo debe estar completo por al menos dos caracteres
        let errorLastName;
        let lastName = document.querySelector('#lastName');
        if(lastName.value == ''){
            errorLastName='Completá con tu apellido.'
            errors = true;
        } else if(lastName.value.length <= 1){
            errorLastName='Tu apellido debe tener al menos 2 letras.'
            errors = true;
        } else {errorLastName='';}

        //VALIDACIÓN DE USERNAME - El campo debe completarse con al menos 5 caracteres
        let errorUsername;
        let username = document.querySelector('#username');
        if(username.value == ''){
            errorUsername='Completá con tu nombre de usuario.'
            errors = true;
        } else if(username.value.length < 5){
            errorUsername='Tu nombre de usuario debe tener al menos 5 letras.'
            errors = true;
        } else {errorUsername='';}
        
        //VALIDACIÓN DE CONTRASEÑA - el campo debe completarse
        let errorPassword;
        let password = document.querySelector('#password');
        if(password.value == ''){
            errorPassword='Ingresa tu contraseña actual.'
            errors = true;
        } else {errorPassword='';}
        
        //VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA - el campo debe completarse con la misma contraseña que el anterior
        let errorPasswordCheck;
        let passwordCeck = document.querySelector('#passwordConfirm');
        if(passwordCeck.value == ''){
            errorPasswordCheck='Ingresa tu contraseña actual.'
        }else if(passwordCeck.value != password.value){
            errorPasswordCheck='Debes repetir tu contraseña actual.'
            errors = true;
        } else {errorPasswordCheck='';}
        
        //VALIDACIONES DE AVATAR - si se completa el campo debe ser con una imagen
        let errorAvatar;
        const avatar = document.querySelector('input#avatar');
        function extValidation(){
            let allowExt = /(\.jpg|\.jpeg|\.png)$/i;
            return allowExt.exec(avatar.value) ? true : false;
        }
        //Si el campo está vacio desde el back esta seteado que se recargue el avatar preexistente de cada user
        //Si el campo NO está vacio se valida su extension
        if(avatar.value != ''){
            if(!extValidation()){
                errorAvatar='Extensión de archivo inválido'
                errors = true;
            } else {errorAvatar='';}
        } else {errorAvatar='';}
        
        //Si hay errores evito el envio del form
        console.log(errors)
        if(errors){e.preventDefault();}
        
        //Muestro errores en el section
        //Nombre
        let errorFN = document.querySelector('#errorFirstName');
        errorFN.innerHTML = `<p class="errors">${errorFirstName}</p>`;
        
        //Apellido
        let errorLN = document.querySelector('#errorLastName');
        errorLN.innerHTML = `<p class="errors">${errorLastName}</p>`;
        
        //Username
        let errorUN = document.querySelector('#errorUsername');
        errorUN.innerHTML = `<p class="errors">${errorUsername}</p>`;
        
        //Contraseña
        let errorP = document.querySelector('#errorPassword');
        errorP.innerHTML = `<p class="errors">${errorPassword}</p>`;
        
        //Contraseña confirm
        let errorPC = document.querySelector('#errorPasswordCheck');
        errorPC.innerHTML = `<p class="errors">${errorPasswordCheck}</p>`;
        
        //Avatar
        let errorA = document.querySelector('#errorAvatar');
        errorA.innerHTML = `<p class="errors">${errorAvatar}</p>`;
        
    }
    //Momentos en donde se corroboran las validaciones
    inputs.forEach((input)=> {
        input.addEventListener('keyup',validacionEdit);
        input.addEventListener('blur',validacionEdit);
    })
    //Corroboración de validación al enviar el form
    let form = document.querySelector('#useredit');
    form.addEventListener("submit", validacionEdit)
})