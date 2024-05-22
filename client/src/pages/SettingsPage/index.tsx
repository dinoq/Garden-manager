/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { monthPartsCountType, setMonthPartsCountAction } from "../../store/reducers/SettingsSlice";
import { IOption } from "../../components/UI/SearchableSelectbox";
import Selectbox from "../../components/UI/Selectbox";
import { monthPartsCountSelector } from "../../features/Header/selectors";

type ISettingsViewProps = {
}

const SettingsView: FC<ISettingsViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const monthPartsCount = useAppSelector(monthPartsCountSelector);

    const monthPartsCountOptions: IOption[] = [1, 2, 4].map(part => ({ name: part.toString(), value: part }))
    const setMonthPartsCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMonthPartsCountAction(parseInt(e.currentTarget.value) as monthPartsCountType))
    }

    return (
        <div css={css`
            width: 50%;
            background-color: #c2c2c2;
            left: 25%;
            position: relative;
        `}>
            <hr />
            test
            <hr />
            <Selectbox defaultValue={monthPartsCount} name="monthPartsCount" onChange={setMonthPartsCount} options={monthPartsCountOptions} />

            <div css={css`
                display: flex;
                flex-direction: column;
            `}>
                <label>
                    <input type="checkbox"
                        defaultChecked={false}
                        onChange={undefined}
                    />
                    snap object to other objects
                </label>
                <label>
                    <input type="checkbox"
                        defaultChecked={false}
                        onChange={undefined}
                    />
                    snap object to grid
                </label>
                <label>
                    <input type="checkbox"
                        defaultChecked={false}
                        onChange={undefined}
                    />
                    show grid
                </label>
            </div>
            <hr />
        </div>
    )
}

export default SettingsView;