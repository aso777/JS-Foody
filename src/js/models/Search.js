import { key, API_key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        try {
            const response = await fetch(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            this.results = await response.json();
        } catch (error) {
            console.log(error);
        }
    }
}