import React from 'react';
import NavBar from '../NavBar/NavBar';
import Recipes from '../Recipes/Recipes';
import Side from '../Side/Side';

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Side/>
      <Recipes/>
      <div className="n">Home</div>
    </div>
  )
}

export default Home