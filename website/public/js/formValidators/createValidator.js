window.addEventListener('load', ()=>{
    const inputs = Array.from(document.querySelectorAll('.product-info'));
    inputs.forEach(input => {
        input.addEventListener('input', ()=>{
            if(input.value == ''){
                input.classList.add('form-input-error');
                input.nextElementSibling.innerHTML = 'Debe completar el campo';
            }else{
                input.classList.remove('form-input-error');
                input.nextElementSibling.innerHTML = '';
            };
            //Validaciones de nombre de producto
            if(input.name == 'name'){
                if(input.value.length == ''){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe completar el campo';
                }else if(input.value.length < 5){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe tener al menos 5 caracteres';
                }else{
                    input.classList.remove('form-input-error');
                    input.nextElementSibling.innerHTML = '';
                }
            };
            //Validaciones del precio del producto
            if(input.name == 'price' || input.name == 'stock'){
                if(input.value == ''){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe completar el campo';
                }else if(isNaN(input.value)){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'El precio debe ser expresado en valor numerico';
                }else{
                    input.classList.remove('form-input-error');
                    input.nextElementSibling.innerHTML = '';
                }
            };

            //Validaciones de la imagen del producto
            if(input.name == 'image'){
                function extValidation(){
                    let authExt = ['jpg','png','jpeg'];
                    let {name} = input.files[0];
                    let fileExtension = name.split(".").pop();
                    return !authExt.includes(fileExtension) ? true : false;
                } 
                if(input.value == ''){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe completar el campo';
                }else if(extValidation()){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Extension de archivo invalido';
                }else{
                    input.classList.remove('form-input-error');
                    input.nextElementSibling.innerHTML = '';
                }
            };
            //Validaciones para video del producto
            if(input.name == 'video'){
                if(input.value === '' || input.value.indexOf('youtube.com/embed/' ) >= 0 ){
                    input.classList.remove('form-input-error');
                    input.nextElementSibling.innerHTML = '';
                }else{
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'El link debe empezar con youtube.com/embed/';
                }
            };
        });
    });
    const form = document.querySelector('#main-form');
    form.addEventListener('submit', (e)=>{
        //Creando un evento de input vacio
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });
        const errorList = document.querySelector('.errorsList');
        //Vaciando lista de errores
        errorList.innerHTML = '';
        let errors = [];
        inputs.forEach(input=>{
            //Utiliza el evento de input para confirmar si hay errores
            input.dispatchEvent(event);
            //Si hay errores se pushea el texto que tiene la etiqueta siguiente al input
            if(input.classList.contains('form-input-error')){
                errors.push(input.nextElementSibling.innerText);
            };
        });
        if(errors.length > 0){
            e.preventDefault();
            errors.forEach(error =>{
                errorList.innerHTML += `<li class="errors">${error}</li>`;
            });
        };
    });
});