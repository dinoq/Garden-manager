import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlant, IVariety } from "../../helpers/plant-types";
import { IInGround, IPosition, ISeedBed } from "../../helpers/types";
import { ROWDIRECTIONS } from "../../features/DesignPanel/SeedBed/Plant";

export interface ISeedBedSlice {
    seedBeds: ISeedBed[],
    selectedSeedBed: number,
    projectID: number,
    projectName: string,
    lastModified: number,
    created: number
}

const initialState: ISeedBedSlice = {
    seedBeds: [],
    selectedSeedBed: -1,
    projectID: -1,
    projectName: "",
    lastModified: new Date().getTime(),
    created: new Date().getTime(),
}

const SeedBedsSlice = createSlice({
    name: "SeedBedsSlice",
    initialState,
    reducers: {
        updateWidthAction: (state: ISeedBedSlice, action: PayloadAction<{ id: number, newWidth: number }>) => {
            const index = state.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
            state.seedBeds[index].width = action.payload.newWidth;
        },
        updateHeightAction: (state: ISeedBedSlice, action: PayloadAction<{ id: number, newHeight: number }>) => {
            const index = state.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
            state.seedBeds[index].height = action.payload.newHeight;
        },
        updatePositionAction: (state: ISeedBedSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
            const index = state.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
            state.seedBeds[index].x = action.payload.position.x;
            state.seedBeds[index].y = action.payload.position.y;
        },
        updateSpacingAction: (state: ISeedBedSlice, action: PayloadAction<{ id: number, plantSpacing: number, rowSpacing: number }>) => {
            const index = state.seedBeds.findIndex(seedBed => seedBed.id === action.payload.id);
            state.seedBeds[index].rowSpacingMin = action.payload.rowSpacing;
            state.seedBeds[index].plantSpacingMin = action.payload.plantSpacing;
        },
        updateSelectedSeedBedAction: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            state.selectedSeedBed = action.payload;
        },
        createNewSeedBedAction: (state: ISeedBedSlice, action: PayloadAction<{ position: IPosition, plant: IPlant }>) => {
            const id = state.seedBeds.length;
            const plant = action.payload.plant;
            const variety =  (plant.varieties && plant.varieties.length)? plant.varieties[0] : undefined;
            const width = plant.PlantSpacingMin ? plant.PlantSpacingMin : 50;
            const height = plant.RowSpacingMin ? plant.RowSpacingMin : 50;
            const inGround: IInGround = {
                yearRound: true,
                from: {month: 0, monthPart: 0},
                to: {month: 0, monthPart: 0}
            }
            state.seedBeds.push({ id, variety, width, height, plant, ...action.payload.position, isPlaced: false, name: id.toString(), rowsDirection: ROWDIRECTIONS.LEFT_TO_RIGHT, inGround })
            state.selectedSeedBed = id;
        },
        placeSeedBedAction: (state: ISeedBedSlice, action: PayloadAction<{ id: number, position: IPosition }>) => {
            const seedBedID = action.payload.id;
            state.seedBeds[seedBedID].isPlaced = true;
            state.seedBeds[seedBedID].x = action.payload.position.x;
            state.seedBeds[seedBedID].y = action.payload.position.y;
        },
        changeRowsDirectionAction: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            const index = state.seedBeds.findIndex(seedBed => seedBed.id === action.payload);
            const currentDirection = state.seedBeds[index].rowsDirection;
            if (currentDirection === ROWDIRECTIONS.LEFT_TO_RIGHT) {
                state.seedBeds[index].rowsDirection = ROWDIRECTIONS.TOP_TO_DOWN;
            } else {
                state.seedBeds[index].rowsDirection = ROWDIRECTIONS.LEFT_TO_RIGHT;
            }
        },
        /*setSeedbedsFromString: (state: ISeedBedSlice, action: PayloadAction<string>) => {
            let definition = action.payload.length? action.payload : "[]";
            state.seedBeds = JSON.parse(definition);
            state.selectedSeedBed = -1;
        }*/
        setProjectAction: (state: ISeedBedSlice, action: PayloadAction<ISeedBedSlice>) => {
            return state = {...state, ...action.payload};
        },
        setProjectNameAction: (state: ISeedBedSlice, action: PayloadAction<string>) => {
            state.projectName = action.payload;
        },
        setLMTAction: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            state.lastModified = action.payload;
        },
        setProjectIDAction: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            state.projectID = action.payload;
        },
        changePlantAction: (state: ISeedBedSlice, action: PayloadAction<IPlant>) => {
            const actualSeedbed = state.seedBeds[state.selectedSeedBed];
            actualSeedbed.plant = action.payload;
            actualSeedbed.variety = action.payload.varieties[0];
        },
        changeVarietyAction: (state: ISeedBedSlice, action: PayloadAction<IVariety>) => {
            const actualSeedbed = state.seedBeds[state.selectedSeedBed];
            actualSeedbed.variety = action.payload;
        }
    }
})

export const { updateWidthAction, updateHeightAction, updatePositionAction, updateSpacingAction, updateSelectedSeedBedAction, createNewSeedBedAction, placeSeedBedAction, changeRowsDirectionAction, setProjectAction, setProjectNameAction, setLMTAction, setProjectIDAction, changePlantAction, changeVarietyAction } = SeedBedsSlice.actions;
export default SeedBedsSlice.reducer;