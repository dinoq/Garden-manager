import { DEPTH } from "../../../helpers/constants";
import { RootState } from "../../../store";
import { plantSectionSelector, plantSectionsSelector } from "../../../store/reducers/DesignSlice/selectors";

export const plantSectionZIndexSelector = (state: RootState, id: number) => {
    const plantSection = plantSectionSelector(state, id);
    return plantSection.isPlaced ? (DEPTH.PLANTSECTION + plantSection.zIndex) : DEPTH.UNPLACED_PLANTSECTION
}

export const unplacedPlantSectionSelector = (state: RootState) => {
    const plantSections = plantSectionsSelector(state);
    return plantSections.find(plantSection => !plantSection.isPlaced);
}