import React from 'react';
import {useState, useEffect} from 'react';

// Estilos
import '../../assets/css/LastCreated.css';

function LastUserCreated(){
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    // Al montar
    useEffect(() => {
        console.log('%cse montó el componente', 'color: green');
        // Trae todos los usuarios
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => setUsers(data.users))       
    }, [])
    
    // Al actualizar
    useEffect(() => {
        console.log('%cse actualizó el componente', 'color: yellow');
        if(users.length !== 0){
            // Trae el detalle del último usuario en la lista
            fetch(`http://localhost:3000/api/users/${users[users.length - 1].id}`)
                .then(response => response.json())
                .then(data => setUser(data.user))
        }
    }, [users])

    // Al desmontar
    useEffect(() => {
        return () => console.log('%cse desmontó el componente', 'color: red');
    }, [])

    // Return
    return(
        <section className="LastCreated">
            <h2>Último usuario creado</h2>

            <article className="info">
                {users.length === 0 && <p>Cargando...</p>}

                <figure className="image">
                    <img src={user.avatar} alt="user-avatar"></img>
                </figure>

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