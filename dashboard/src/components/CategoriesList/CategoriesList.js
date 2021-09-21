import React from 'react';
import {useState, useEffect} from 'react';

function CategoriesList() {
    let [categories, setCategories] = useState([])

    // Montaje
    useEffect(() =>{
        console.log('Montaje del componente')
        fetch('http://localhost:3000/api/products/1')
            .then(response => response.json())
            .then(data => setCategories(data.countByCategory))
            .catch(err => console.error(err))
    },[])

    // Updates
    useEffect(() =>{
        console.log('Actualización del componente')
    },[categories])

    // Desmontaje
    useEffect(() =>{
        return ()=>{console.log('Desmontaje del componente')}
    },[categories])
    
    return(
        <div>
            <h3 className="info-text">Categorias</h3>
            <p className="info-text">Cantidad de categorias: {categories === undefined? 'Cargando...' : categories.length}</p>
            {categories.map(((category, idx) => <p key={idx+category.name}>{category.name} : {category.total}</p>))}
        </div>
    )
}
export default CategoriesList;