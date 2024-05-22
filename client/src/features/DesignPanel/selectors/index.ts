import { RootState } from "../../../store";

export const seedBedsSelector = (state: RootState) => state.appReducer.objects.seedBeds;
export const isSeedBedSelectedSelector = (state: RootState, id: number) => state.appReducer.objects.selectedSeedBedID === id;
export const seedBedSelector = (state: RootState, id: number) => state.appReducer.objects.seedBeds[id];
export const selectedSeedBedSelector = (state: RootState) => state.appReducer.objects.seedBeds[state.appReducer.objects.selectedSeedBedID];
export const selectedSeedBedIDSelector = (state: RootState) => state.appReducer.objects.selectedSeedBedID;

export const zoomSelector = (state: RootState) => state.navigationReducer.zoom;
export const canZoomSelector = (state: RootState) => state.navigationReducer.canZoom;
export const isMovingDesignPanelSelector = (state: RootState) => state.navigationReducer.isMovingDesignPanel;
export const mouseDownStartPositionSelector = (state: RootState) => state.navigationReducer.mouseDownStartPosition;
export const worldHeightSelector = (state: RootState) => state.navigationReducer.worldHeight;
export const worldWidthSelector = (state: RootState) => state.navigationReducer.worldWidth;
export const positionSelector = (state: RootState) => state.navigationReducer.position;

export const hideGUISelector = (state: RootState) => state.guiReducer.hideGUI;
export const projectDialogShowSelector = (state: RootState) => state.guiReducer.ProjectDialog.show;
export const projectDialogStateSelector = (state: RootState) => state.guiReducer.ProjectDialog.state;
export const messageSelector = (state: RootState) => state.guiReducer.message;
