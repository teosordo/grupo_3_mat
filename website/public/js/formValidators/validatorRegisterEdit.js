window.addEventListener('load', ()=>{
    const validationForm = (e)=>{
        //Todos los errores
        let errors = false;

        //mensaje de error campo vacio
        const emptyInput = 'Ingresa un '

        // expresiones
        const nameCharacts = /^[a-zA-Z]{2,20}$/
        const userCharacts = /^[a-zA-Z0-9\_\-]{5,10}$/
        const emailCharacts = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        //VALIDACIÓN DE NOMBRE - el campo debe estar completo por al menos dos caracteres
        let errorFirstName;
        let firstName = document.querySelector('#firstName');
        if(firstName.value == ''){
            errorFirstName= emptyInput + 'nombre.'
            errors = true;
        } else if(firstName.value.length < 2 || firstName.value.length > 20){
            errorFirstName='Tu nombre debe tener de 2 a 20 letras.'
            errors = true;
        } else if(!nameCharacts.test(firstName.value)){
            errorFirstName='Tu nombre sólo debe tener letras.'
            errors = true;
        } else {errorFirstName='';}

        //VALIDACIÓN DE APELLIDO - el campo debe estar completo por al menos dos caracteres
        let errorLastName;
        let lastName = document.querySelector('#lastName');
        if(lastName.value == ''){
            errorLastName=emptyInput + 'apellido.'
            errors = true;
        } else if(lastName.value.length < 2 || lastName.value.length > 20){
            errorLastName='Tu apellido debe tener de 2 a 20 letras.'
            errors = true;
        } else if(!nameCharacts.test(lastName.value)){
            errorLastName='Tu apellido sólo debe tener letras.'
            errors = true;
        } else {errorLastName='';}

        //VALIDACIÓN DE USERNAME - El campo debe completarse con al menos 5 caracteres
        let errorUsername;
        let username = document.querySelector('#username');
        if(username.value == ''){
            errorUsername='nombre de usuario.'
            errors = true;
        } else if(username.value.length < 5){
            errorUsername='Tu nombre de usuario debe tener al menos 5 letras.'
            errors = true;
        } else if(!userCharacts.test(username.value)){
            errorUsername='Debes ingresar letras y/o carácteres especiales como: "-" y/o "_"'
            errors = true;
        } else {errorUsername='';}
        console.log(username.value)
        //VALIDACIÓN DE EMAIL - el campo debe completarse
        let errorEmail;
        let email = document.querySelector('#email');
        if(email.value == ''){
            errorEmail= emptyInput + 'email.'
            errors = true;
        } else if(!emailCharacts.test(email.value)){
            errorEmail = 'Debes ingresar un e-mail válido.'
            errors = true;
        }else{errorEmail='';}
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
            errors = true;
        } else {errorPassword='';}
        //Contraseña
        document.querySelector('#errorPassword p').innerHTML = `${errorPassword}`;
    }
    const validationRegister=()=>{
        const passwordCharacts = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!,._-])[A-Za-z\d!,._-]{8,}/
        if(password.value == ''){
            errorPassword='Ingresa tu contraseña actual.'
            errors = true;
        } else if(password.value.length < 8){
            errorPassword='Tu contraseña debe contener al menos 8 caracteres.'
            errors = true;
        } else if(!passwordCharacts.test(password.value)){
            errorPassword='Debes ingresar letras, numeros y carácteres especiales como: <em>!,._-</em>'
            errors = true;
        } else {errorPassword='';}
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
    console.log(inputs)
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
    document.querySelector('#userForm').addEventListener("submit", ()=>{
        validationForm(e);
        if(window.location.pathname.includes('edit')){
            validationEdit();
        } else if(window.location.pathname.includes('register')){
            validationRegister();
        }
    })
})