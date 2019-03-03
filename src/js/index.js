import Search from './models/Search';
import * as searchView from './views/searchView'
import {
    elements
} from './views/base';

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

        // Search for recipes
        await state.search.getRecipes();

        //Render the results
        searchView.renderResults(state.search.results);
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});