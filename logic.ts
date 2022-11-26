import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { SelectorItem, VocItem } from "./types";

export const createTerm = async (item: VocItem) => {
    try {
        // Fetching stored terms data
        const data = await AsyncStorageLib.getItem('@terms');
        if(!data) return;

        // Pushing new term to terms array
        const terms: VocItem[] = JSON.parse(data);
        terms.push(item);

        // Setting new terms to local storage
        AsyncStorageLib.setItem('@terms', JSON.stringify(terms));
    } catch(e) {
        console.error(`Error creating item`, e);
    }
}
export const createCategory = async (category: VocItem) => {
    try {
        const data = await AsyncStorageLib.getItem('@categories');
        if(!data) return;

        const categories: VocItem[] = JSON.parse(data);
        categories.push(category);

        AsyncStorageLib.setItem('@categories', JSON.stringify(categories));
    } catch(e) {
        console.error(`Error creating category`, e);
    }
}

export const updateItem = async (item: VocItem) => {
    try {
        // Fetching items
        const data = await AsyncStorageLib.getItem('@terms');
        if(!data) return;

        // Finding and replacing correct item in array
        let items: VocItem[] = JSON.parse(data);
        items = items.map(i => {
            if(i.id === item.id) return item;
            return i;
        })

        // Updating storage with new item
        AsyncStorageLib.setItem('@terms', JSON.stringify(items));
    } catch(e) {
        console.error(`Error updating item`, e);
    }
}
export const updateCategory = async (category: VocItem) => {
    try {
        const data = await AsyncStorageLib.getItem('@categories')
        if(!data) return;

        let categories: VocItem[] = JSON.parse(data);
        categories = categories.map(cat => {
            if(cat.id === category.id) return category;
            return cat;
        })

        AsyncStorageLib.setItem('@categories', JSON.stringify(categories));
    } catch(e) {
        console.error(`Error updating category`, e);
    }
}

export const addSelector = async (selector: SelectorItem) => {
    try {
        const data = await AsyncStorageLib.getItem('@selectors');
        if(!data) return;

        const selectors: SelectorItem[] = JSON.parse(data);
        selectors.push(selector);

        AsyncStorageLib.setItem('@selectors', JSON.stringify(selectors));
    } catch(e) {
        console.error(`Error adding selector`, e);
    }
}
export const removeSelector = async (selectorId: string) => {
    try {
        const data = await AsyncStorageLib.getItem('@selectors');
        if(!data) return;

        let selectors: SelectorItem[] = JSON.parse(data);
        selectors = selectors.filter(selector => selector.id !== selectorId);

        AsyncStorageLib.setItem('@selectors', JSON.stringify(selectors));
    } catch(e) {
        console.error(`Error removing selector`, e);
    }
}