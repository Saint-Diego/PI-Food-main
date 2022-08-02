import React from 'react';
import { Link } from 'react-router-dom';

const LoadPage = () => {
  return (
    <div>
      <Link to='/home'>
        <button >Ingresar a la API</button>
      </Link>
    </div>
  )
}

export default LoadPage