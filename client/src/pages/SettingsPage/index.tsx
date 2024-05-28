/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { settingsActions } from "../../store/reducers/SettingsSlice";
import Selectbox from "../../components/UI/Selectbox";
import DBManager from "../../helpers/DBManager";
import Button from "../../components/UI/Button";
import Label from "../../components/UI/Label";
import { flexColumn } from "../../styles/mixins";
import ColumnContainer from "../../components/UI/ColumnContainer";
import { monthPartsCountType } from "../../store/reducers/SettingsSlice/types";
import { monthPartsCountSelector, autosaveEnabledSelector, autosaveFrequencySelector } from "../../store/reducers/SettingsSlice/selectors";
import { IOption } from "../../components/types";

type ISettingsViewProps = {
}

const SettingsView: FC<ISettingsViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const monthPartsCount = useAppSelector(monthPartsCountSelector);
    const autosaveEnabled = useAppSelector(autosaveEnabledSelector);
    const autosaveFrequency = useAppSelector(autosaveFrequencySelector);

    const monthPartsCountOptions: IOption[] = [1, 2, 4].map(part => ({ name: part.toString(), value: part }))
    const autosaveFrequencyOptions: IOption[] = [15, 60, 300, 600].map(freq => ({ name: (freq < 60) ? freq + " s" : (freq % 60) + "s", value: freq }))

    const setMonthPartsCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(settingsActions.setMonthPartsCountAction(parseInt(e.currentTarget.value) as monthPartsCountType))
    }

    const saveSettings = () => {
        DBManager.saveSettings();
    }

    return (
        <div css={css`
            width: 50%;
            background-color: #c2c2c2;
            left: 25%;
            position: relative;
        `}>
            <div css={css`
                padding: 10px 20px;
            `}>
                <ColumnContainer>
                    <Label text="Calendar">
                        <ColumnContainer>
                            <label>
                                Calendar part counts
                                <Selectbox defaultValue={monthPartsCount} name="monthPartsCount" onChange={setMonthPartsCount} options={monthPartsCountOptions} />
                            </label>
                        </ColumnContainer>
                    </Label>
                    <Label text="Designing">
                        <ColumnContainer>
                            <label>
                                snap object to other objects
                                <input type="checkbox"
                                    defaultChecked={false}
                                    onChange={undefined}
                                />
                            </label>
                            <label>
                                snap object to grid
                                <input type="checkbox"
                                    defaultChecked={false}
                                    onChange={undefined}
                                />
                            </label>
                            <label>
                                show grid
                                <input type="checkbox"
                                    defaultChecked={false}
                                    onChange={undefined}
                                />
                            </label>
                        </ColumnContainer>
                    </Label>
                    <Label text="Common">
                        <ColumnContainer>
                            <label>
                                autosave
                                <input type="checkbox"
                                    defaultChecked={autosaveEnabled}
                                    onChange={() => dispatch(settingsActions.autosaveToggleEnabled())}
                                />
                            </label>
                            <label>
                                autosave frequency
                                <Selectbox defaultValue={autosaveFrequency} name="monthPartsCount" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { dispatch(settingsActions.updateFrequency(e.currentTarget.value)) }} options={autosaveFrequencyOptions} />
                            </label>
                        </ColumnContainer>

                    </Label>


                </ColumnContainer>

            </div>
            <hr />
            <div css={css`
                margin: auto;
                width: 70px;
            `}>
                <Button onClick={saveSettings} text="Save" />
            </div>
        </div>
    )
}

export default SettingsView;