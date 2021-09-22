import React from 'react';
import {useState, useEffect} from 'react';

function ProductList() {
    let [products, setCategories] = useState([])

    let [id, setId] = useState(1)
    

    function nextPage(){
        setId(id + 1);
        console.log(id);
    };

    function prevPage(){
        if(id >= 1){
            setId(id - 1);
            console.log(id);
        }
    };
    
    // Montaje
    useEffect(() =>{
        console.log('Montaje del componente')
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setCategories(data.products))
            .catch(err => console.error(err))
    },[])

    // Updates
    useEffect(() =>{
        console.log('Actualización del componente')
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setCategories(data.products))
            .catch(err => console.error(err))
    },[id])

    // Desmontaje
    useEffect(() =>{
        return ()=>{console.log('Desmontaje del componente')}
    },[])
    
    return(
        <div>
            <section>
                <h3 className="info-text">Listado de roductos</h3>
                {products.map(((product, idx) => <p key={idx+product.name}>{product.name}</p>))}
            </section>
            <button onClick={prevPage}>Prev</button>
            <button onClick={nextPage}>Next</button>
        </div>
    )
}
export default ProductList;