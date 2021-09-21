import React from 'react';
import {useState, useEffect} from 'react';

function CategoriesList() {
    let [categories, setCategories] = useState([])

    useEffect(() =>{
            fetch('https://swapi.dev/api/people') // 'http://localhost:3000/api/products'
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setCategories(data)
                })
                .catch(err => console.error(err))
        },[]
    )
    return(
        <div>
            <h3 className="info-text">Categorias</h3>
            <h4 className="info-text">Categoria:</h4>
            <p className="info-text">Numero</p>
        </div>
    )
}
export default CategoriesList;