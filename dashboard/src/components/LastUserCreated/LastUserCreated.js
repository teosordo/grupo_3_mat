import React from 'react';
import {useState, useEffect} from 'react';

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
        <section>
            <h2>Último usuario creado</h2>
            <article>
                {users.length === 0 && <p>Cargando...</p>}
                <ul>
                    <li>Nombre Completo: {user.firstName} {user.lastName}</li>
                    <li>Nombre de usuario: {user.username}</li>
                    <li>Email: {user.email}</li>
                </ul>
            </article>
        </section>
    )
}

export default LastUserCreated;