import { createSlice } from "@reduxjs/toolkit";
import { ISeedBed } from "../../../helpers/types";
import { plantSectionActions } from "./actions/plantSectionsActions";
import { projectActions } from "./actions/projectActions";
import { calendarActions } from "./actions/calendarActions";
import { DesignPanelPlantSectionActions } from "../../../features/DesignPanel/actions";

interface ICalendarSlice{
    actualYear: number,
    actualMonth: number,
    actualMonthPart: number,
    showAllMonths: boolean
}

export interface IProjectSlice{
    projectID: number,
    projectName: string,
    lastModified: number,
    created: number,
}

interface IObjectsSlice {    
    seedBeds: ISeedBed[],
    selectedSeedBedID: number,
}

export interface IDesignSlice {
    objects: IObjectsSlice,
    project: IProjectSlice
    calendar: ICalendarSlice
}

const initialState: IDesignSlice = {
    objects: {
        seedBeds: [],
        selectedSeedBedID: -1,
    },
    project:{
        projectID: -1,
        projectName: "",
        lastModified: new Date().getTime(),
        created: new Date().getTime(),
    },
    calendar: {
        actualYear: new Date().getFullYear(),
        actualMonth: new Date().getMonth(),
        actualMonthPart: 0,
        showAllMonths: false
    }
}

const DesignSlice = createSlice({
    name: "DesignSlice",
    initialState,
    reducers: {
        ...projectActions,
        ...plantSectionActions,
        ...calendarActions,
        ...DesignPanelPlantSectionActions
    }
})

export const designActions = DesignSlice.actions;
export default DesignSlice.reducer;