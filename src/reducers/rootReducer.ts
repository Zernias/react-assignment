import { combineReducers } from "@reduxjs/toolkit"
import { store } from "../store/store"
import { loginReducer } from "./loginReducer"
import { reducer } from "./noteReducer"

const rootReducer = combineReducers({
    login: loginReducer,
    note: reducer
})


export default rootReducer
export type typeRootReducer =  ReturnType<typeof store.getState>