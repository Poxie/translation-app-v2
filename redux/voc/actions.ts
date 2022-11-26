import { createAction } from "@reduxjs/toolkit";
import { ADD_TERM } from "./constants";

export const addTerm = createAction(ADD_TERM, item => ({
    type: ADD_TERM,
    payload: item
}));