import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, recipeSelector } from '../../slices/index';
import Paginate from '../Paginate/Paginate';
import Recipe from '../Recipe/Recipe';

const Recipes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {recipes} = useSelector(recipeSelector);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);
  
  const recipePerPage = 9;
  const totalRecipes = recipes.length;
  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const filterRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div className="container">
      <div className="recipes">
        {
          totalRecipes > 0 ?
          filterRecipes.map(({id, image, name, healthScore, diets}) => 
            <Recipe 
              key={id} 
              id={id} 
              image={image} 
              name={name} 
              healthScore={healthScore} 
              diets={diets} 
            />
          )
          :
          <h6>Recipes not founds!</h6>
        }
      </div>
      {
        totalRecipes > recipePerPage && (
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalRecipes={totalRecipes}
            recipePerPage={recipePerPage}
          />
        )
      }
    </div>
  )
}

export default Recipes