import { RootState } from "../../../";


export const tabBarHeightSelector = (state: RootState) => state.guiReducer.tabBarHeight;
export const selectedTabSelector = (state: RootState) => state.guiReducer.selectedTab;
export const menuWidthSelector = (state: RootState) => state.guiReducer.menuWidth;
export const toolBarMinimizedSelector = (state: RootState) => state.guiReducer.toolbarMinimized;
export const toolbarHeightSelector = (state: RootState) => state.guiReducer.toolbarHeight;
export const hideGUISelector = (state: RootState) => state.guiReducer.hideGUI;
export const projectDialogShowSelector = (state: RootState) => state.guiReducer.ProjectDialog.show;
export const projectDialogStateSelector = (state: RootState) => state.guiReducer.ProjectDialog.state;
export const messageSelector = (state: RootState) => state.guiReducer.message;