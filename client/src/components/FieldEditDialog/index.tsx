/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateSelectedSeedBed } from "../../store/reducers/SeedBedsSlice";
import InputField from "../GUI/InputField";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IOption } from "../GUI/Selectbox";
import usePlantsFromDB from "../../hooks/usePlantsFromDB";
import { IPlant } from "../../helpers/plant-types";
import ModalWindow from "../GUI/ModalWindow";
import SearchableSelectbox from "../GUI/SearchableSelectbox";
export interface IFieldEditDialogProps {
    id: number;
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    const [position, setPosition] = useState({ x: 500, y: 500 });

    const seedBed = useAppSelector(state => state.seedBedsReducer.seedBeds[props.id]);

    const plantsFromDB: Array<IPlant> = usePlantsFromDB();
    let options: Array<IOption> = plantsFromDB.map((plant: IPlant) => {
        return { name: plant.name, value: plant.id }
    })
    
    return (
        <ModalWindow position={{left: "initial", top: "50%", right: "0", bottom:"initial"}} dimension={{width: "250px", height
        : "initial"}} closeModalHandler={() => { dispatch(updateSelectedSeedBed(-1))}}>
            <InputField value="Field1" onChangeHandler={()=>{}}/>
            <SearchableSelectbox defaultValue={seedBed.plant.id} options={options} />
            <InputField value={seedBed.plant.inRowSpacing + " x " + seedBed.plant.betweenRowSpacing} onChangeHandler={()=>{console.log("READONLY INPUT!")}}/>

        </ModalWindow>
    )
}


//const InputField = 

export default FieldEditDialog;