import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "pizzaSlice",
    initialState: {
        sizeFilter: "All",
        fullName: "",
        size: "",
        toppings: []
    },
    reducers: {
        filterChange(state, action) {
            state.sizeFilter = action.payload
        },
        changeFullName(state, action) {
            state.fullName = action.payload
        },
        changeSize(state, action) {
            state.size = action.payload
        },
        toggleTopping(state, action) {
            const topping = action.payload;
            const index = state.toppings.indexOf(topping);
            if (index === -1) {
                state.toppings = [ ...state.toppings, topping ];
            } else {
                state.toppings = [ 
                    ...state.toppings.slice(0, index), 
                    ...state.toppings.slice(index + 1) 
                ];
            }
        }
    }
});

export default slice.reducer;
export const { filterChange, changeFullName, changeSize, toggleTopping } = slice.actions;