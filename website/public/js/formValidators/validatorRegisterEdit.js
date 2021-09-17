window.addEventListener('load', ()=>{
    //Todos los errores
    let errors = {
        nameError:true,
        surnameError:true,
        usernameError:true,
        emailError:true,
        passwordError:true,
        passwordCheckError:true,
        avatarError:false
    }
    const validationForm = ()=>{
        // mensaje de error campo vacio
        const emptyInput = 'Ingresa un '

        // expresiones para validar
        const nameCharacts = /^[a-zA-Z ]{2,20}$/
        const userCharacts = /^[a-zA-Z0-9\_\-]{5,10}$/
        const emailCharacts = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        //VALIDACIÓN DE NOMBRE - el campo debe estar completo por al menos dos caracteres
        let errorFirstName;
        let firstName = document.querySelector('#firstName');
        if(firstName.value == ''){
            errorFirstName= emptyInput + 'nombre.'
            errors.nameError = true;
        } else if(firstName.value.length < 2 || firstName.value.length > 20){
            errorFirstName='Tu nombre debe tener de 2 a 20 letras.'
            errors.nameError = true;
        } else if(!nameCharacts.test(firstName.value)){
            errorFirstName='Tu nombre sólo debe tener letras.'
            errors.nameError = true;
        } else {
            errorFirstName='';
            errors.nameError = false;
        }

        //VALIDACIÓN DE APELLIDO - el campo debe estar completo por al menos dos caracteres
        let errorLastName;
        let lastName = document.querySelector('#lastName');
        if(lastName.value == ''){
            errorLastName=emptyInput + 'apellido.'
            errors.surnameError = true;
        } else if(lastName.value.length < 2 || lastName.value.length > 20){
            errorLastName='Tu apellido debe tener de 2 a 20 letras.'
            errors.surnameError = true;
        } else if(!nameCharacts.test(lastName.value)){
            errorLastName='Tu apellido sólo debe tener letras.'
            errors.surnameError = true;
        } else {
            errorLastName='';
            errors.surnameError = false;
        }

        //VALIDACIÓN DE USERNAME - El campo debe completarse con al menos 5 caracteres
        let errorUsername;
        let username = document.querySelector('#username');
        if(username.value == ''){
            errorUsername='nombre de usuario.'
            errors.usernameError = true;
        } else if(username.value.length < 5 || username.value.length > 10){
            errorUsername='Tu nombre de usuario debe tener de 5 a 10 letras.'
            errors.usernameError = true;
        } else if(!userCharacts.test(username.value)){
            errorUsername='Debes ingresar letras y/o carácteres especiales como: "-" y/o "_"'
        } else {
            errorUsername='';
            errors.usernameError = false;
        }
        
        //VALIDACIÓN DE EMAIL - el campo debe completarse
        let errorEmail;
        let email = document.querySelector('#email');
        if(email.value == ''){
            errorEmail= emptyInput + 'email.'
            errors.emailError = true;
        } else if(!emailCharacts.test(email.value)){
            errorEmail = 'Debes ingresar un e-mail válido.'
            errors.emailError = true;
        }else{
            errorEmail='';
            errors.emailError = false;
        }

        //VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA - el campo debe completarse con la misma contraseña que el anterior
        let errorPasswordCheck;
        let passwordCheck = document.querySelector('#passwordConfirm');
        if(passwordCheck.value == ''){
            errorPasswordCheck='Ingresa tu contraseña actual.'
            errors.passwordCheckError = true;
        } else if(passwordCheck.value != password.value){
            errorPasswordCheck='Debes repetir tu contraseña actual.'
            errors.passwordCheckError = true;
        } else {
            errorPasswordCheck='';
            errors.passwordCheckError = false;
        }
        
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
                errors.avatarError = true;
            } else {
                errorAvatar='';
                errors.avatarError = false;
            }
        } else {
            errorAvatar='';
            errors.avatarError = false;
        }
        //Muestro errores en el section del ejs
        //Nombre
        document.querySelector('#errorFirstName p').innerHTML = `${errorFirstName}`;
        //Apellido
        document.querySelector('#errorLastName p').innerHTML = `${errorLastName}`;
        //Username
        document.querySelector('#errorUsername p').innerHTML = `${errorUsername}`;
        //Email
        document.querySelector('#errorEmail p').innerHTML = `${errorEmail}`;
        //Contraseña confirm
        document.querySelector('#errorPasswordCheck p').innerHTML = `${errorPasswordCheck}`;
        //Avatar
        document.querySelector('#errorAvatar p').innerHTML = `${errorAvatar}`;
    }

    //VALIDACIÓN DE CONTRASEÑA - el campo debe completarse
    let errorPassword;
    let password = document.querySelector('#password');
    
    const validationEdit = ()=>{
        if(password.value == ''){
            errorPassword='Ingresa tu contraseña actual.'
            errors.passwordError = true;
        } else {
            errorPassword='';
            errors.passwordError = false;
        }
        //Contraseña
        document.querySelector('#errorPassword p').innerHTML = `${errorPassword}`;
    }

    const validationRegister=()=>{
        const passwordCharacts = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!,._-])[A-Za-z\d!,._-]{8,}/
        if(password.value == ''){
            errorPassword='Ingresa tu contraseña actual.'
            errors.passwordError = true;
        } else if(password.value.length < 8){
            errorPassword='Tu contraseña debe contener al menos 8 caracteres.'
            errors.passwordError = true;
        } else if(!passwordCharacts.test(password.value)){
            errorPassword='Debes ingresar al menos una letra mayúscula y una minúscula, numeros y carácteres especiales como: <em>!,._-</em>'
            errors.passwordError = true;
        } else {
            errorPassword='';
            errors.passwordError = false;
        }
        //Contraseña
        document.querySelector('#errorPassword p').innerHTML = `${errorPassword}`;
    }

    //Inputs dentro del form
    const inputs = document.querySelectorAll('#userForm input')
    const [name, surname, user, email, passwordInput, passwordCheck, avatar] = inputs;
    inputs.forEach((input)=> {
        input.addEventListener('keyup',validationForm);
        input.addEventListener('blur',validationForm);
    })

    // Dependiendo el form se valida la contraseña de forma diferente
    if(window.location.pathname.includes('edit')){
        passwordInput.addEventListener('keyup', validationEdit);
        passwordInput.addEventListener('blur', validationEdit);
    }
    if(window.location.pathname.includes('register')){
        passwordInput.addEventListener('keyup', validationRegister);
        passwordInput.addEventListener('blur', validationRegister);
    }

    //Corroboración de validación al enviar el form
    document.querySelector('#userForm').addEventListener("submit", (e)=>{
        validationForm();
        
        // Dependiendo el form se valida la contraseña de forma diferente
        if(window.location.pathname.includes('edit')){
            validationEdit();
        } else if(window.location.pathname.includes('register')){
            validationRegister();
        }
        
        //Si hay errores evito el envio del form
        //Todos los errores comienzan en true previniendo default
        for (const error in errors) {
            if(errors[error] == true){
                e.preventDefault();
            }
        }
    })
})