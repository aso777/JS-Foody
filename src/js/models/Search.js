export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        const key = '771cca0a9df01bf1a3441d8bf539a8b8';
        const response = await fetch(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
        this.results = await response.json();
    }
}