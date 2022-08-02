import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipe, recipeSelector } from '../../slices/index';

const RecipeDetail = () => {
  const { idRecipe } = useParams();
  const dispatch = useDispatch();
  const { recipe } = useSelector(recipeSelector);

  useEffect(() => {
    dispatch(fetchRecipe(idRecipe));
  },[idRecipe, dispatch]);

  return (
    <div>
      {
        recipe ?
        <>
          <img src={recipe.image} alt="" />
          <h5>Nombre: {recipe.name}</h5>
          <h5>Tipo de plato:</h5>
          <ul>
            {
              recipe.dishTypes?.map((dish, index) => <li key={index}>{dish}</li>)
            }
          </ul>
          <h5>Tipo de dieta:</h5>
          <ul>
            {
              recipe.diets?.map((diet, index) => <li key={index}>{diet}</li>)
            }
          </ul>
          <h5>Resumen:</h5>
          <p>{recipe.summary}</p>
          <h5>Nivel de comida: {recipe.healthScore}</h5>
          <h5>Paso a paso:</h5>
          <ol>
            {
              recipe.steps?.map(({number, step}) => {
                <li key={number}>{step}</li>
              })
            }
          </ol>
        </>
        :
        <p>Cargando...!</p>
        }
    </div>
  )
}

export default RecipeDetail