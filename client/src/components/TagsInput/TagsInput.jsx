import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilterRecipesByDiets, fetchDiets, recipeSelector } from '../../slices/index';
import Tag from './Tag/Tag';

const TagsInput = () => {
  const {recipes, diets} = useSelector(recipeSelector);
  const [selected, setSelected] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiets());
  }, [dispatch]);

  useEffect(() => {
    if (tags.length === 0) setSelected('');
    dispatch(fetchFilterRecipesByDiets(recipes, tags));
  }, [tags, dispatch]);

  useEffect(() => {
    if (tags.includes(selected) || !selected) return;
    setTags(prevTags => [...prevTags, selected]);
  }, [selected]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="filters">
      <div className="sort">
        <label htmlFor="diets">Filtrar por:</label>
        <select name="diets" id="diets" value={selected} defaultValue="" onChange={handleChange}>
          <option hidden value="">-Seleccione un item-</option>
          {
            diets.map(({id, name}) => <option key={id} value={name}>{name}</option>)
          }
        </select>
      </div>
      <div className='tags-input-container'>
        {
          tags.map((name, index) => <Tag key={index} name={name} onClick={removeTag} />)
        }
      </div>
    </div>
  )
}

export default TagsInput