import React from 'react';
import {useState, useEffect} from 'react';

function LastProductCreated(){
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    // al montar
    useEffect(() => {
        console.log('%cse montó el componente', 'color: green');
        fetch('http://localhost:3000/api/products/1')
            .then(response => response.json())
            .then(data => setProducts(data))
        
        
    }, [])
    
    // al actualizar
    useEffect(() => {
        console.log('%cse actualizó el componente', 'color: yellow');
        if(products.length !== 0){
            fetch(`http://localhost:3000/api/products/detail/${products.products[products.products.length - 1].id}`)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                })
        }
    }, [products])

    // al desmontar
    useEffect(() => {
        return () => console.log('%cse desmontó el componente', 'color: red');
    }, [])

    // return
    return(
        <section>
            <h2>Último producto creado</h2>
            <article>
                {products.length === 0 && <p>Cargando...</p>}
                <ul>
                    {product && product.brand && product.category ?
                    <>
                        <li>Nombre: {product.name}</li>
                        <li>Marca: {product.brand.name}</li>
                        <li>Categoría: {product.category.name}</li>
                    </> : 
                    <p>Cargando...</p>}
                </ul>
            </article>
        </section>
    )
}

export default LastProductCreated;