const createButton = document.getElementById('create-btn');
const editButton = document.getElementById('edit-btn');
const redirectLinks = document.getElementsByClassName('btn-a-link');


createButton.addEventListener('click', () => {
    createButton.classList.toggle('button-color-off')
    createButton.classList.toggle('button-color-on')
    links.classList.toggle('hide')
    links.classList.toggle('show')
})