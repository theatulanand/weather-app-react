import { CHANGE_CITY } from "./actionType"

const initialState = {
    value: ""
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case CHANGE_CITY:
            return {
                ...state,
                value: payload
            }

        default:
            return state;
    }
}