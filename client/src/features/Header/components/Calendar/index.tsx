/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { DEPTH } from '../../../../helpers/constants';
import { IOption } from '../../../../components/UI/SearchableSelectbox';
import LabeledCard from '../../../../components/UI/LabeledCard';
import Selectbox from '../../../../components/UI/Selectbox';
import { designActions } from '../../../../store/reducers/DesignSlice';
import { actualYearSelector, actualMonthSelector, actualMonthPartSelector, showAllMonthsSelector } from '../../../../store/reducers/DesignSlice/selectors';
import { monthPartsCountSelector } from '../../../../store/reducers/SettingsSlice/selectors';

interface ICalendarProps {

}

const Calendar: React.FC<ICalendarProps> = (props) => {
    const dispatch = useAppDispatch();
    const year = useAppSelector(actualYearSelector)
    const month = useAppSelector(actualMonthSelector)
    console.log('month: ', month);
    const monthPart = useAppSelector(actualMonthPartSelector)
    const showAllMonths = useAppSelector(showAllMonthsSelector)

    const monthPartCount = useAppSelector(monthPartsCountSelector);

    const lastFrostMonth = 5;
    const lastFrostDay = 15;

    const firstFrostMonth = 10;
    const firstFrostDay = 1;


    const timelineWidth = 250 * monthPartCount;
    const linesCount = 13 * monthPartCount;
    const monthPartWidth = timelineWidth / linesCount;
    const halfMonthPartWidth = 0.5 * monthPartWidth;
    const calendarWidth = 150;
    const initialTimelineX = (calendarWidth / 2) + 5 - halfMonthPartWidth;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [timelineX, setTimelineX] = useState(initialTimelineX);
    const [mouseDownX, setMouseDownX] = useState(0)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsOptions: IOption[] = months.map((month, index) => ({ name: month, value: index }))
    const monthPartOptions: IOption[] = []
    for (let i = 0; i < monthPartCount; i++) {
        monthPartOptions.push({ name: (i + 1) + (monthPartCount === 2 ? ". half" : ". quarter"), value: i })
    }
    const lastFrostDateBarWidth = (lastFrostMonth) * monthPartCount * monthPartWidth - (monthPartWidth * monthPartCount * (lastFrostDay / new Date(new Date().getFullYear(), month + 1, 0).getDate()));

    const setMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.currentTarget.value);
        if (newMonth !== month) {
            dispatch(designActions.setMonthAction(newMonth));
            dispatch(designActions.setMonthPartAction(0));
            setTimelineX(initialTimelineX - (monthPartWidth * newMonth * monthPartCount));
        }
    }

    const setMonthPart = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonthPart = parseInt(e.currentTarget.value);
        if (newMonthPart !== monthPart) {
            setTimelineX(initialTimelineX - (monthPartWidth * month * monthPartCount) - (newMonthPart * monthPartWidth));
            dispatch(designActions.setMonthPartAction(newMonthPart));
        }
    }
    const setPrevYear = () => {
        dispatch(designActions.setYearAction(year - 1));
        dispatch(designActions.setMonthAction(0));
        dispatch(designActions.setMonthPartAction(0));
        setTimelineX(initialTimelineX);
    }

    const setNextYear = () => {
        dispatch(designActions.setYearAction(year + 1));
        dispatch(designActions.setMonthAction(0));
        dispatch(designActions.setMonthPartAction(0));
        setTimelineX(initialTimelineX);
    }

    const setPrevMonth = () => {
        setTimelineX(initialTimelineX - monthPartWidth * ((month - 1) * monthPartCount + (monthPart)));
        dispatch(designActions.setMonthAction(month - 1));
        dispatch(designActions.setMonthPartAction(0));
    }

    const setNextMonth = () => {
        setTimelineX(initialTimelineX - monthPartWidth * ((month + 1) * monthPartCount + (monthPart)));
        dispatch(designActions.setMonthAction(month + 1));
        dispatch(designActions.setMonthPartAction(0));
    }

    const mouseDown = (e: React.MouseEvent) => {
        setIsMouseDown(true);
        setMouseDownX(e.clientX - timelineX);
    }

    const mouseMove = (e: React.MouseEvent) => {
        if (isMouseDown) {
            const newX = e.clientX - mouseDownX;
            if (newX < initialTimelineX && newX > (-timelineWidth + calendarWidth) + 10) {
                setTimelineX(newX);
                const monthsPartShiftedCount = Math.floor((initialTimelineX - newX - halfMonthPartWidth) / monthPartWidth) + 1;
                const newMonth = Math.floor(monthsPartShiftedCount / monthPartCount);
                const newMonthPart = monthsPartShiftedCount % monthPartCount;
                dispatch(designActions.setMonthPartAction(newMonthPart));
                dispatch(designActions.setMonthAction(newMonth));
            }
        }
    }

    const mouseUp = (e: React.MouseEvent) => {
        setIsMouseDown(false);
        setTimelineX(initialTimelineX - (monthPartWidth * month * monthPartCount) - (monthPart * monthPartWidth));
    }

    let lines: Array<any> = [];
    for (let i = 0; i < linesCount; i++) {
        const lineIsMonth = i % monthPartCount === 0;
        let monthStr = (((Math.floor(i / monthPartCount)) % 12) + 1).toString();
        monthStr = monthStr === "0" ? "12" : monthStr;
        monthStr += i >= 48 ? "/" + (year + 1) : "";
        if (i < 48) {
            lines.push(<div aria-label={lineIsMonth ? monthStr : ""} key={"line-" + i} css={css`
                :before {
                    content: attr(aria-label);
                    font-size: 0.7rem;
                    position: absolute;
                    top: -18px;
                    background-color: #f8f8f8;
                    padding: ${lineIsMonth ? "1px 3px" : 0};
                    border-radius: 5px;
                    left: -5px;
                };    
    
                width: 2px;
                height: ${lineIsMonth ? 15 : 6}px;
                background-color: red;
                top: ${lineIsMonth ? -4 : 0}px;
                left: ${(monthPartWidth) * i}px;
                position: absolute;
            `}>

            </div>);
        }
    }
    return (
        <LabeledCard label='Calendar'>
            <div css={css`                
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                align-items: center;
            `}>
                <div>
                    <label>
                        <input type="checkbox"
                            defaultChecked={showAllMonths}
                            onChange={() => dispatch(designActions.setShowAllMonthsAction(!showAllMonths))}
                        />
                        Year round
                    </label>
                </div>
                <div css={css`
                display: flex;
                align-items: center;
                font-size: 0.8rem;
            `}>
                    <div onClick={setPrevYear} css={css`
                    padding: 5px;
                    cursor: pointer;
                    background-color: #727272;
                    border-radius: 5px;
                    `}>{"<"}
                    </div>
                    <div css={css`
                    padding: 5px;
                    `}>{year}
                    </div>
                    <div onClick={setNextYear} css={css`
                    padding: 5px;
                    cursor: pointer;
                    background-color: #727272;
                    border-radius: 5px;
                    `}>{">"}
                    </div>
                </div>

                <div css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            `}>
                    <div onClick={setPrevMonth} css={css`
                    padding: 5px;
                    cursor: pointer;
                    background-color: #727272;
                    border-radius: 5px;
                    `}>{"<"}
                    </div>
                    <div onMouseDown={mouseDown} css={css`
                width: 100%;
                padding: 10px 5px;
                border-radius: 5px;
                background-color: #7b7b7b;
                overflow: hidden;
                `}>
                        <div css={css`
                    width: ${timelineWidth}px;
                    height: 5px;    
                    position: relative;
                    left: ${timelineX}px;
                    top: 10px;
                    background-color: #535353;
                    cursor: grab;
                    transition: ${isMouseDown ? "" : "left 0.3s ease-in"};
                    `}>
                            <div css={css`
                            width: ${lastFrostDateBarWidth}px;
                            height: 5px;
                            background-color: #8989ff;
                            position: absolute;
                        `}></div>
                            {lines}
                        </div>
                        <div css={css`
                    left: 70px;
                    top: 12px;
                    width: 0px;
                    height: 0px;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid #ffffff;
                    position: relative;
                    `}>

                        </div>
                    </div>

                    <div onClick={setNextMonth} css={css`
                    padding: 5px;
                    cursor: pointer;
                    background-color: #727272;
                    border-radius: 5px;
                    `}>{">"}
                    </div>
                </div>



                <div css={css`
                    width: 100%;
                    display: flex;
                `}><Selectbox name="calendar-months-selectbox" options={monthsOptions} defaultValue={month} onChange={setMonth} />
                    {monthPartCount != 1 && <Selectbox name="calendar-months-selectbox" options={monthPartOptions} defaultValue={monthPart} onChange={setMonthPart} />}
                </div>
                <div>
                    {isMouseDown && <div css={css`
                    background-color: blue;
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: ${DEPTH.CALENDAR};
                    opacity: 0;
                `} onMouseMove={mouseMove} onMouseUp={mouseUp} />}
                </div>
            </div>

        </LabeledCard>
    )
}


export default Calendar;