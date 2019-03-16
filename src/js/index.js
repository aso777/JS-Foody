import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
import Recipe from './models/Recipe';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * Search Controller
 */
const controlSearch = async () => {
    //Get query from a view
    const query = searchView.getInput();

    if (query) {
        // New search object
        state.search = new Search(query);

        // Prepare UI
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // Search for recipes
            await state.search.getRecipes();

            //Render the results
            clearLoader();
            searchView.renderResults(state.search.results);

        } catch (error) {
            console.log('Something went wrong while searching: ' + error);
        }

    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
});


/**
 * Recipe Controller
 */
const controlRecipe = async () => {
    //Get the id from URL
    const id = window.location.hash.replace('#', '');

    console.log(id);

    //Retrieve the recipe
    if (id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Create new recipe object
        state.recipe = new Recipe(id)

        try {
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculate servings and time
            state.recipe.calcCookingTime();
            state.recipe.calcServings();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            console.log('Something went wrong while getting the recipe: ' + error);
        }

    }

};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));