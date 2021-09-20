import React from 'react';
import {useState, useEffect} from 'react';

function TotalCountRow(){

    let [products, setProducts] = useState([])

    useEffect(() =>{
        console.log('Objeto montado');
    },[])


    useEffect(() =>{
        fetch('http://localhost:3000/api/products')
                .then(response => response.json())
                .then(data => setProducts(data.products))
                .catch(err => console.error(err))
    },[])

    console.log(products);
    return(
        <div>
            <section className="section-container">
                <article className="card-container">
                    <div className="info-container">
                        <h3 className="info-text">Productos</h3>
                        <p className="info-text">8</p>
                    </div> 
                </article>
                <article className="card-container">
                    <div className="info-container">
                        <h3 className="info-text">Usuarios</h3>
                        <p className="info-text">20</p>
                    </div> 
                </article>
                <article className="card-container">
                    <div className="info-container">
                        <h3 className="info-text">Categorias</h3>
                        <p className="info-text">8</p>
                    </div> 
                </article>
            </section>
        </div>
    )
}

export default TotalCountRow;