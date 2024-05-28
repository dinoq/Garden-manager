/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from "@emotion/react";
import React, { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";

import { useAppSelector } from "../../../../hooks/useAppSelector";
import usePlantsFromDB from "../../../../hooks/usePlantsFromDB";
import { IPlant } from "../../../../helpers/plant-types";
import { getArrEntryByIDAndIDName } from "../../../../helpers/functions";
import SearchableSelectbox from "../../../../components/UI/SearchableSelectbox";
import Label from "../../../../components/UI/Label";
import ModalWindow from "../../../../components/UI/ModalWindow";
import DoubleSlider from "../../../../components/UI/DoubleSlider";
import Selectbox from "../../../../components/UI/Selectbox";
import { designActions } from "../../../../store/reducers/DesignSlice";
import { selectedSeedBedSelector, actualYearSelector } from "../../../../store/reducers/DesignSlice/selectors";
import { IOption } from "../../../../components/types";
export interface IFieldEditDialogProps {
}

const FieldEditDialog: React.FC<IFieldEditDialogProps> = (props) => {
    const dispatch = useAppDispatch();

    const selectedSeedBed = useAppSelector(selectedSeedBedSelector);
    const actualYear = useAppSelector(actualYearSelector);

    const inGround = selectedSeedBed.inGround;

    const [plantOptions, setPlantOptions] = useState<IOption[]>([]);
    const [varietyOptions, setVarietyOptions] = useState<IOption[]>([]);
    const modalWidth = 250;

    const [plantsFromDB, setPlantsFromDB] = useState<IPlant[]>([]);

    const plantSpacing: number = selectedSeedBed.plantSpacingMin ? selectedSeedBed.plantSpacingMin : selectedSeedBed.plant.PlantSpacingMin;
    const rowSpacing = selectedSeedBed.rowSpacingMin ? selectedSeedBed.rowSpacingMin : selectedSeedBed.plant.RowSpacingMin;

    const spacingOptions: IOption[] = (selectedSeedBed.variety && selectedSeedBed.variety.PlantSpacingMin ? ["From plant", "From variety", "Custom"] : ["From plant", "Custom"]).map((opt, index) => ({ name: opt, value: index }));
    const [selectedSpacingOption, setSelectedSpacingOption] = useState(0);

    useEffect(() => {
        let varietyOps: Array<IOption> = selectedSeedBed.plant.varieties.map(variety => {
            return { name: variety.name, value: variety.id_variety }
        })
        setVarietyOptions(varietyOps);
    }, [selectedSeedBed.plant.varieties])

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
            dispatch(designActions.changePlantAction(newPlant));
        }
    }

    const varietyChanged = (e: React.MouseEvent) => {
        const newVariety = getArrEntryByIDAndIDName("id_variety", e.currentTarget.id, selectedSeedBed.plant.varieties);
        if (newVariety) {
            dispatch(designActions.changeVarietyAction(newVariety));
        }
    }

    const plantSpacingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(designActions.updateSpacingAction({ id: selectedSeedBed.id, plantSpacing: parseInt(e.currentTarget.value), rowSpacing }))
    }

    const rowSpacingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(designActions.updateSpacingAction({ id: selectedSeedBed.id, plantSpacing, rowSpacing: parseInt(e.currentTarget.value) }))
    }

    const spacingTypeChangedEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const option = parseInt(e.currentTarget.value);
        setSelectedSpacingOption(option);
        if (option === 0) {
            dispatch(designActions.updateSpacingAction({ id: selectedSeedBed.id, plantSpacing: selectedSeedBed.plant.PlantSpacingMin, rowSpacing: selectedSeedBed.plant.RowSpacingMin }))
        } else if (option === 1) {
            const plantSpacing = selectedSeedBed.variety?.PlantSpacingMin ? selectedSeedBed.variety?.PlantSpacingMin : selectedSeedBed.plant.PlantSpacingMin;
            const rowSpacing = selectedSeedBed.variety?.RowSpacingMin ? selectedSeedBed.variety?.RowSpacingMin : selectedSeedBed.plant.RowSpacingMin;
            dispatch(designActions.updateSpacingAction({ id: selectedSeedBed.id, plantSpacing, rowSpacing }))
        } else {
            dispatch(designActions.updateSpacingAction({ id: selectedSeedBed.id, plantSpacing, rowSpacing }))
        }
    }

    const yearRoundPlantingChangedListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(designActions.setYearRound({ id: selectedSeedBed.id, yearRoundPlanting: e.currentTarget.checked }));
    }

    const fromMonthChangedListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fromMonth = parseInt(e.currentTarget.value.substring(e.currentTarget.value.indexOf("-") + 1)) - 1;
        dispatch(designActions.setSeedbedInGroundFromMonth({ id: selectedSeedBed.id, fromMonth }));
    }

    const toMonthChangedListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        const toMonth = parseInt(e.currentTarget.value.substring(e.currentTarget.value.indexOf("-") + 1)) - 1;
        dispatch(designActions.setSeedbedInGroundToMonth({ id: selectedSeedBed.id, fromMonth: toMonth }));
    }

    return (
        <div css={css`
            hr{
                width: 100%;
            }

            h3{
                font-size: 1rem;
                margin: 4px;
            }
        `}>
            <ModalWindow position={{ left: "50%", top: "50%" }} dimension={{
                width: (modalWidth + 30) + "px", height
                    : "initial"
            }} closeModalHandler={() => { dispatch(designActions.updateSelectedSeedBedAction(-1)) }}>
                <Label text={"Plant"}>
                    {plantOptions.length > 0 ? <SearchableSelectbox name="field-edit-dialog-crop-selectbox" allOptions={plantOptions} selectedValue={selectedSeedBed.plant.id} onChange={cropChanged} modalWidth={modalWidth} /> : <div>loading...</div>}
                </Label>
                <Label text={"Variety"}>
                    {varietyOptions.length > 0 ? <SearchableSelectbox name="field-edit-dialog-variety-selectbox" allOptions={varietyOptions} selectedValue={selectedSeedBed.variety?.id_variety || 0} onChange={varietyChanged} modalWidth={modalWidth} /> : <div>loading...</div>}
                </Label>
                <hr />
                <Label text={"Spacing"}>
                    <Selectbox defaultValue={selectedSpacingOption} name="spacing-selectbox" onChange={spacingTypeChangedEventHandler} options={spacingOptions} />
                    <DoubleSlider defaultVals={{ A: plantSpacing, B: rowSpacing }} maxVals={{ A: (plantSpacing * 2), B: (rowSpacing * 2) }} minVals={{ A: (plantSpacing / 2), B: rowSpacing / 2 }} onChange={{ A: plantSpacingChanged, B: rowSpacingChanged }} />
                </Label>
                <hr />
                <Label text={"In ground"}>
                    <label>Year-round
                        <input type="checkbox" checked={inGround.yearRoundPlanting} onChange={yearRoundPlantingChangedListener} />
                    </label>
                    <div css={css`
                        display: grid;
                        grid-template-columns: auto 1fr;
                        gap: 10px;
                        align-items: center;
                        max-width: 300px; /* Adjust the max width as needed */
                    `}>
                        <label htmlFor="fromMonth" css={css`grid-column: 1;`}>From</label>
                        <input
                            id="fromMonth"
                            css={css`grid-column: 2;`}
                            type="month"
                            value={`${actualYear}-${("0" + (inGround.from.month+1)).slice(-2)}`}
                            onChange={fromMonthChangedListener}
                            disabled={inGround.yearRoundPlanting}
                        />
                        <label htmlFor="toMonth" css={css`grid-column: 1;`}>To</label>
                        <input
                            id="toMonth"
                            css={css`grid-column: 2;`}
                            type="month"
                            value={`${actualYear}-${("0" + (inGround.to.month+1)).slice(-2)}`}
                            onChange={toMonthChangedListener}
                            disabled={inGround.yearRoundPlanting}
                        />
                    </div>
                </Label>
            </ModalWindow>
        </div>
    )
}

export default memo(FieldEditDialog);