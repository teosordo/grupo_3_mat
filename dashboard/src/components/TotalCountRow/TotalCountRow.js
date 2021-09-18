import React from 'react';
import {useState, useEffect} from 'react';

function TotalCountRow(){

    let [products, setProducts] = useState([])

    useEffect(() =>{
        console.log('Objeto montado');
    },[])

    const apiKey = '4380618c';

    useEffect(() =>{
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=action`)
                .then(response => response.json())
                .then(data => console.log(data))
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