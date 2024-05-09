/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changePlant, updateSelectedSeedBed } from "../../store/reducers/SeedBedsSlice";
import InputField from "../GUI/InputField";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IOption } from "../GUI/Selectbox";
import usePlantsFromDB from "../../hooks/usePlantsFromDB";
import { IPlant } from "../../helpers/plant-types";
import ModalWindow from "../GUI/ModalWindow";
import SearchableSelectbox from "../GUI/SearchableSelectbox";
import Label from "../GUI/Label";
import { RootState } from "../../store";
import { getPlantByID } from "../../helpers/functions";
export interface IFieldEditDialogProps {
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    
    
    const actualSeedBed = useAppSelector((state: RootState) => state.seedBedsReducer.seedBeds[state.seedBedsReducer.selectedSeedBed]);
    
    useEffect(()=>{
        console.log('actualSeedBedchanged!: ', JSON.stringify(actualSeedBed));
    }, [actualSeedBed])
    const [position, setPosition] = useState({ x: 500, y: 500 });
    const [plantOptions, setPlantOptions] = useState<IOption[]>([]);
    const modalWidth = 250;

    const plantsFromDB: Array<IPlant> = usePlantsFromDB();

    useEffect(()=>{
        let options: Array<IOption> = plantsFromDB.map((plant: IPlant) => {
            return { name: plant.name, value: plant.id }
        })
        setPlantOptions(options);
    }, [plantsFromDB])

    const cropChanged = (e: React.MouseEvent) => {
        const newPlant = getPlantByID(e.currentTarget.id, plantsFromDB);
        console.log('newPlant: ', newPlant);
        if(newPlant){
            dispatch(changePlant(newPlant));
        }
    }

    return (
        <ModalWindow position={{ left: "initial", top: "50%", right: "0", bottom: "initial" }} dimension={{
            width: modalWidth+"px", height
                : "initial"
        }} closeModalHandler={() => { dispatch(updateSelectedSeedBed(-1)) }}>
            <Label text={"Plodina"}>
                <SearchableSelectbox allOptions={plantOptions} defaultValue={0} onChange={cropChanged} modalWidth={modalWidth}/>
            </Label>
            <InputField value={actualSeedBed.plant.PlantSpacing + " x " + actualSeedBed.plant.RowSpacing} onChangeHandler={() => { console.log("READONLY INPUT!") }} />
        </ModalWindow>
    )
}


//const InputField = 

export default FieldEditDialog;