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

const limitRecipeTitle = (recipe, limit = 17) => {
    const string = recipe.title;

    if (string.length > limit) {
        let newString = '';
        let stringArr = string.split(' ');
        let indexMax, totalLength = 0;

        for (var i = 0; i < stringArr.length; i++) {
            totalLength += stringArr[i].length;

            if (totalLength >= limit) {
                indexMax = i;
                break;
            }
        }

        for (var i = 0; i < indexMax; i++) {
            newString += stringArr[i] + ' ';
        }

        newString += '...';
        return newString;

    } else {
        return recipe.title;
    }


};

const renderRecipe = recipe => {
    const title = limitRecipeTitle(recipe, 50);
    const markup = `
    <li>
    <a class="results_link" href="#${recipe.recipe_id}">
        <figure class="results_fig">
            <img src="${recipe.image_url}" alt="${title}">
        </figure>
        <div class="results_data">
            <h4 class="results_name">${title}</h4>
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