import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateRecipe, recipeSelector } from '../../slices/index';
import Tag from '../TagsInput/Tag/Tag';

const newRecipe = {
  name: '',
  summary: '',
  healthScore: 1,
  steps: [],
  image: '',
  dishType: [],
  diets: [],
};

const CreateRecipe = () => {
  const [counter, setCounter] = useState({count: 1, index: 0});
  const [dish, setDish] = useState('');
  const [dishs, setDishs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [recipe, setRecipe] = useState(newRecipe);
  const [selected, setSelected] = useState('');
  const [tags, setTags] = useState([]);
  const [valueStep, setValueStep] = useState('');
  const history = useHistory();
  const refName = useRef(null);
  const {diets: typeDiets} = useSelector(recipeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!typeDiets.length) history.push("/home");
  }, []);

  useEffect(() => {
    if (tags.includes(selected) || !selected) return;
    setTags(prevTags => [...prevTags, selected]);
    setRecipe(prevRecipe => ({...prevRecipe, diets: tags}));
  }, [selected]);

  const handleChangeInput = (e) => {
    let name = e.target.name;
    let value = (name === 'healthScore') ? parseInt(e.target.value) : e.target.value;
    setRecipe(prevRecipe => ({...prevRecipe, [name]: value}));
  };

  const handleChangeDish = (e) => {
    setDish(e.target.value);
  };

  const handleChangeStep = (e) => {
    setValueStep(e.target.value);
  }

  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleClickAdd = (e) => {
    e.preventDefault();
    if (!valueStep) return;
    if (edit) {
      instructions[counter.index].step = valueStep;
      setInstructions(instructions);
      setEdit(false);
    } else {
      setInstructions(prevInstructions => [...prevInstructions, {number: counter.count, step: valueStep}]);
      setCounter(prevCounter => ({...prevCounter, count: (prevCounter.count + 1)}));
    }
    setRecipe(prevRecipe => ({...prevRecipe, steps: instructions}));
    setValueStep("");
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    setDishs(prevDishs => [...prevDishs, e.target.value]);
    setDish('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCreateRecipe(recipe));
    resetForm();
  };

  const resetForm = () => {
    setRecipe(newRecipe);
    setCounter({count: 0, index: 0});
    setInstructions([]);
    setSelected('');
    setDish('');
    setDishs([]);
    setTags([]);
    setEdit(false);
    refName.current.focus();
  };

  const searchStep = (index) => {
    const result = instructions.find((s, i) => i === index);
    setValueStep(result.step);
    setCounter(prevCounter => ({...prevCounter, index}));
    setEdit(true);
  };

  const removeStep = (index) => {
    setInstructions(instructions.filter((s, i) => i !== index));
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const removeDish = (dish) => {
    setDishs(dishs.filter((d) => d !== dish));
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
                id="steps" 
                cols="30" 
                rows="10"
                value={valueStep}
                placeholder="Escriba aquí su instrucción..."
                onChange={handleChangeStep} />
              <button onClick={handleClickAdd}>{edit ? "Editar" : "Agregar"}</button>
            </div>
          </div>
          {
            instructions.map(({number}, index) => (
              <div className="tag-item" key={index}>
                <span className='text-edit' onClick={() => searchStep(index)}>paso #{number}</span>
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
          <label htmlFor="diets">Tipo de plato:</label>
          <div className='tags-input-container'>
            {
              dishs.map((name, index) => <Tag key={index} name={name} onClick={removeDish}/>)
            }
            <input type="text" 
              className='tags-input'
              value={dish} 
              placeholder='Ingrese tipo de plato...' 
              onChange={handleChangeDish}
              onKeyDown={handleKeyDown} />
          </div>
        </div>
        <div className="filters">
          <label htmlFor="diets">Tipo de dieta:</label>
          <div className='tags-input-container'>
            {
              tags.map((name, index) => <Tag key={index} name={name} onClick={removeTag}/>)
            }
            <div className="sort">
              <select name="diets" id="diets" value={selected} defaultValue="" onChange={handleChangeSelect}>
                <option hidden value="">Seleccione un item...</option>
                {
                  typeDiets.map(({id, name}) => <option key={id} value={name}>{name}</option>)
                }
              </select>
            </div>
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