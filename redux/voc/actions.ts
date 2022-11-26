import { createAction } from "@reduxjs/toolkit";
import { TOGGLE_TEST } from "./constants";

export const toggleTest = createAction(TOGGLE_TEST);