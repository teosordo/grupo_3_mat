//Estilos
import '../../assets/css/SideBar.css';
//Logo
import image from '../../assets/images/logo_final.svg';

import React from 'react';
import {Link} from 'react-router-dom';

function SideBar(){
    return(
        <div className="SideBar">
            <nav>
                {/*<!-- Sidebar - Brand -->*/}
                <a className="Logo" href="/">
                    <figure>
                        <img src={image} alt="matech-logo"/>
                    </figure>
                </a>
                <ul>
                    <li><Link to='/total-count-row'>Totales</Link></li>
                    <li><Link to='/last-user-created'>Último usuario creado</Link></li>
                    <li><Link to='/last-product-created'>Último producto creado</Link></li>
                    <li><Link to='/categories'>Categorías de productos</Link></li>
                    <li><Link to='/products-list'>Listado de productos</Link></li>
                </ul>
            </nav>
        </div>
    )
}
export default SideBar;