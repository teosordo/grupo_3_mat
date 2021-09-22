import '../../assets/css/Content.css';

import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Componentes
import TotalCountRow from '../TotalCountRow/TotalCountRow';
import LastUserCreated from '../LastUserCreated/LastUserCreated';
import CategoriesList from '../CategoriesList/CategoriesList';
import ProductList from '../ProductList/ProductList';

function Content(){
    return(
        <div className="Content">
            <h1>Información de MATech</h1>
            <Switch>
                <Route exact path='/'>
                    <TotalCountRow/>
                    <LastUserCreated/>
                    <CategoriesList/>
                    <ProductList/>
                </Route>
                <Route path='/total-count-row' component={TotalCountRow}/>
                <Route path='/last-user-created' component={LastUserCreated}/>
                <Route path='/categories' component={CategoriesList}/>
                <Route path='/products-list' component={ProductList}/>
                {/* <Route path='/last-product-created' component={LastProductCreated}/> */}
            </Switch>
        </div>
    )
}

export default Content;