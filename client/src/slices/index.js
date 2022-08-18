import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import showAlert from '../utils/showAlert';

export const initialState = {
  recipes: [],
  copyRecipes: [],
  diets: [],
  recipe: {},
  page: 1,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    getRecipes: (state, {payload}) => {
      state.copyRecipes = state.recipes = payload
    },
    getRecipe: (state, {payload}) => {
      state.recipe = payload
    },
    getDiets: (state, {payload}) => {
      state.diets = payload
    },
    filterRecipesByDiets: (state, {payload}) => {
      const {recipes, tags} = payload
      let filter = null
      if (tags.length > 0) {
        const filterRecipes = recipes.map((recipe) => {
          const _tagsFilter = tags.filter((t) => recipe.diets.includes(t))
          if (_tagsFilter.length === tags.length) return recipe
        })
        filter = filterRecipes.filter((fr) => fr !== undefined)
      } else filter = state.copyRecipes
      state.recipes = filter
    },
    sortRecipesByStringAsc: (state, {payload}) => {
      state.recipes = payload.slice().sort((a, b) => a.name.localeCompare(b.name))
    },
    sortRecipesByStringDesc: (state, {payload}) => {
      state.recipes = payload.slice().sort((a, b) => b.name.localeCompare(a.name))
    },
    sortRecipesByIntAsc: (state, {payload}) => {
      state.recipes = payload.slice().sort((a, b) => a.healthScore - b.healthScore)
    },
    sortRecipesByIntDesc: (state, {payload}) => {
      state.recipes = payload.slice().sort((a, b) => b.healthScore - a.healthScore)
    },
  }
})

export const {
  getRecipes, 
  getRecipe, 
  getDiets,
  filterRecipesByDiets,
  sortRecipesByStringAsc, 
  sortRecipesByStringDesc,
  sortRecipesByIntAsc, 
  sortRecipesByIntDesc,
} = recipeSlice.actions;

export const recipeSelector = state => state;

export default recipeSlice.reducer;

const URL_RECIPE = 'http://localhost:3001/api/recipes'
const URL_DIETS = 'http://localhost:3001/api/diets'

export const fetchRecipes = () => async dispatch => {
  try {
    const {data} = await axios(URL_RECIPE);
    dispatch(getRecipes(data));
  } catch (e) {
    showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchFilterRecipesByDiets = (recipes, tags) => dispatch => {
  try {
    dispatch(filterRecipesByDiets({recipes, tags}));
  } catch (e) {
    showAlert('Opps!', e.message, 'error');
  }
};

export const fetchOrderRecipes = (recipes, {option, sort}) => dispatch => {
  switch (option) {
    case 'a-z':
      if (sort === 'asc') dispatch(sortRecipesByStringAsc(recipes));
      if (sort === 'desc') dispatch(sortRecipesByStringDesc(recipes));
      break;

    case 'health score':
      if (sort === 'asc') dispatch(sortRecipesByIntAsc(recipes));
      if (sort === 'desc') dispatch(sortRecipesByIntDesc(recipes));
      break;
  
    default:
      break;
  }
};

export const fetchRecipeById = (id) => async dispatch => {
  try {
    const {data} = await axios(`${URL_RECIPE}/${id}`);
    dispatch(getRecipe(data));
  } catch (e) {
    return showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchRecipesByName = (name) => async dispatch => {
  try {
    const {data} = await axios(`${URL_RECIPE}?name=${name}`);
    dispatch(getRecipes(data));
  } catch (e) {
    return showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchCreateRecipe = (recipe) => async () => {
  try {
    const {data} = await axios.post(URL_RECIPE, recipe);
    return showAlert(data, '', 'success');
  } catch (e) {
    return showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchDiets = () => async dispatch => {
  try {
    const {data} = await axios(URL_DIETS);
    dispatch(getDiets(data));
  } catch (e) {
    return showAlert('Opps!', e, 'error')
  }
};
