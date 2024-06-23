import { DEPTH } from "../../../helpers/constants";
import { cmToPX } from "../../../helpers/functions";
import { IDimensions } from "../../../helpers/types";
import { RootState } from "../../../store";
import { plantSectionSelector, plantSectionsSelector } from "../../../store/reducers/DesignSlice/selectors";
import { zoomSelector } from "../../../store/reducers/ViewNavigationSlice/selectors";
import { ROWDIRECTIONS } from "../types";

export const plantSectionZIndexSelector = (state: RootState, id: number) => {
    const plantSection = plantSectionSelector(state, id);

    return plantSection.isPlaced ? (DEPTH.PLANTSECTION + plantSection.zIndex) : DEPTH.UNPLACED_PLANTSECTION
}

export const unplacedPlantSectionSelector = (state: RootState) => {
    const plantSections = plantSectionsSelector(state);

    return plantSections.find(plantSection => !plantSection.isPlaced);
}

export const inRowCountSelector = (state: RootState, id: number, localSize: IDimensions) => {
    const plantSection = plantSectionSelector(state, id);
    const zoom = zoomSelector(state);
    const dimensions = plantSectionDimensionsSelector(state, id, localSize);
    
    const plantSpacingMin = plantSection.plantSpacingMin ? plantSection.plantSpacingMin : plantSection.plant.PlantSpacingMin;
    const widthForCalculation = plantSection.rowsDirection === ROWDIRECTIONS.LEFT_TO_RIGHT ? dimensions.width : dimensions.height;
    let inRowCountDecimal = widthForCalculation / (cmToPX(zoom * (plantSpacingMin), zoomSelector(state)));
    let inRowCount = Math.floor(inRowCountDecimal);
    return inRowCount;
}

export const rowsCountSelector = (state: RootState, id: number, localSize: IDimensions) => {
    const plantSection = plantSectionSelector(state, id);
    const zoom = zoomSelector(state);
    const dimensions = plantSectionDimensionsSelector(state, id, localSize);

    const RowSpacingMin = plantSection.rowSpacingMin ? plantSection.rowSpacingMin : plantSection.plant.RowSpacingMin;
    const heightForCalculation = plantSection.rowsDirection === ROWDIRECTIONS.LEFT_TO_RIGHT ? dimensions.height : dimensions.width;
    let rowsCountDecimal = heightForCalculation / (cmToPX(zoom * (RowSpacingMin), zoom));
    let rowsCount = Math.floor(rowsCountDecimal);
    return rowsCount;
}

export const plantCountSelector = (state: RootState, id: number, localSize: IDimensions) => {
    const rowsCount = rowsCountSelector(state, id, localSize);
    const inRowCount = inRowCountSelector(state, id, localSize);

    const plantCount = rowsCount * inRowCount;
    return plantCount;
}

export const inRowPlantShiftSelector = (state: RootState, id: number, localSize: IDimensions) => {
    const plantSection = plantSectionSelector(state, id);
    const zoom = zoomSelector(state);
    const dimensions = plantSectionDimensionsSelector(state, id, localSize);
    
    const plantSpacingMin = plantSection.plantSpacingMin ? plantSection.plantSpacingMin : plantSection.plant.PlantSpacingMin;
    const widthForCalculation = plantSection.rowsDirection === ROWDIRECTIONS.LEFT_TO_RIGHT ? dimensions.width : dimensions.height;
    let inRowCountDecimal = widthForCalculation / (cmToPX(zoom * (plantSpacingMin), zoomSelector(state)));
    let inRowCount = Math.floor(inRowCountDecimal);
    let inRowCountDecimalPart = inRowCountDecimal - inRowCount;
    const inRowPlantShift = (zoom * (plantSpacingMin) * inRowCountDecimalPart) / 2;
    return inRowPlantShift;
}

export const rowPlantShiftSelector = (state: RootState, id: number, localSize: IDimensions) => {
    const plantSection = plantSectionSelector(state, id);
    const zoom = zoomSelector(state);
    const dimensions = plantSectionDimensionsSelector(state, id, localSize);

    const RowSpacingMin = plantSection.rowSpacingMin ? plantSection.rowSpacingMin : plantSection.plant.RowSpacingMin;
    const heightForCalculation = plantSection.rowsDirection === ROWDIRECTIONS.LEFT_TO_RIGHT ? dimensions.height : dimensions.width;
    let rowsCountDecimal = heightForCalculation / (cmToPX(zoom * (RowSpacingMin), zoom));
    let rowsCount = Math.floor(rowsCountDecimal);
    let rowCountDecimalPart = rowsCountDecimal - rowsCount;
    const rowPlantShift = (zoom * (RowSpacingMin) * rowCountDecimalPart) / 2;
    return rowPlantShift;
}

export const plantSectionDimensionsSelector = (state: RootState, id: number, localSize: IDimensions) => {
    const plantSection = plantSectionSelector(state, id);
    const zoom = zoomSelector(state);

    const width = cmToPX(zoom * ((localSize.width > 0) ? localSize.width : plantSection.width), zoom);
    const height = cmToPX(zoom * ((localSize.height > 0) ? localSize.height : plantSection.height), zoom);
    return { width, height };
}


