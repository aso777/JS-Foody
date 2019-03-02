import string from './models/Search';
console.log(string);

import {
    add,
    multiply,
    ID
} from './views/searchView';
console.log(`using imported function! ${add(ID, 2)} and ${multiply(ID, 3)}`);


//API key: 771cca0a9df01bf1a3441d8bf539a8b8

/*
https://www.food2fork.com/api/search
All recipe requests should be made to the recipe details API URL.

https://www.food2fork.com/api/get 
*/
const key = '771cca0a9df01bf1a3441d8bf539a8b8'

async function getRecipes(q) {
    const response = await fetch(`https://www.food2fork.com/api/search?key=${key}&q=${q}`)
    const jsonRes = await response.json();
    console.log(JSON.stringify(jsonRes));
}
getRecipes("Chicken");