import { CHANGE_CITY } from "./actionType"

export const ChangeCity = (payload) => {
    return {
        type: CHANGE_CITY,
        payload
    }
}