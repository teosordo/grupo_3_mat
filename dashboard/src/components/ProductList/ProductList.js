import React from 'react';
import {useState, useEffect} from 'react';

function ProductList() {
    let [products, setCategories] = useState([])

    // Montaje
    useEffect(() =>{
        console.log('Montaje del componente')
        fetch('http://localhost:3000/api/products/1')
            .then(response => response.json())
            .then(data => setCategories(data.products))
            .catch(err => console.error(err))
    },[])

    // Updates
    useEffect(() =>{
        console.log('Actualización del componente')
    },[products])

    // Desmontaje
    useEffect(() =>{
        return ()=>{console.log('Desmontaje del componente')}
    },[])
    
    return(
        <div>
            <h3 className="info-text">Listado de roductos</h3>
            {products.map(((product, idx) => <p key={idx+product.name}>{product.name}</p>))}
        </div>
    )
}
export default ProductList;