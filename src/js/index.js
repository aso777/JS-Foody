import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';


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
            //Need to catch error if
            if (state.search.results.error === 'limit') {
                alert(`Food2Fork has reached the maximum requests. Come back tomorrow.`);
            } else {
                searchView.renderResults(state.search.results);
            }
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

    //Retrieve the recipe
    if (id) {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected 
        if (state.search) {
            searchView.highlightSelected(id);
        }

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculate servings and time
            state.recipe.calcCookingTime();
            state.recipe.calcServings();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        } catch (error) {
            console.log('Something went wrong while getting the recipe: ' + error);
        }

    }

};

/*
* List Controller
*/
const controlList = () => {
    // Create a new list if there is none yet
    if(!state.list) state.list = new List();

    // Add ingredient to the list and ui
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
        console.log(state.list);
    });
};


/**
 * Like Controller
 */

 const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;

    if (!state.likes.isLiked(currentId)) {
        //Add like to the state
        const newLike = state.likes.addLike(state.recipe.id, 
            state.recipe.title, 
            state.recipe.author,
            state.recipe.img);
        //Toggle the like button
        likeView.toggleLikeButton(true);
        //Add like to the UI list
        likeView.renderItem(newLike);
    } else {
        //Remove like to the state
        state.likes.deleteLike(currentId);
        //Toggle the like button
        likeView.toggleLikeButton(false);
        //Remove like to the UI list
        likeView.deleteItem(currentId);
    }

    likeView.toggleLikeMenu(state.likes.getNumLikes());
 };


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

window.addEventListener('load', () => {
    //Initialize likes and restore if exists
    state.likes = new Likes();
    state.likes.readStorage();
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likeView.renderItem(like));
});

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping_item').dataset.itemid;
    console.log(id);

    //Handle delete event
    if (e.target.matches('.shopping_delete, .shopping_delete *')) {
        // Update the list
        state.list.deleteItem(id);

        // Update the UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping_count-value')) {
        const originalCount = pareseFloat(e.target.value, 10);
        state.list.updateCount(id, originalCount);
    }
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe_btn-add, .recipe_btn-add *')) {
        controlList();
    } else if (e.target.matches('.recipe_love, .recipe_love *')){
        controlLike();
    }
});
