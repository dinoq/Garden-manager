/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from "@emotion/react";
import React, { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { changePlant, changeVariety, updateSelectedSeedBed, updateSpacingAction } from "../../../store/reducers/SeedBedsSlice";
import InputField from "../../GUI/InputField";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Selectbox, { IOption } from "../../GUI/Selectbox";
import usePlantsFromDB from "../../../hooks/usePlantsFromDB";
import { IPlant } from "../../../helpers/plant-types";
import ModalWindow from "../../GUI/ModalWindow";
import SearchableSelectbox from "../../GUI/SearchableSelectbox";
import Label from "../../GUI/Label";
import { RootState } from "../../../store";
import { getArrEntryByIDAndIDName } from "../../../helpers/functions";
import Slider from "../../GUI/Slider";
import { actualSeedBedSelector } from "./selectors";
export interface IFieldEditDialogProps {
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();
    const actualSeedBed = useAppSelector(actualSeedBedSelector);

    const [plantOptions, setPlantOptions] = useState<IOption[]>([]);
    const [varietyOptions, setVarietyOptions] = useState<IOption[]>([]);
    const modalWidth = 250;

    const [plantsFromDB, setPlantsFromDB] = useState<IPlant[]>([]);

    const plantSpacing: number = actualSeedBed.plantSpacingMin ? actualSeedBed.plantSpacingMin : actualSeedBed.plant.PlantSpacingMin;
    const rowSpacing = actualSeedBed.plant.RowSpacingMin;

    const spacingOptions: IOption[] = (actualSeedBed.variety && actualSeedBed.variety.PlantSpacingMin? ["From plant", "From variety", "Custom"] : ["From plant", "Custom"]).map((opt, index) => ({ name: opt, value: index }));
    const [selectedSpacingOption, setSelectedSpacingOption] = useState(0);

    useEffect(() => {
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
        if (newVariety) {
            dispatch(changeVariety(newVariety));
        }
    }

    const plantSpacingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSpacingAction({ id: actualSeedBed.id, plantSpacing: parseInt(e.currentTarget.value), rowSpacing }))
    }

    const rowSpacingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSpacingAction({ id: actualSeedBed.id, plantSpacing, rowSpacing: parseInt(e.currentTarget.value) }))
    }

    const spacingTypeChangedEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const option = parseInt(e.currentTarget.value);
        setSelectedSpacingOption(option);
        if(option === 0){
            dispatch(updateSpacingAction({ id: actualSeedBed.id, plantSpacing: actualSeedBed.plant.PlantSpacingMin, rowSpacing: actualSeedBed.plant.RowSpacingMin}))
        } else if(option === 1) {
            const plantSpacing = actualSeedBed.variety?.PlantSpacingMin? actualSeedBed.variety?.PlantSpacingMin : actualSeedBed.plant.PlantSpacingMin;
            const rowSpacing = actualSeedBed.variety?.RowSpacingMin? actualSeedBed.variety?.RowSpacingMin : actualSeedBed.plant.RowSpacingMin;
            dispatch(updateSpacingAction({ id: actualSeedBed.id, plantSpacing, rowSpacing}))
        } else{
            dispatch(updateSpacingAction({ id: actualSeedBed.id, plantSpacing, rowSpacing}))
        }
    }

    return (
        <ModalWindow position={{ left: "50%", top: "50%" }} dimension={{
            width: (modalWidth + 30) + "px", height
                : "initial"
        }} closeModalHandler={() => { dispatch(updateSelectedSeedBed(-1)) }}>
            <Label text={"Plant"}>
                {plantOptions.length > 0 ? <SearchableSelectbox name="field-edit-dialog-crop-selectbox" allOptions={plantOptions} selectedValue={actualSeedBed.plant.id} onChange={cropChanged} modalWidth={modalWidth} /> : <div>loading...</div>}
            </Label>
            <Label text={"Variety"}>
                {varietyOptions.length > 0 ? <SearchableSelectbox name="field-edit-dialog-variety-selectbox" allOptions={varietyOptions} selectedValue={actualSeedBed.variety?.id_variety || 0} onChange={varietyChanged} modalWidth={modalWidth} /> : <div>loading...</div>}
            </Label>
            <Label text={"Spacing"}>
                <Selectbox defaultValue={selectedSpacingOption} name="spacing-selectbox" onChange={spacingTypeChangedEventHandler} options={spacingOptions} />
                <div css={css`
                    display: flex;
                    width: 100%;
                `}>
                    <Slider defaultVal={plantSpacing} minVal={plantSpacing / 2} maxVal={plantSpacing * 2} onChange={plantSpacingChanged} />
                    <Slider defaultVal={rowSpacing} minVal={rowSpacing / 2} maxVal={rowSpacing * 2} onChange={rowSpacingChanged} />
                </div>
            </Label>
        </ModalWindow>
    )
}


//const InputField = 

export default memo(FieldEditDialog);