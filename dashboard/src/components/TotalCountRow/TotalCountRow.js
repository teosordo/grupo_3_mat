import React from 'react';
import {useState, useEffect} from 'react';

function TotalCountRow(){

    let [products, setProducts] = useState([])

    let [users, setUsers] = useState([])
    
    useEffect(() =>{
        fetch('http://localhost:3000/api/products/1')
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


    // Desmontaje
    useEffect(() =>{
        return ()=>{console.log('Desmontaje del componente')}
    },[])

    return(
        <div>
            <section className="section-container">
                <h3>Cantidades totales</h3>
                <article className="card-container">
                    <div className="info-container">
                        <h4 className="info-text">Productos</h4>
                        <p className="info-text">{products.count === undefined? 'Cargando...' : products.count}</p>
                    </div> 
                </article>
                <article className="card-container">
                    <div className="info-container">
                        <h4 className="info-text">Usuarios</h4>
                        <p className="info-text">{users.count === undefined? 'Cargando...' : users.count}</p>
                    </div> 
                </article>
                <article className="card-container">
                    <div className="info-container">
                        <h4 className="info-text">Categorias</h4>
                        <p className="info-text">{products.countByCategory === undefined? 'Cargando...' : products.countByCategory.length}</p>
                    </div> 
                </article>
            </section>
        </div>
    )
}

export default TotalCountRow;