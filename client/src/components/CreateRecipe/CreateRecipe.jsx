import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateRecipe, recipeSelector } from '../../slices/index';

const newRecipe = {
  name: '',
  summary: '',
  healthScore: 1,
  image: '',
  steps: [],
  diets: [],
};

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState(newRecipe);
  const [count, setCount] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const refName = useRef(null);
  const refStep = useRef(null);
  const {diets: typeDiets} = useSelector(recipeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!typeDiets.length) history.push("/home");
  },[]);

  useEffect(() => {
    setRecipe(prevRecipe => ({...prevRecipe, diets: tags}));
  }, [tags]);

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = (name === 'healthScore') ? parseInt(e.target.value) : e.target.value;
    setRecipe(prevRecipe => ({...prevRecipe, [name]: value}));
  };

  const handleChangeSelect = (e) => {
    let value = e.target.value;
    if (tags.includes(value) || value) return;
    setTags([...tags, value]);
  };

  const handleClickAdd = () => {
    let value = refStep.current.value;
    setCount(prevCount => prevCount + 1);
    setInstructions(prevInstructions => [...prevInstructions, {number: count, step: value}]);
    setRecipe(prevRecipe => ({...prevRecipe, steps: instructions}));
    value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCreateRecipe(recipe));
    setRecipe(newRecipe);
    refName.current.focus();
  };

  const searchStep = (index) => {
    const result = instructions.find((s, i) => i === index);
    refStep.current.value = result.step;
  };

  const removeStep = (index) => {
    setInstructions(instructions.filter((s, i) => i !== index));
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text"
            ref={refName} 
            name="name" 
            id="name" 
            value={recipe.name}
            onChange={handleChangeInput} />
        </div>
        <div>
          <label htmlFor="summary">Resumen:</label>
          <textarea name="summary" 
            id="summary" 
            cols="30" 
            rows="10" 
            value={recipe.summary}
            placeholder="Escriba brevemente una descripción de su receta..."
            onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor="healthScore">Nivel de comida saludable:</label>
          <input type="number" 
            name="healthScore" 
            id="healthScore" 
            min="1" 
            step="1" 
            value={recipe.healthScore}
            onChange={handleChangeInput}/>
        </div>
        <div>
          <div>
            <label htmlFor="steps">Paso a paso:</label>
            <div>
              <textarea name="steps" 
                ref={refStep}
                id="steps" 
                cols="30" 
                rows="10"
                placeholder="Escriba aquí su instrucción..." />
              <button onClick={handleClickAdd}>Agregar</button>
            </div>
          </div>
          {
            instructions.map(({number}, index) => (
              <div className="tag-item" key={index}>
                <span className='text' onClick={() => searchStep(index)}>paso #{number}</span>
                <span className='close' onClick={() => removeStep(index)}>&times;</span>
              </div>
            ))
          }
        </div>
        <div>
          <label htmlFor="image">Imagen:</label>
          <input type="url" 
            name="image" 
            id="image" 
            value={recipe.image}
            placeholder="Ingrese url de la imagen..."
            onChange={handleChangeInput} />
        </div>
        <div className="filters">
          <label htmlFor="diets">Tipo de dieta:</label>
          <div className='tags-input-container'>
            {
              tags.map((name, index) => (
                <div className="tag-item" key={index}>
                  <span className='text'>{name}</span>
                  <span className='close' onClick={() => removeTag(name)}>&times;</span>
                </div>
              ))
            }
            <select name="diets" id="diets" onChange={handleChangeSelect}>
              <option value="">-Seleccione un item-</option>
              {
                typeDiets?.map(({id, name}) => <option key={id} value={name}>{name}</option>)
              }
            </select>
          </div>
        </div>
        <div>
          <button type="submit">Crear</button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipe