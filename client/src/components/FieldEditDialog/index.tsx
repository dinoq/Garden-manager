/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
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
export interface IFieldEditDialogProps {
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    
    const actualSeedBedSelector = (state: RootState) => state.seedBedsReducer.seedBeds[state.seedBedsReducer.selectedSeedBed];

    
    const actualSeedBed = useAppSelector(actualSeedBedSelector);
    
    const [position, setPosition] = useState({ x: 500, y: 500 });

    const modalWidth = 250;

    const plantsFromDB: Array<IPlant> = usePlantsFromDB();
    let options: Array<IOption> = plantsFromDB.map((plant: IPlant) => {
        return { name: plant.name, value: plant.id }
    })

    const cropChanged = (e: React.MouseEvent) => {
        const cropID = parseInt(e.currentTarget.id.substring("option-".length));
        console.log('cropID: ', cropID);
        const newPlant = plantsFromDB.find(plant => plant.id === cropID)
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
                <SearchableSelectbox defaultOptions={options} defaultValue={0} onChange={cropChanged} width={modalWidth}/>
            </Label>
            <InputField value={actualSeedBed.plant.PlantSpacing + " x " + actualSeedBed.plant.RowSpacing} onChangeHandler={() => { console.log("READONLY INPUT!") }} />
        </ModalWindow>
    )
}


//const InputField = 

export default FieldEditDialog;