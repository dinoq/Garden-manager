import { config } from "./config";
import { GrowthType, IPlant, IVariety } from "./plant-types";

/*

export const pxToCM = (px: number, zoom: number)=>{
    return px/zoom;
}

export const cmToPX = (cm: number, zoom: number)=>{
    return cm*zoom;
}*/

export const zoomedFactory = (zoom: number) => { return (size: number) => zoom * size; }


export const processPlants = (plants: IPlant[], varieties: IVariety[]): IPlant[] => {
    const edited: IPlant[] = [];
    const varietiesObj: {[key: number]: IVariety[];} = {};
    varieties.forEach(variety => { // Remap varieties array to object which has variety.crop as keys
        // Check if the id_foreign value already exists as a key in the result object
        if (varietiesObj[variety.crop]) {
          // If it exists, push the current object to the array associated with that key
          varietiesObj[variety.crop].push(variety);
        } else {
          // If it doesn't exist, create a new array with the current object and assign it to the key
          varietiesObj[variety.crop] = [variety];
        }
      });

    plants.forEach(plant => {
        let editedPlant:IPlant = { ...plant };

        if (varietiesObj[plant.id]) {
            editedPlant.varieties = varietiesObj[plant.id];
        }
        const emptyVariety: IVariety = { id_variety: -1, crop: plant.id, name: "(not selected)", PlantSpacing: null, RowSpacing: null }
        if(editedPlant.varieties?.length){ // Put empty variety at first index
            editedPlant.varieties?.unshift(emptyVariety);
        }else{
            editedPlant.varieties = [emptyVariety];
        }

        if(!editedPlant.RowSpacing){
            consoleWarn(editedPlant.name + " doesn't have RowSpacing set!\nSetting to 1!");
            editedPlant.RowSpacing = "1";
        }
        if(!editedPlant.PlantSpacing){
            consoleWarn(editedPlant.name + " doesn't have PlantSpacing set!\nSetting to 1!");
            editedPlant.PlantSpacing = "1";
        }

        //RowSpacingMin a PlantSpacingMin
        editedPlant.RowSpacingMin = parseInt(editedPlant.RowSpacing);
        editedPlant.PlantSpacingMin = parseInt(editedPlant.PlantSpacing);

        if (Number.isInteger(plant.RowSpacing)) {
            editedPlant.RowSpacingMin = parseInt(editedPlant.RowSpacing);
        } else {
            const dashIndex = editedPlant.RowSpacing.indexOf("-");
            if (dashIndex >= 0) {
                editedPlant.RowSpacingMin = parseInt(editedPlant.RowSpacing.substring(0, dashIndex));

            } else {
            }
        }

        // GrowthType
        editedPlant.growthType = GrowthType[editedPlant["growth-type"] as (keyof typeof GrowthType)];

        edited.push(editedPlant);
    })
    return edited;
}

/**
 * Searches for a record in an array of objects based on the given identifier and identifier name.
 * @param idAttr The name of the attribute to search by.
 * @param idStr The value of the identifier. In format whatever-id (eg. option-3, where 3 id actual id)
 * @param plants The array of objects to search within.
 * @returns The object from the array of objects that corresponds to the given identifier and identifier name, or null if not found.
 */
export const getArrEntryByIDAndIDName = (idAttr: string, idStr: string, plants: Array<any>) => {
    let id = idStr;
    if(idStr.includes("-")){
        const idStart = idStr.indexOf("-") + 1;
        id = idStr.substring(idStart);
    }
    const cropID = parseInt(id);
    return plants.find(plant => plant[idAttr] === cropID)
}

export const stringifyIfDateLong = (variable: any) => {
    if (variable instanceof Date) {
        return variable.toLocaleDateString("cs-CZ", { year: 'numeric', month: "2-digit", day: 'numeric', hour: "2-digit", minute: "2-digit", second: "2-digit" })
    }
    return variable;
}

let warnSwitchedOffShown = true;
export const consoleWarn = (msg: string) => {
    if (config.warnInConsole) {
        console.warn(msg);
    } else if (!warnSwitchedOffShown) {
        console.warn("Warn switched off!");
        warnSwitchedOffShown = true;
    }
}

let errorSwitchedOffShown = false;
export const consoleError = (msg: string) => {
    if (config.errorInConsole) {
        console.error(msg);
    } else if (!errorSwitchedOffShown) {
        console.error("Error switched off!");
        errorSwitchedOffShown = true;
    }
}
