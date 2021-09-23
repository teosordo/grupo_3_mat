window.addEventListener('load', () => {
    // Selecciono los campos
    const form = document.querySelector('main form');
    const inputs = document.querySelectorAll('.product-info');
    const [name, detail] = inputs;

    name.focus();

    // Objeto de errores
    const errors = {
        nameError: true,
        detailError: false
    };
    
    // Variables para contener mensajes de error
    let nameMsg = '';
    let detailMsg = '';

    const campoVacio = 'Debes llenar este campo';
    
    // Validación del campo nombre
    const nameValidation = () => {
        // Si el campo esa vacío da error
        if(name.value == ''){
            errors.nameError = true;
            nameMsg = campoVacio;
        } else {
            errors.nameError = false;
            nameMsg = '';
        }

        // Muestra el error en la vista
        let nameErrorHolder = document.querySelector('#nameError');
        nameErrorHolder.innerHTML = `<p class="errors">${nameMsg}</p>`;
    }

    // Validación del campo detalle
    const detailValidation = () => {
        // Si el campo esa vacío da error
        if(detail.value == ''){
            errors.detailError = true;
            detailMsg = campoVacio;
        } else {
            errors.detailError = false;
            detailMsg = '';
        }

        // Muestra el error en la vista
        let detailErrorHolder = document.querySelector('#detailError');
        detailErrorHolder.innerHTML = `<p class="errors">${detailMsg}</p>`;
    }

    // Eventos generales
    name.addEventListener('blur', nameValidation);
    name.addEventListener('input', nameValidation);

    // Solo se ejecutan en la página de crear/editar categorías
    if(window.location.pathname.includes('category')){
        errors.detailError = true;
        detail.addEventListener('blur', detailValidation);
        detail.addEventListener('input', detailValidation);
    }

    // Validación al hacer submit del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        nameValidation();
        // Solo se ejecuta en la página de crear/editar categorías
        if(window.location.pathname.includes('category')){
            errors.detailError = true;
            detailValidation();
        }

        if(errors.nameError == false && errors.detailError == false){
            form.submit();
        }
    })
})