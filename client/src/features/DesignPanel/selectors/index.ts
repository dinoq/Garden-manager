import { DEPTH } from "../../../helpers/constants";
import { RootState } from "../../../store";
import { seedBedSelector, seedBedsSelector } from "../../../store/reducers/DesignSlice/selectors";

export const plantSectionZIndexSelector = (state: RootState, id: number) => {
    const plantSection = seedBedSelector(state, id);
    return plantSection.isPlaced ? (DEPTH.SEEDBED + plantSection.zIndex) : DEPTH.UNPLACED_SEEDBED
}

export const unplacedPlantSectionSelector = (state: RootState) => {
    const seedBeds = seedBedsSelector(state);
    return seedBeds.find(seedBed => !seedBed.isPlaced);
}