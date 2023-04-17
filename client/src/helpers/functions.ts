import { config } from "./config";
import { GrowthType, IPlant } from "./plant-types";

/*

export const pxToCM = (px: number, zoom: number)=>{
    return px/zoom;
}

export const cmToPX = (cm: number, zoom: number)=>{
    return cm*zoom;
}*/

export const zoomedFactory = (zoom: number) => { return (size: number) => zoom * size;}


export const processPlants = (plants: IPlant[]) => {
    const edited = new Array();

    plants.forEach(plant =>{
        let editedPlant = {...plant};

        //betweenRowSpacingMin a inRowSpacingMin
        editedPlant.betweenRowSpacingMin = parseInt(editedPlant.betweenRowSpacing);
        editedPlant.inRowSpacingMin = parseInt(editedPlant.inRowSpacing);

        if(Number.isInteger(plant.betweenRowSpacing)){
            editedPlant.betweenRowSpacingMin = parseInt(plant.betweenRowSpacing);
        }else{
            const dashIndex = editedPlant.betweenRowSpacing?.indexOf("-");
            if(dashIndex >= 0){
                editedPlant.betweenRowSpacingMin = parseInt(plant.betweenRowSpacing.substring(0,dashIndex));
                
            }else{
            }
        }

        // GrowthType
        editedPlant.growthType = GrowthType[editedPlant["growth-type"] as (keyof typeof GrowthType)];

        edited.push(editedPlant);
    })
    console.log('edited: ', edited);
    return edited;
}


let warnSwitchedOffShown = false;
export const consoleWarn = (msg: string) =>{
    if(config.warnInConsole){
        console.warn(msg);
    }else if(!warnSwitchedOffShown){
        console.warn("Warn switched off!");
        warnSwitchedOffShown = true;
    }
}

let errorSwitchedOffShown = false;
export const consoleError = (msg: string) =>{
    if(config.errorInConsole){
        console.error(msg);
    }else if(!errorSwitchedOffShown){
        console.error("Error switched off!");
        errorSwitchedOffShown = true;
    }
}
