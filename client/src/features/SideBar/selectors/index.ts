import { RootState } from "../../../store";

export const menuWidthSelector = (state: RootState) => state.guiReducer.menuWidth;