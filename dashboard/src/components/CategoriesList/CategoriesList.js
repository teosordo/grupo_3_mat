import React from 'react';
import {useState, useEffect} from 'react';

function CategoriesList() {
    let [categories, setCategories] = useState([])

    // Fetch
    useEffect(() =>{
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err))
    },[])

    // Update
    useEffect(() =>{
        console.log(categories.countByCategory)
    },[categories])
    
    return(
        <div>
            <h3 className="info-text">Categorias</h3>
            <h4 className="info-text">Categoria:</h4>
            <p className="info-text">Numero</p>
        </div>
    )
}
export default CategoriesList;