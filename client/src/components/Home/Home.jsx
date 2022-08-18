import React from 'react';
import Recipes from '../Recipes/Recipes';
import Side from '../Side/Side';

const Home = () => {
  return (
    <div className="container">
      <Side/>
      <Recipes/>
    </div>
  )
}

export default Home