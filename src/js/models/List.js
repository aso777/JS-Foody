export default class List {
    constructor () {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: generateId(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }

    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}