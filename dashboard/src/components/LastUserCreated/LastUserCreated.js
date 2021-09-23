import React from 'react';
import {useState, useEffect} from 'react';

// estilos
import '../../assets/css/LastCreated.css';

function LastUserCreated(){
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    // al montar
    useEffect(() => {
        console.log('%cse montó el componente', 'color: green');
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))
        
        
    }, [])
    
    // al actualizar
    useEffect(() => {
        console.log('%cse actualizó el componente', 'color: yellow');
        if(users.length !== 0){
            fetch(`http://localhost:3000/api/users/${users[users.length - 1].id}`)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                })
        }
    }, [users])

    // al desmontar
    useEffect(() => {
        return () => console.log('%cse desmontó el componente', 'color: red');
    }, [])

    // return
    return(
        <section className="LastCreated">
            <h2>Último usuario creado</h2>

            <article className="info">
                {users.length === 0 && <p>Cargando...</p>}

                <section className="item-container">
                    <section className="item">
                        <h3>Nombre:</h3>
                        <p>{user.firstName} {user.lastName}</p>
                    </section>
                </section>

                <section className="item-container">
                    <section className="item">
                        <h3>Username:</h3>
                        <p>{user.username}</p>
                    </section>
                </section>

                <section className="item-container">
                    <section className="item">
                        <h3>Email:</h3>
                        <p>{user.email}</p>
                    </section>
                </section>
            </article>
        </section>
    )
}

export default LastUserCreated;