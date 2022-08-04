import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderRecipes, recipeSelector } from '../../slices/index';

const OrderFilter = () => {
  const [sort, setSort] = useState('asc');
  const [option, setOption] = useState('');
  const dispatch = useDispatch();
  const { recipes } = useSelector(recipeSelector);

  useEffect(() => {
    if (option === 'a-z') dispatch(fetchOrderRecipes(recipes, {option, sort}));
    if (option === 'health score') dispatch(fetchOrderRecipes(recipes, {option, sort}));
  }, [option, dispatch]);

  useEffect(() => {
    if (sort === 'asc') dispatch(fetchOrderRecipes(recipes, {option, sort}));
    if (sort === 'desc') dispatch(fetchOrderRecipes(recipes, {option, sort}));
  }, [sort, dispatch]);

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };
  
  const handleChangeOption = (e) => {
    if (e.target.value === 'default') return;
    setOption(e.target.value);
  };

  return (
    <div className="filters">
      <div className="sort">
        <span>Ordenar por:</span>
        <select name="option" id="option" onChange={handleChangeOption}>
          <option value="">-Seleecione una opción-</option>
          <option value="a-z">A-Z</option>
          <option value="health score">Health Score</option>
        </select>
      </div>
      <div>
        <input 
          type="radio" 
          name="order" 
          id="orderByAsc" 
          value="asc"
          checked={sort === "asc"}
          onChange={handleChangeSort} />           
        <label htmlFor="orderByAsc"> Ascendente</label>
      </div>
      <div>
        <input
          type="radio" 
          name="order" 
          id="orderByDesc" 
          value="desc"
          checked={sort === "desc"}
          onChange={handleChangeSort} />           
        <label htmlFor="orderByDesc"> Descendente</label>
      </div>
    </div>
  )
}

export default OrderFilter