import {
    elements
} from './base';

export const renderItem = item => {
    const markup = `<!--
    <li class="shopping_item" data-itemId="${item.id}">
        <div class="shopping_count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping_count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping_description">${item.ingredient}</p>
        <button class="shopping_delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    -->`;

    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[date-itemId="${id}"]`);
    item.parentElement.remove(item);
};
