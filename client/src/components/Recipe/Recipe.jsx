import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({id, image, name, healthScore, diets}) => {
  return (
    <div className="recipe">
      <img src={image} alt="" />
      <h5>Nombre: {name}</h5>
      <h5>Nivel de comida saludable: {healthScore}</h5>
      <h5>Tipos de dieta:</h5>
      <ul>
        {
          diets?.map((diet) => <li>{diet}</li>)
        }
      </ul>
      <Link to={`/recipe/${id}`}>
        <button>Ver mas</button>
      </Link>
    </div>
  )
}

export default Recipe