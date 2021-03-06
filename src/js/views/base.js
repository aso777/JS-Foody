export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_field'),
    searchResList: document.querySelector('.results_list'),
    searchRes: document.querySelector('.results'),
    searchResPages : document.querySelector('.results_pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping_list'),
    likesMenu: document.querySelector('.likes_field'),
    likesList: document.querySelector('.likes_list')
};

export const renderLoader = parent => {
    const loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    document.querySelector(".loader").remove();
};