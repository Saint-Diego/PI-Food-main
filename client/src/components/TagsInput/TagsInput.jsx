import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilterRecipesByDiets, fetchDiets, recipeSelector } from '../../slices/index';

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const {recipes, diets} = useSelector(recipeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFilterRecipesByDiets(recipes, tags));
  }, [tags, dispatch]);

  const handleChange = (e) => {
    let selected = e.target.value;
    if (tags.includes(selected) || selected) return;
    setTags([...tags, selected]);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="filters">
      <div className="sort">
        <label htmlFor="diets">Filtrar por:</label>
        <select name="diets" id="diets" onChange={handleChange}>
          <option value="">-Seleccione un item-</option>
          {
            diets.map(({id, name}) => <option key={id} value={name}>{name}</option>)
          }
        </select>
      </div>
      {/* <input type="text" className='tags-input' placeholder='Elija un tipo de dieta' onKeyDown={handleKeyDown} /> */}
      <div className='tags-input-container'>
        {
          tags.map((name, index) => (
            <div className="tag-item" key={index}>
              <span className='text'>{name}</span>
              <span className='close' onClick={() => removeTag(name)}>&times;</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TagsInput