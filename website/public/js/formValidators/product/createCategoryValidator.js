window.onload = () => {
    // selecciono los campos
    const form = document.querySelector('form#createCategory');
    const inputs = document.querySelectorAll('.product-info');
    const [name, detail] = inputs;

    // objeto de errores
    const errors = {
        nameError: true,
        detailError: true
    };
    
    // variables para contener mensajes de error
    let nameMsg = '';
    let detailMsg = '';

    const campoVacio = 'Debes llenar este campo';
    
    name.focus();

    // validación del nombre de la categoría
    const nameValidation = () => {
        // si el campo esa vacío da error
        if(name.value == ''){
            errors.nameError = true;
            nameMsg = campoVacio;
        } else {
            errors.nameError = false;
            nameMsg = '';
        }

        let nameErrorHolder = document.querySelector('#nameError');
        nameErrorHolder.innerHTML = `<p class="errors">${nameMsg}</p>`;
    }

    // validación del detalle de la categoría
    const detailValidation = () => {
        // si el campo esa vacío da error
        if(detail.value == ''){
            errors.detailError = true;
            detailMsg = campoVacio;
        } else {
            errors.detailError = false;
            detailMsg = '';
        }

        let detailErrorHolder = document.querySelector('#detailError');
        detailErrorHolder.innerHTML = `<p class="errors">${detailMsg}</p>`;
    }

    // eventos generales
    name.addEventListener('blur', nameValidation);
    name.addEventListener('keyup', nameValidation);
    detail.addEventListener('blur', detailValidation);
    detail.addEventListener('keyup', detailValidation);

    // validación al hacer submit del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        nameValidation();
        detailValidation();

        if(errors.nameError == false && errors.detailError == false){
            form.submit();
        }
    })
}