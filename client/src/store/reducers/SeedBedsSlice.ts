import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROWDIRECTIONS } from "../../components/SeedBed/Plant";
import { IPlant } from "../../helpers/plant-types";
import { IPosition, ISeedBed } from "../../helpers/types";
import { IProjectDialogProps } from "../../components/ProjectDialog";

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
        updateSelectedSeedBed: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            state.selectedSeedBed = action.payload;
        },
        createNewSeedBedAction: (state: ISeedBedSlice, action: PayloadAction<{position: IPosition, plant: IPlant}>) => {
            const id = state.seedBeds.length;
            const plant = action.payload.plant;
            state.seedBeds.push({id, width: plant.inRowSpacingMin? plant.inRowSpacingMin : 50, height: plant.betweenRowSpacingMin? plant.betweenRowSpacingMin : 50, plant, ...action.payload.position, isPlaced: false, name: id.toString(), rowsDirection: ROWDIRECTIONS.LEFT_TO_RIGHT})
            state.selectedSeedBed = id;
        },
        placeSeedBedAction: (state: ISeedBedSlice, action: PayloadAction<{id: number, position: IPosition}>) => {
            const seedBedID = action.payload.id;
            state.seedBeds[seedBedID].isPlaced = true;
            state.seedBeds[seedBedID].x = action.payload.position.x;
            state.seedBeds[seedBedID].y = action.payload.position.y;
        },
        changeRowsDirectionAction: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            const index = state.seedBeds.findIndex(seedBed => seedBed.id === action.payload);
            const currentDirection = state.seedBeds[index].rowsDirection;
            if(currentDirection == ROWDIRECTIONS.LEFT_TO_RIGHT){
                state.seedBeds[index].rowsDirection = ROWDIRECTIONS.TOP_TO_DOWN;
            }else{
                state.seedBeds[index].rowsDirection = ROWDIRECTIONS.LEFT_TO_RIGHT;
            }
        },
        /*setSeedbedsFromString: (state: ISeedBedSlice, action: PayloadAction<string>) => {
            let definition = action.payload.length? action.payload : "[]";
            state.seedBeds = JSON.parse(definition);
            state.selectedSeedBed = -1;
        }*/
        setProject: (state: ISeedBedSlice, action: PayloadAction<ISeedBedSlice>) => {
            state = action.payload;
        },
        setProjectName: (state: ISeedBedSlice, action: PayloadAction<string>) => {
            state.projectName = action.payload;
        },
        setLMT: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            state.lastModified = action.payload;
        },
        setProjectID: (state: ISeedBedSlice, action: PayloadAction<number>) => {
            state.projectID = action.payload;
        },
        // changePlant: (state: ISeedBedSlice, action: PayloadAction<number>) => {

        // }
    }
})

export const { updateWidthAction, updateHeightAction, updatePositionAction, updateSelectedSeedBed , createNewSeedBedAction, placeSeedBedAction, changeRowsDirectionAction, setProject,setProjectName, setLMT, setProjectID } = SeedBedsSlice.actions;
export default SeedBedsSlice.reducer;