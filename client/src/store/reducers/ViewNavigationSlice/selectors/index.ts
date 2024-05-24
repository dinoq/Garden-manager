import { RootState } from "../../..";

export const zoomSelector = (state: RootState) => state.navigationReducer.zoom;
export const canZoomSelector = (state: RootState) => state.navigationReducer.canZoom;
export const isMovingDesignPanelSelector = (state: RootState) => state.navigationReducer.isMovingDesignPanel;
export const mouseDownStartPositionSelector = (state: RootState) => state.navigationReducer.mouseDownStartPosition;
export const worldHeightSelector = (state: RootState) => state.navigationReducer.worldHeight;
export const worldWidthSelector = (state: RootState) => state.navigationReducer.worldWidth;
export const worldPositionSelector = (state: RootState) => state.navigationReducer.position;
