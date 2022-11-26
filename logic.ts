import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { VocItem } from "./types";

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