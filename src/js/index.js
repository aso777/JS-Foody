import Search from './models/Search';
import * as searchView from './views/searchView'
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
import {
    basename
} from 'path';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

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


        // Search for recipes
        await state.search.getRecipes();

        //Render the results
        clearLoader();
        searchView.renderResults(state.search.results);
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});