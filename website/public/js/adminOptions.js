var buttons = document.querySelectorAll('.option-button');
const createLink = document.getElementById('create-links');
const editLink = document.getElementById('edit-links');

buttons = Array.from(buttons)

const buttonToggle = (numBtn) => {

    buttons.forEach(btn => btn.classList.remove('button-color-on'));
    buttons.find(btn => btn.dataset.number == numBtn.number).classList.add('button-color-on');

    if (numBtn.number == 1) {
        editLink.classList.remove('show')
        editLink.classList.add('hide')

        createLink.classList.remove('hide')
        createLink.classList.add('show')
    }else if (numBtn.number == 2){
        createLink.classList.remove('show')
        createLink.classList.add('hide')
        
        editLink.classList.remove('hide')
        editLink.classList.add('show')
    }else{
        createLink.classList.remove('show')
        createLink.classList.add('hide')
        editLink.classList.remove('show')
        editLink.classList.add('hide')
    }
}



window.addEventListener('load', () =>{
    buttons.forEach(button =>{
        button.addEventListener('click', (e) => {
            let target = e.target;
            let data = target.dataset;
            if(data.number != null){
                buttonToggle(data)    
            }
        });
    });
    
});
