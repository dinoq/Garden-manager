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
    seedBedID: number;
    children: JSX.Element[] | JSX.Element
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    const [position, setPosition] = useState({ x: 500, y: 500 });


    const plantsFromDB: Array<IPlant> = usePlantsFromDB();
    let options: Array<IOption> = plantsFromDB.map((plant: IPlant) => {
        return { name: plant.name, value: plant.id }
    })

    const plantNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('plantNameChanged e.target.value: ', e.target.value);
    }

    return (
        <ModalWindow position={{ left: "initial", top: "50%", right: "0", bottom: "initial" }} dimension={{
            width: "250px", height
                : "initial"
        }} closeModalHandler={() => { dispatch(updateSelectedSeedBed(-1)) }}>
            {props.children}
        </ModalWindow>
    )
}


//const InputField = 

export default FieldEditDialog;