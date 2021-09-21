window.addEventListener('load', ()=>{
    const inputs = Array.from(document.querySelectorAll('.product-info'));
    const url = window.location.href
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
                if(url.includes('edit')){
                    if(input.value != '' && extValidation()){
                        if(extValidation() == false){
                            input.classList.add('form-input-error');
                            input.nextElementSibling.innerHTML = 'Lol'; 
                        };
                    }else{
                        input.classList.remove('form-input-error');
                        input.nextElementSibling.innerHTML = '';
                    };
                }else{
                    if(input.value == ''){
                        input.classList.add('form-input-error');
                        input.nextElementSibling.innerHTML = 'Debe completar el campo';
                    }else if(extValidation()){
                        input.classList.add('form-input-error');
                        input.nextElementSibling.innerHTML = 'Extension de archivo invalido';
                    }else{
                        input.classList.remove('form-input-error');
                        input.nextElementSibling.innerHTML = '';
                    };
                };
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
            if(input.name == 'characteristics' || input.name == 'specs'){
                if(input.value == ''){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe completar el campo';
                }else if(input.value.length < 20){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe tener al menos 20 caracteres';
                }else{
                    input.classList.remove('form-input-error');
                    input.nextElementSibling.innerHTML = '';
                }
            };
            if(input.name == 'discount'){
                if(isNaN(input.value) || input.value == '' || input.value >  99 || input.value < 0){
                    input.classList.add('form-input-error');
                    input.nextElementSibling.innerHTML = 'Debe completar el campo con un numero del 0 al 99';
                }else{
                    input.classList.remove('form-input-error');
                    input.nextElementSibling.innerHTML = '';
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
        //Vaciando lista de errores
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
            document.querySelector('.form-input-error').focus();
        };
    });
});