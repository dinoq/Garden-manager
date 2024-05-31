import { config } from "./config";
import { GrowthType, IPlant, IVariety } from "./plant-types";

const PX_RECALC = 5;
/**
 * 
 * @param zoom Recalculate pixels to cm in actual zoom. If zoom is default (1.0), then 1cm correspond to 5px
 * @returns 
 */
export const pxToCM = (px: number, zoom: number)=>{
    return (px / PX_RECALC) * zoom;
}

/**
 * 
 * @param zoom Recalculate cm to pixels in actual zoom. If zoom is default (1.0), then 1cm correspond to 5px
 * @returns 
 */
export const cmToPX = (cm: number, zoom: number)=>{
    return cm * PX_RECALC *zoom;
}

export const zoomedFactory = (zoom: number) => { return (size: number) => zoom * size; }


export const processPlants = (plants: IPlant[], varieties: IVariety[]): IPlant[] => {
    const edited: IPlant[] = [];
    const varietiesObj: {[key: number]: IVariety[];} = {};
    varieties.forEach(variety => { // process varieties and remap varieties array to object which has variety.crop as keys
        const varietyCopy: IVariety = JSON.parse(JSON.stringify(variety));
        varietyCopy.RowSpacingMin = parseSpacingToMin(varietyCopy.RowSpacingStr || "0");
        varietyCopy.PlantSpacingMin = parseSpacingToMin(varietyCopy.PlantSpacingStr || "0");

        // Check if the id_foreign value already exists as a key in the result object
        if (varietiesObj[varietyCopy.crop]) {
          // If it exists, push the current object to the array associated with that key
          varietiesObj[varietyCopy.crop].push(varietyCopy);
        } else {
          // If it doesn't exist, create a new array with the current object and assign it to the key
          varietiesObj[varietyCopy.crop] = [varietyCopy];
        }


      });

    plants.forEach(plant => {
        let editedPlant:IPlant = { ...plant };

        if (varietiesObj[plant.id]) {
            editedPlant.varieties = varietiesObj[plant.id];
        }
        const emptyVariety: IVariety = { id_variety: -1, crop: plant.id, name: "(not selected)", PlantSpacingStr: null, RowSpacingStr: null, PlantSpacingMin: 0, RowSpacingMin: 0 }
        if(editedPlant.varieties?.length){ // Put empty variety at first index
            editedPlant.varieties?.unshift(emptyVariety);
        }else{
            editedPlant.varieties = [emptyVariety];
        }

        if(!editedPlant.RowSpacingStr){
            consoleWarn(editedPlant.name + " doesn't have RowSpacing set!\nSetting to 1!");
            editedPlant.RowSpacingStr = "1";
        }
        if(!editedPlant.PlantSpacingStr){
            consoleWarn(editedPlant.name + " doesn't have PlantSpacing set!\nSetting to 1!");
            editedPlant.PlantSpacingStr = "1";
        }

        //RowSpacingMin a PlantSpacingMin
        editedPlant.RowSpacingMin = parseSpacingToMin(plant.RowSpacingStr || "0");
        editedPlant.PlantSpacingMin = parseSpacingToMin(plant.PlantSpacingStr || "0");

        // GrowthType
        editedPlant.growthType = GrowthType[editedPlant["growth-type"] as (keyof typeof GrowthType)];

        edited.push(editedPlant);
    })
    return edited;
}

const parseSpacingToMin = (strSpacing: string) => {
    if (/^\d+$/.test(strSpacing)) {
        return parseInt(strSpacing);
    } else {
        const dashIndex = strSpacing.indexOf("-");
        const slashIndex = strSpacing.indexOf("/");
        if (dashIndex >= 0) {
            return parseInt(strSpacing.substring(0, dashIndex));
        } else if (slashIndex >= 0) {
            return parseInt(strSpacing.substring(slashIndex + 1));
        } else {
            throw new Error("Strange spacing in DB: " + strSpacing);
        }
    }
}

/**
 * Searches for a record in an array of objects based on the given identifier and identifier name.
 * @param idAttr The name of the attribute to search by.
 * @param idStr The value of the identifier. In format whatever-id (eg. option-3, where 3 id actual id)
 * @param arr The array of objects to search within.
 * @returns The object from the array of objects that corresponds to the given identifier and identifier name, or null if not found.
 */
export const getArrEntryByIDAndIDName = (idAttr: string, idStr: string, arr: Array<any>) => {
    let id = idStr;
    if(idStr.includes("-")){
        const idStart = idStr.indexOf("-") + 1;
        id = idStr.substring(idStart);
    }
    const entryID = parseInt(id);
    return arr.find(entry => entry[idAttr] === entryID)
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
