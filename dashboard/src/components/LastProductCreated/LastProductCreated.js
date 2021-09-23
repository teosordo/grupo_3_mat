import React from 'react';
import {useState, useEffect} from 'react';

// Estilos
import '../../assets/css/LastCreated.css';

function LastProductCreated(){
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    // Al montar
    useEffect(() => {
        console.log('%cse montó el componente', 'color: green');
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    
    // Al actualizar
    useEffect(() => {
        console.log('%cse actualizó el componente', 'color: yellow');
        if(products.length !== 0){
            fetch(`http://localhost:3000/api/products/detail/${products.products[products.products.length - 1].id}`)
                .then(response => response.json())
                .then(data => setProduct(data))
        }
    }, [products])

    // Al desmontar
    useEffect(() => {
        return () => console.log('%cse desmontó el componente', 'color: red');
    }, [])

    // Return
    return(
        <section className="LastCreated">
            <h2>Último producto creado</h2>
            <article className="info">
                {products.length === 0 && <p>Cargando...</p>}

                    {product && product.brand && product.category &&
                    <>
                    {product.images.map((image, index) => 
                        <figure key={index} className="image">
                            <img src={image} alt="product-image"></img>
                        </figure>
                    )}
                    <section className="item-container">
                        <section className="item">
                            <h3>Nombre:</h3>
                            <p>{product.name}</p>
                        </section>
                    </section>
                        
                    <section className="item-container">
                        <section className="item">
                            <h3>Marca:</h3>
                            <p>{product.brand.name}</p>
                        </section>
                    </section>
                        
                    <section className="item-container">
                        <section className="item">
                            <h3>Categoría:</h3>
                            <p>{product.category.name}</p>
                        </section>
                    </section>
                    </> }
            </article>
        </section>
    )
}

export default LastProductCreated;