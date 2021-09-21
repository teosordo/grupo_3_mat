import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import TotalCountRow from './components/TotalCountRow/TotalCountRow';
import LastUserCreated from './components/LastUserCreated/LastUserCreated';
import CategoriesList from './components/CategoriesList/CategoriesList';

function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <br/>
      <Link to='/total-count-row'>Totales</Link>
      <br/>
      <Link to='/last-user-created'>Último usuario creado</Link>
      <br/>
      <Link to='/last-product-created'>Último producto creado</Link>
      <br/>
      <Link to='/categories'>Categorías de productos</Link>
      <br/>
      <Link to='/products-list'>Listado de productos</Link>
      <br/>

      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/total-count-row' component={TotalCountRow}/>
        <Route path='/last-user-created' component={LastUserCreated}/>
        <Route path='/categories' component={CategoriesList}/>
        
        {/* <Route path='/last-product-created' component={LastProductCreated}/>
        <Route path='/products-list' component={}/> */}
      </Switch>
    </div>
  );
}

export default App;
