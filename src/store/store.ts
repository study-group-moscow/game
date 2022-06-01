import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import userAPI from "../services/UserService";

const rootReducer = combineReducers({
    userReducer,
    [userAPI.reducerPath]: userAPI.reducer
})


export const createStore = () => {
    return configureStore({
        reducer: rootReducer,

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            })
                .concat(userAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']