import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./reducers/ViewNavigationSlice";
import SeedBedsReducer from "./reducers/SeedBedsSlice";
import CalendarReducer from "./reducers/CalendarSlice";


const store = configureStore({
    reducer: {
        navigation: NavigationReducer,
        seedBeds: SeedBedsReducer,
        calendar: CalendarReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;