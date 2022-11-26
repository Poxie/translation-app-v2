import { createAction } from "@reduxjs/toolkit";
import { ADD_CATEGORY, ADD_TERM, SET_CATEGORIES, SET_TERMS, UPDATE_CATEGORY, UPDATE_TERM } from "./constants";

export const setTerms = createAction(SET_TERMS, terms => ({
    type: SET_TERMS,
    payload: terms
}))
export const setCategories = createAction(SET_CATEGORIES, terms => ({
    type: SET_CATEGORIES,
    payload: terms
}))

export const addTerm = createAction(ADD_TERM, item => ({
    type: ADD_TERM,
    payload: item
}));
export const addCategory = createAction(ADD_CATEGORY, category => ({
    type: ADD_CATEGORY,
    payload: category
}))

export const updateTerm = createAction(UPDATE_TERM, item => ({
    type: UPDATE_TERM,
    payload: item
}))
export const updateCategory = createAction(UPDATE_CATEGORY, category => ({
    type: UPDATE_CATEGORY,
    payload: category
}))