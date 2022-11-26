import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateItemInArray, updateObject } from "../utils";
import { addTerm as addTermAction, addCategory as addCategoryAction, setCategories as setCategoriesAction, setTerms as setTermsAction, updateTerm as updateTermAction, updateCategory as updateCategoryAction, setSelectors as setSelectorsAction, addSelector as addSelectorAction, removeSelector as removeSelectorAction } from './actions';
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

const removeSelector: ReducerAction = (state, action) => {
    const newSelectors = state.selectors.filter(selector => selector.id !== action.payload);
    return updateObject(state, { selectors: newSelectors });
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
    selectors: []
}, builder => {
    builder
        .addCase(addTermAction.type, addTerm)
        .addCase(addCategoryAction.type, addCategory)
        .addCase(setCategoriesAction.type, setCategories)
        .addCase(setTermsAction.type, setTerms)
        .addCase(updateTermAction.type, updateTerm)
        .addCase(updateCategoryAction.type, updateCategory)
        .addCase(setSelectorsAction.type, setSelectors)
        .addCase(addSelectorAction.type, addSelector)
        .addCase(removeSelectorAction.type, removeSelector)
})