import { key, API_key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const response = await fetch(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.results = await response.json();
        } catch (error) {
            console.log(recipe);
        }
    }
}