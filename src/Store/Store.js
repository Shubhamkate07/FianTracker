import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from './Features/Expenses/expenseSlice'
export const store = configureStore({
    reducer: expenseReducer,
})