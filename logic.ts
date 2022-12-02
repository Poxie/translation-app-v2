import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { LanguageItem, Quiz, SelectorItem, VocItem } from "./types";

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

// Deleting data
export const deleteItem = async (id: string) => {
    try {
        // Fetching items
        const data = await AsyncStorageLib.getItem('@terms');
        if(!data) return;

        // Finding and removing correct item from array
        const items: VocItem[] = JSON.parse(data);
        const newItems = items.filter(item => item.id !== id);

        // Removing term from quiz if quiz has term
        const quizData = await AsyncStorageLib.getItem('@quizzes');
        if(quizData) {
            const quizzes: Quiz[] = JSON.parse(quizData);
            const newQuizzes: Quiz[] = [];
            for(const quiz of quizzes) {
                if(quiz.termIds.includes(id)) {
                    quiz.termIds = quiz.termIds.filter(termId => termId !== id);
                    if(!quiz.termIds.length) continue;
                }
                newQuizzes.push(quiz);
            }
            
            AsyncStorageLib.setItem('@quizzes', JSON.stringify(newQuizzes));
        }

        // Updating storage with new item
        AsyncStorageLib.setItem('@terms', JSON.stringify(newItems));
    } catch(e) {
        console.error(`Error updating item`, e);
    }
}
export const deleteCategory = async (id: string) => {
    try {
        const data = await AsyncStorageLib.getItem('@categories')
        if(!data) return;

        // Removing category from categories array
        const categories: VocItem[] = JSON.parse(data);
        const newCategories = categories.filter(category => category.id !== id);

        // Removing parentId for category children
        const itemData = await AsyncStorageLib.getItem('@terms');
        if(!itemData) return;

        // Parsing item data
        const items: VocItem[] = JSON.parse(itemData);

        const newItems = items.map(item => {
            if(item.parentId === id) {
                item.parentId = null;
            }
            return item;
        })

        console.log(newCategories, newItems);
        // Setting new categories and items
        AsyncStorageLib.setItem('@categories', JSON.stringify(newCategories));
        AsyncStorageLib.setItem('@terms', JSON.stringify(newItems));
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

export const addLanguage = async (language: LanguageItem) => {
    try {
        const data = await AsyncStorageLib.getItem('@languages');
        if(!data) return;

        const languages: LanguageItem[] = JSON.parse(data);
        languages.push(language);

        AsyncStorageLib.setItem('@languages', JSON.stringify(languages));
    } catch(e) {
        console.error(`Error adding language`, e);
    }
}
export const removeLanguage = async (languageId: string) => {
    try {
        const data = await AsyncStorageLib.getItem('@languages');
        if(!data) return;

        let languages: SelectorItem[] = JSON.parse(data);
        languages = languages.filter(selector => selector.id !== languageId);

        AsyncStorageLib.setItem('@languages', JSON.stringify(languages));
    } catch(e) {
        console.error(`Error removing language`, e);
    }
}

export const addQuiz = async (quiz: Quiz) => {
    try {
        const data = await AsyncStorageLib.getItem('@quizzes');
        if(!data) return console.error('Couldn\'t fetch quiz data.');

        const quizzes: Quiz[] = JSON.parse(data);
        const newQuizzes = quizzes.concat(quiz);

        AsyncStorageLib.setItem('@quizzes', JSON.stringify(newQuizzes));
    } catch(e) {
        console.error('Error adding quiz', e);
    }
}