import { RootState } from "../../../../store";


export const tabBarHeightSelector = (state: RootState) => state.guiReducer.tabBarHeight;
export const selectedTabSelector = (state: RootState) => state.guiReducer.selectedTab;