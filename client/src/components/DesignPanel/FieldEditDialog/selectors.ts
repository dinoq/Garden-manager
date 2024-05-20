import { RootState } from "../../../store";

export const actualSeedBedSelector = (state: RootState) => state.seedBedsReducer.seedBeds[state.seedBedsReducer.selectedSeedBed];