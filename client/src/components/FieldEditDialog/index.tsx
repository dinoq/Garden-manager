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
export interface IFieldEditDialogProps {
    id: number;
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    const [position, setPosition] = useState({ x: 500, y: 500 });

    const seedBed = useAppSelector(state => state.seedBedsReducer.seedBeds[props.id]);

    const plantsFromDB = usePlantsFromDB();
    let options = plantsFromDB.map((plant: IPlant)=>{
        return {text:plant.name, value: plant.id}
    })
    console.log('options: ', options);
    return (
        <div css={css`
            padding: 20px;
            position: fixed;
            /* left: ${position.x}px;
            top: ${position.y}px; */
            right: 0;
            top: 500px;
            background-color: #474747;
            border-radius: 10px;
            z-index: ${DEPTH.FIELD_EDITS};
        `}>
            <div onClick={() => { dispatch(updateSelectedSeedBed(-1)) }} css={css`            
                position: relative;
                top: -15px;
                right: -5px;
                color: white;
                border: 1px solid aliceblue;
                border-radius: 5px;
                padding: 1px 5px;
                cursor: pointer;
            `}>X</div>

            <Selectbox value={seedBed.plant.name} options={[]}/>
            <InputField value={seedBed.plant.inRowSpacing + " x " + seedBed.plant.betweenRowSpacing} />

        </div>
    )
}


//const InputField = 

export default FieldEditDialog;