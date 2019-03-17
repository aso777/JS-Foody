import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultArr = Array.from(document.querySelectorAll('.results_link--active'));
    resultArr.forEach(el => {
        el.classList.remove('results_link--active');
    });
    document.querySelector(`a.results_link[href="#${id}"]`).classList.add('results_link--active');
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
};

const createButton = (page, type) => {
    const markup = `                
    <button class="btn-inline results_btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search_icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`;

    return markup;
}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    } else if (page < pages) {
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}`
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.recipes.length, resPerPage);
};