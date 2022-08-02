import { Route, Switch } from 'react-router-dom'
import './App.css';
import './styles/components.css';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Home from './components/Home/Home';
import LoadPage from './components/LoadPage/LoadPage';
import NotFound from './components/NotFound/NotFound';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoadPage}/>
        <Route path="/home" component={Home}/>
        <Route path="/home/recipes/:idRecipe" component={RecipeDetail}/>
        <Route path="/home/recipes/create" component={CreateRecipe}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
