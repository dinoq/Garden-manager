import { PayloadAction } from "@reduxjs/toolkit";
import { IDesignSlice } from "../../../store/reducers/DesignSlice";

const rotatePlantSectionsZIndex = (state: IDesignSlice, action: PayloadAction<number[]>) => {
    const plantSectionsIDs = action.payload;
    if(!plantSectionsIDs.length){ // Nothing to rotate
        return;
    }

    const sortedPlantSectionsToRotateZIndex = state.objects.seedBeds.filter(sb => plantSectionsIDs.includes(sb.id)).sort((a, b) => a.zIndex - b.zIndex);

    const RotatedZIndexes = sortedPlantSectionsToRotateZIndex.map(section => section.zIndex);
    const lastZIndex = RotatedZIndexes.pop();
    if(lastZIndex){
        RotatedZIndexes.unshift(lastZIndex);
    }

    sortedPlantSectionsToRotateZIndex.forEach((plantSection, index) => {
        plantSection.zIndex = RotatedZIndexes[index];
    });    
}

export const DesignPanelPlantSectionActions = {
    rotatePlantSectionsZIndex
}