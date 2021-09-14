window.addEventListener('load', ()=>{
    //Inputs dentro del form
    const inputs = document.querySelectorAll('#useredit input')
    const validacionEdit = (e)=>{
        //Todos los errores
        let errors = false;

        //El nombre y el apellido solo deben tener letras
        const leters = /^[a-zA-Z]+$/

        //VALIDACIÓN DE NOMBRE - el campo debe estar completo por al menos dos caracteres
        let errorFirstName;
        let firstName = document.querySelector('#firstName');
        if(firstName.value == ''){
            errorFirstName='Completá con tu nombre.'
            errors = true;
        } else if(!leters.test(firstName.value)){
            errorFirstName='Tu nombre sólo debe tener letras.'
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
        } else if(!leters.test(lastName.value)){
            errorLastName='Tu apellido sólo debe tener letras.'
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
        
        //VALIDACIÓN DE EMAIL - el campo debe completarse
        let errorEmail;
        let email = document.querySelector('#email');
        const exprEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        if(email.value == ''){
            errorEmail='Ingresa tu email.'
            errors = true;
        } else if(!exprEmail.test(email.value)){
            errorEmail = 'Debes ingresar un e-mail válido.'
            errors = true;
        }else{errorEmail='';}
        
        //VALIDACIÓN DE CONTRASEÑA - el campo debe completarse
        let errorPassword;
        let password = document.querySelector('#password');
        if(password.value == ''){
            errorPassword='Ingresa tu contraseña actual.'
            errors = true;
        } else {errorPassword='';}
        
        //VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA - el campo debe completarse con la misma contraseña que el anterior
        let errorPasswordCheck;
        let passwordCheck = document.querySelector('#passwordConfirm');
        if(passwordCheck.value == ''){
            errorPasswordCheck='Ingresa tu contraseña actual.'
            errors = true;
        } else if(passwordCheck.value != password.value){
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
                errorAvatar='Extensión de archivo inválido.'
                errors = true;
            } else {errorAvatar='';}
        } else {errorAvatar='';}
        
        console.log(errors)
        //Si hay errores evito el envio del form
        if(errors){e.preventDefault();}
        
        //Muestro errores en el section del ejs
        //Nombre
        document.querySelector('#errorFirstName p').innerHTML = `${errorFirstName}`;
        //Apellido
        document.querySelector('#errorLastName p').innerHTML = `${errorLastName}`;
        //Username
        document.querySelector('#errorUsername p').innerHTML = `${errorUsername}`;
        //Email
        document.querySelector('#errorEmail p').innerHTML = `${errorEmail}`;
        //Contraseña
        document.querySelector('#errorPassword p').innerHTML = `${errorPassword}`;
        //Contraseña confirm
        document.querySelector('#errorPasswordCheck p').innerHTML = `${errorPasswordCheck}`;
        //Avatar
        document.querySelector('#errorAvatar p').innerHTML = `${errorAvatar}`;
    }
    //Momentos en donde se corroboran las validaciones
    inputs.forEach((input)=> {
        input.addEventListener('keyup',validacionEdit);
        input.addEventListener('blur',validacionEdit);
    })
    //Corroboración de validación al enviar el form
    document.querySelector('#useredit').addEventListener("submit", validacionEdit)
})