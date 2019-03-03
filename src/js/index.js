import Search from './models/Search';

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
    const query = 'pizza';

    if (query) {
        // New search object
        state.search = new Search(query);

        // Prepare UI

        // Search for recipes
        await state.search.getRecipes();

        //Render the results
        console.log(state.search.results);
    }

};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
search.getRecipes();
console.log(search);