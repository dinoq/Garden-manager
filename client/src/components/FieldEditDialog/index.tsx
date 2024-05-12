/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changePlant, changeVariety, updateSelectedSeedBed } from "../../store/reducers/SeedBedsSlice";
import InputField from "../GUI/InputField";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IOption } from "../GUI/Selectbox";
import usePlantsFromDB from "../../hooks/usePlantsFromDB";
import { IPlant } from "../../helpers/plant-types";
import ModalWindow from "../GUI/ModalWindow";
import SearchableSelectbox from "../GUI/SearchableSelectbox";
import Label from "../GUI/Label";
import { RootState } from "../../store";
import { getArrEntryByIDAndIDName } from "../../helpers/functions";
export interface IFieldEditDialogProps {
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    const actualSeedBed = useAppSelector((state: RootState) => state.seedBedsReducer.seedBeds[state.seedBedsReducer.selectedSeedBed]);

    const [plantOptions, setPlantOptions] = useState<IOption[]>([]);
    const [varietyOptions, setVarietyOptions] = useState<IOption[]>([]);
    const modalWidth = 250;

    const [plantsFromDB, setPlantsFromDB] = useState<IPlant[]>([]);

    
    useEffect(() => {
        console.log('actualSeedBed.plant.varieties: ', actualSeedBed.plant.varieties);
        let varietyOps: Array<IOption> = actualSeedBed.plant.varieties.map(variety => {
            return { name: variety.name, value: variety.id_variety }
        })
        setVarietyOptions(varietyOps);
    }, [actualSeedBed.plant.varieties]) 
    
    const pl: Array<IPlant> = usePlantsFromDB();
    useEffect(() => {
        setPlantsFromDB(pl);
    }, [pl]) // Todo - musí to byt v useeffect?

    useEffect(() => {
        let plantOps: Array<IOption> = plantsFromDB.map((plant: IPlant) => {
            return { name: plant.name, value: plant.id }
        })
        setPlantOptions(plantOps);
    }, [plantsFromDB])

    const cropChanged = (e: React.MouseEvent) => {
        const newPlant = getArrEntryByIDAndIDName("id", e.currentTarget.id, plantsFromDB);
        if (newPlant) {
            dispatch(changePlant(newPlant));
        }
    }

    const varietyChanged = (e: React.MouseEvent) => {
        const newVariety = getArrEntryByIDAndIDName("id_variety", e.currentTarget.id, actualSeedBed.plant.varieties);
        console.log('newVariety: ', newVariety);
        if (newVariety) {
            dispatch(changeVariety(newVariety));
        }
    }

    return (
        <ModalWindow position={{ left: "50%", top: "50%" }} dimension={{
            width: (modalWidth + 30) + "px", height
                : "initial"
        }} closeModalHandler={() => { dispatch(updateSelectedSeedBed(-1)) }}>
            <Label text={"Plodina"}>
                {plantOptions.length > 0 ? <SearchableSelectbox allOptions={plantOptions} selectedValue={actualSeedBed.plant.id} onChange={cropChanged} modalWidth={modalWidth} /> : <div>loading...</div>}
            </Label>
            <Label text={"Odrůda"}>
                {varietyOptions.length > 0 ? <SearchableSelectbox allOptions={varietyOptions} selectedValue={actualSeedBed.variety?.id_variety || 0} onChange={varietyChanged} modalWidth={modalWidth} /> : <div>loading...</div>}
            </Label>
            <InputField value={actualSeedBed.plant.PlantSpacing + " x " + actualSeedBed.plant.RowSpacing} onChangeHandler={() => { console.log("READONLY INPUT!") }} />
        </ModalWindow>
    )
}


//const InputField = 

export default memo(FieldEditDialog);