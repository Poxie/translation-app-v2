import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { updateItemInArray, updateObject } from "../utils";
import { addTerm as addTermAction, addCategory as addCategoryAction, setCategories as setCategoriesAction, setTerms as setTermsAction, updateTerm as updateTermAction } from './actions';
import { VocState } from "./types";

type ReducerAction = (state: VocState, action: AnyAction) => VocState;

const setTerms: ReducerAction = (state, action) => {
    return updateObject(state, { terms: action.payload });
}
const setCategories: ReducerAction = (state, action) => {
    return updateObject(state, { categories: action.payload });
}

const addTerm: ReducerAction = (state, action) => {
    const newTerms = state.terms.concat(action.payload);
    return updateObject(state, { terms: newTerms });
}
const addCategory: ReducerAction = (state, action) => {
    const newCategories = state.categories.concat(action.payload);
    return updateObject(state, { categories: newCategories })
}

const updateTerm: ReducerAction = (state, action) => {
    const newTerms = updateItemInArray(state.terms, action.payload.id, item => {
        return updateObject(item, action.payload);
    })
    return updateObject(state, { terms: newTerms });
}

export const vocReducer = createReducer<VocState>({
    terms: [],
    categories: []
}, builder => {
    builder
        .addCase(addTermAction.type, addTerm)
        .addCase(addCategoryAction.type, addCategory)
        .addCase(setCategoriesAction.type, setCategories)
        .addCase(setTermsAction.type, setTerms)
        .addCase(updateTermAction.type, updateTerm)
})