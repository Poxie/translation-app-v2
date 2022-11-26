import { createAction } from "@reduxjs/toolkit";
import { ADD_CATEGORY, ADD_LANGUAGE, ADD_SELECTOR, ADD_TERM, ADD_TRANSLATION, REMOVE_LANGUAGE, REMOVE_SELECTOR, REMOVE_TRANSLATION, SET_CATEGORIES, SET_LANGUAGES, SET_SELECTORS, SET_TERMS, UPDATE_CATEGORY, UPDATE_TERM } from "./constants";

export const setTerms = createAction(SET_TERMS, terms => ({
    type: SET_TERMS,
    payload: terms
}))
export const setCategories = createAction(SET_CATEGORIES, terms => ({
    type: SET_CATEGORIES,
    payload: terms
}))
export const setSelectors = createAction(SET_SELECTORS, selectors => ({
    type: SET_SELECTORS,
    payload: selectors
}))
export const setLanguages = createAction(SET_LANGUAGES, selectors => ({
    type: SET_LANGUAGES,
    payload: selectors
}))

export const addTerm = createAction(ADD_TERM, item => ({
    type: ADD_TERM,
    payload: item
}));
export const addCategory = createAction(ADD_CATEGORY, category => ({
    type: ADD_CATEGORY,
    payload: category
}))
export const addSelector = createAction(ADD_SELECTOR, selector => ({
    type: ADD_SELECTOR,
    payload: selector
}))
export const addLanguage = createAction(ADD_LANGUAGE, selector => ({
    type: ADD_LANGUAGE,
    payload: selector
}))
export const addTranslation = createAction(ADD_TRANSLATION, (termId, translationTermId) => ({
    type: ADD_TRANSLATION,
    payload: { termId, translationTermId }
}))

export const removeSelector = createAction(REMOVE_SELECTOR, selector => ({
    type: REMOVE_SELECTOR,
    payload: selector
}))
export const removeLanguage = createAction(REMOVE_LANGUAGE, selectorId => ({
    type: REMOVE_LANGUAGE,
    payload: selectorId
}))
export const removeTranslation = createAction(REMOVE_TRANSLATION, (termId, translationTermId) => ({
    type: REMOVE_TRANSLATION,
    payload: { termId, translationTermId }
}))

export const updateTerm = createAction(UPDATE_TERM, item => ({
    type: UPDATE_TERM,
    payload: item
}))
export const updateCategory = createAction(UPDATE_CATEGORY, category => ({
    type: UPDATE_CATEGORY,
    payload: category
}))