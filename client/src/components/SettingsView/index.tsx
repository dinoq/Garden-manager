/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import Selectbox, { IOption } from "../GUI/Selectbox";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { monthPartsCountType, setMonthPartsCountAction } from "../../store/reducers/SettingsSlice";

type ISettingsViewProps = {
}

const SettingsView: FC<ISettingsViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const monthPartsCount = useAppSelector(state => state.settingsReducer.calendar.monthPartsCount);
    
    const monthPartsCountOptions: IOption[] = [1,2,4].map(part => ({name: part.toString(), value: part}))
    const setMonthPartsCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMonthPartsCountAction(parseInt(e.currentTarget.value) as monthPartsCountType))
        console.log('e.currentTarget.value: ', e.currentTarget.value);
    }

    return (
        <div>
            <hr />
            test
            <hr />
                <Selectbox defaultValue={monthPartsCount} name="monthPartsCount" onChange={setMonthPartsCount} options={monthPartsCountOptions} />
                [ ] snap objects to other objects
                [ ] snap objects to grid
                [ ] show grid
            <hr />
        </div>
    )
}

export default SettingsView;