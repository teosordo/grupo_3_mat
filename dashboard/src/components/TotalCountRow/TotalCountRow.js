import React from 'react';
import {useState, useEffect} from 'react';

function TotalCountRow(){

    let [products, setProducts] = useState([])

    let [users, setUsers] = useState([])

    useEffect(() =>{
        console.log('Objeto montado');
    })


    useEffect(() =>{
        fetch('http://localhost:3000/api/products')
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(err => console.error(err))
    },[])

    useEffect(() =>{
        fetch('http://localhost:3000/api/users')
                .then(response => response.json())
                .then(data => setUsers(data))
                .catch(err => console.error(err))
    },[])

    console.log(products);
    return(
        <div>
            <section className="section-container">
                <article className="card-container">
                    <div className="info-container">
                        <h3 className="info-text">Productos</h3>
                        <p className="info-text">{products.count}</p>
                    </div> 
                </article>
                <article className="card-container">
                    <div className="info-container">
                        <h3 className="info-text">Usuarios</h3>
                        <p className="info-text">{users.count}</p>
                    </div> 
                </article>
                <article className="card-container">
                    <div className="info-container">
                        <h3 className="info-text">Categorias</h3>
                        <p className="info-text">{products.count}</p>
                    </div> 
                </article>
            </section>
        </div>
    )
}

export default TotalCountRow;