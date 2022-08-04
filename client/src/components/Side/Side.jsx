import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchRecipes } from '../../slices/index';
import OrderFilter from '../OrderFilter/OrderFilter';
import SearchBar from '../SearchBar/SearchBar';
import TagsInput from '../TagsInput/TagsInput';

const Side = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickCreate = (e) => {
    e.preventDefault();
    history.push('/recipes/create')
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchRecipes());
  };

  return (
    <div>
      <NavLink to='/recipes/create'>
        <button>Crear nueva receta</button>
      </NavLink>
      {/* <button onClick={handleClickCreate}>Crear nueva receta</button> */}
      <button onClick={handleClick}>-Mostrar todos-</button>
      <SearchBar/>
      <TagsInput/>
      <OrderFilter/>
    </div>
  )
}

export default Side