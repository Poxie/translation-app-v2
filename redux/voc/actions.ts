import { createAction } from "@reduxjs/toolkit";
import { ADD_CATEGORY, ADD_TERM, SET_CATEGORIES, SET_TERMS } from "./constants";

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