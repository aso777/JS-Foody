import {
    elements
} from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeButton = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe_love use').setAttribute('href', `img/icons.svg#${iconString}`)
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderItem = item => {
    const markup = `<li>
        <a class="likes_link" href="#${item.id}">
        <figure class="likes_fig">
            <img src="${item.img}" alt="${item.title}">
        </figure>
        <div class="likes_data">
            <h4 class="likes_name">${limitRecipeTitle(item.title)}</h4>
            <p class="likes_author">${item.author}</p>
        </div>
        </a>
        </li>`;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const el = document.querySelector(`a.likes_link[href*="#${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};
