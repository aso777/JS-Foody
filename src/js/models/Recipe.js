import { key, API_key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const response = await fetch(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.results = await response.json();
            
            this.title = this.results.recipe.title;
            this.author = this.results.recipe.publisher;
            this.img = this.results.recipe.image_url;
            this.url = this.results.recipe.source_url;
            this.ingredients = this.results.recipe.ingredients;
        } catch (error) {
            console.log(recipe);
        }
    }

    calcCookingTime() {
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}