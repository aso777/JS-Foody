import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results_link" href="#${recipe.recipe_id}">
        <figure class="results_fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results_data">
            <h4 class="results_name">${recipe.title}</h4>
            <p class="results_author">${recipe.publisher}</p>
        </div>
    </a>
    </li>`;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}

export const renderResults = recipes => {
    console.log(recipes);
    recipes.recipes.forEach(renderRecipe);
};