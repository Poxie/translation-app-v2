import { createAction } from "@reduxjs/toolkit";
import { ADD_CATEGORY, ADD_TERM } from "./constants";

export const addTerm = createAction(ADD_TERM, item => ({
    type: ADD_TERM,
    payload: item
}));
export const addCategory = createAction(ADD_CATEGORY, category => ({
    type: ADD_CATEGORY,
    payload: category
}))