import { config } from "./config";


export const pxToCM = (px: number, zoom: number)=>{
    return px/zoom;
}

export const cmToPX = (cm: number, zoom: number)=>{
    return cm*zoom;
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