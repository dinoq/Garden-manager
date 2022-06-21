import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./reducers/ViewNavigationSlice";
import SeedBedsReducer from "./reducers/SeedBedsSlice";


const store = configureStore({
    reducer: {
        navigation: NavigationReducer,
        seedBeds: SeedBedsReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;