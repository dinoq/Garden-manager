import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./reducers/ViewNavigationSlice";
import DesignReducer from "./reducers/DesignSlice";
import GUIReducer from "./reducers/GUISlice";
import DBSlice from "./reducers/DBSlice";
import SettingsSlice from "./reducers/SettingsSlice";


const store = configureStore({
    reducer: {
        navigationReducer: NavigationReducer,
        designReducer: DesignReducer,
        guiReducer: GUIReducer,
        dbReducer: DBSlice,
        settingsReducer: SettingsSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;