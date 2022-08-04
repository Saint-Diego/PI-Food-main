import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipesByName } from '../../slices/index';

const SearchBar = () => {
  const [name, setName] = useState("");
  const refInput = useRef(null);
  const dispatch = useDispatch();

  const handleChange = () => {
    setName(refInput.current.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchRecipesByName(name));
    setName("");
    refInput.current.focus();
  };

  return (
    <div>
      <input type="text" ref={refInput} value={name} placeholder='Search...' onChange={handleChange}/>
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

export default SearchBar