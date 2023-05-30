/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateSelectedSeedBed } from "../../store/reducers/SeedBedsSlice";
import InputField from "../GUI/InputField";
import { DEPTH } from "../../helpers/constants";
import { useAppSelector } from "../../hooks/useAppSelector";
import Selectbox from "../GUI/Selectbox";
import usePlantsFromDB from "../../hooks/usePlantsFromDB";
import { IPlant, IPlantDB } from "../../helpers/plant-types";
import ModalWindow from "../GUI/ModalWindow";
export interface IFieldEditDialogProps {
    id: number;
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    const [position, setPosition] = useState({ x: 500, y: 500 });

    const seedBed = useAppSelector(state => state.seedBedsReducer.seedBeds[props.id]);

    const plantsFromDB = usePlantsFromDB();
    let options = plantsFromDB.map((plant: IPlant) => {
        return { text: plant.name, value: plant.id }
    })
    
    return (
        <ModalWindow position={{left: "initial", top: "50%", right: "0", bottom:"initial"}} dimension={{width: "250px", height
        : "initial"}} closeModalHandler={() => { dispatch(updateSelectedSeedBed(-1))}}>

            <Selectbox defaultValue={seedBed.plant.name} options={[]} />
            <InputField value={seedBed.plant.inRowSpacing + " x " + seedBed.plant.betweenRowSpacing} onChangeHandler={()=>{console.log("READONLY INPUT!")}}/>

        </ModalWindow>
    )
}


//const InputField = 

export default FieldEditDialog;