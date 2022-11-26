import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { VocItem } from "../../types";
import { updateItemInArray, updateObject } from "../utils";
import { 
    addTerm as addTermAction, 
    addCategory as addCategoryAction, 
    setCategories as setCategoriesAction, 
    setTerms as setTermsAction, 
    updateTerm as updateTermAction, 
    updateCategory as updateCategoryAction, 
    setSelectors as setSelectorsAction, 
    addSelector as addSelectorAction,
    removeSelector as removeSelectorAction,
    setLanguages as setLanguagesAction,
    addLanguage as addLanguageAction,
    removeLanguage as removeLanguageAction,
    setTranslations as setTranslationsAction,
    addTranslation as addTranslationAction,
    removeTranslation as removeTranslationAction,
    createTranslation as createTranslationAction
} from './actions';
import { VocState } from "./types";

type ReducerAction = (state: VocState, action: AnyAction) => VocState;

const setTerms: ReducerAction = (state, action) => {
    return updateObject(state, { terms: action.payload });
}
const setCategories: ReducerAction = (state, action) => {
    return updateObject(state, { categories: action.payload });
}
const setSelectors: ReducerAction = (state, action) => {
    return updateObject(state, { selectors: action.payload });
}
const setLanguages: ReducerAction = (state, action) => {
    return updateObject(state, { languages: action.payload });
}
const setTranslations: ReducerAction = (state, action) => {
    return updateObject(state, { translations: action.payload });
}

const addTerm: ReducerAction = (state, action) => {
    const newTerms = state.terms.concat(action.payload);
    return updateObject(state, { terms: newTerms });
}
const addCategory: ReducerAction = (state, action) => {
    const newCategories = state.categories.concat(action.payload);
    return updateObject(state, { categories: newCategories })
}
const addSelector: ReducerAction = (state, action) => {
    const newSelectors = state.selectors.concat(action.payload);
    return updateObject(state, { selectors: newSelectors });
}
const addLanguage: ReducerAction = (state, action) => {
    const newLanguages = state.languages.concat(action.payload);
    return updateObject(state, { languages: newLanguages });
}

const createTranslation: ReducerAction = (state, action) => {
    const { termIds, translationId } = action.payload;
    
    const newTranslations = updateObject(state.translations, {
        [translationId]: termIds
    });
    
    const addTranslationToTerm = (terms: VocItem[], id: string) => {
        return updateItemInArray(terms, id, term => {
            return updateObject(term, {
                translation: translationId
            })
        })
    }
    let newTerms = addTranslationToTerm(state.terms, termIds[0]);
    newTerms = addTranslationToTerm(newTerms, termIds[1]);

    return updateObject(state, { translations: newTranslations, terms: newTerms });
}
const addTranslation: ReducerAction = (state, action) => {
    const { termId, translationId } = action.payload;
    
    const newTranslations = updateObject(state.translations, {
        [translationId]: (state.translations[translationId] || []).concat(termId)
    })
    const newTerms = updateItemInArray(state.terms, termId, term => {
        return updateObject(term, {
            translation: translationId
        })
    })

    return updateObject(state, { terms: newTerms, translations: newTranslations });
}
const removeTranslation: ReducerAction = (state, action) => {
    const { termId, translationId } = action.payload;
    
    const newTranslations = updateObject(state.translations, {
        [translationId]: (state.translations[translationId] || []).filter(id => id !== termId)
    })
    const newTerms = updateItemInArray(state.terms, termId, term => {
        return updateObject(term, {
            translation: null
        })
    })

    return updateObject(state, { terms: newTerms, translations: newTranslations });
}

const removeSelector: ReducerAction = (state, action) => {
    const newSelectors = state.selectors.filter(selector => selector.id !== action.payload);
    return updateObject(state, { selectors: newSelectors });
}
const removeLanguage: ReducerAction = (state, action) => {
    const newLanguages = state.languages.filter(language => language.id !== action.payload);
    return updateObject(state, { languages: newLanguages });
}

const updateTerm: ReducerAction = (state, action) => {
    const newTerms = updateItemInArray(state.terms, action.payload.id, item => {
        return updateObject(item, action.payload);
    })
    return updateObject(state, { terms: newTerms });
}
const updateCategory: ReducerAction = (state, action) => {
    const newCategories = updateItemInArray(state.categories, action.payload.id, item => {
        return updateObject(item, action.payload);
    })
    return updateObject(state, { categories: newCategories });
}

export const vocReducer = createReducer<VocState>({
    terms: [],
    categories: [],
    selectors: [],
    languages: [],
    translations: {}
}, builder => {
    builder
        .addCase(addTermAction.type, addTerm)
        .addCase(addCategoryAction.type, addCategory)
        .addCase(setCategoriesAction.type, setCategories)
        .addCase(setTermsAction.type, setTerms)
        .addCase(setLanguagesAction.type, setLanguages)
        .addCase(addLanguageAction.type, addLanguage)
        .addCase(removeLanguageAction.type, removeLanguage)
        .addCase(updateTermAction.type, updateTerm)
        .addCase(updateCategoryAction.type, updateCategory)
        .addCase(setSelectorsAction.type, setSelectors)
        .addCase(addSelectorAction.type, addSelector)
        .addCase(removeSelectorAction.type, removeSelector)
        .addCase(setTranslationsAction.type, setTranslations)
        .addCase(addTranslationAction.type, addTranslation)
        .addCase(removeTranslationAction.type, removeTranslation)
        .addCase(createTranslationAction.type, createTranslation)
})