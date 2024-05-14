/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setMonthAction, setQuarterAction, setYearAction } from '../../../store/reducers/CalendarSlice';
import { DEPTH } from '../../../helpers/constants';
import Selectbox, { IOption } from '../../GUI/Selectbox';




interface ICalendarProps {

}

const Calendar: React.FC<ICalendarProps> = (props) => {
    const dispatch = useAppDispatch();
    const year = useAppSelector(state => state.calendarReducer.actualYear)
    const month = useAppSelector(state => state.calendarReducer.actualMonth)
    const quarter = useAppSelector(state => state.calendarReducer.actualQuarter)

    const monthPartCount = useAppSelector(state => state.settingsReducer.calendar.monthPartsCount);

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
    const quarterOptions: IOption[] = []
    for(let i = 0; i < monthPartCount; i++){
        quarterOptions.push({name: (i + 1) + (monthPartCount === 2? ". half" : ". quarter"), value: i})
    }
    const lastFrostDateBarWidth = (lastFrostMonth) * monthPartCount * monthPartWidth - (monthPartWidth * monthPartCount * (lastFrostDay / new Date(new Date().getFullYear(), month + 1, 0).getDate()));
    console.log('(lastFrostDay / new Date(new Date().getFullYear(), month + 1, 0).getDate()): ', (lastFrostDay / new Date(new Date().getFullYear(), month + 1, 0).getDate()));
    console.log('monthPartWidth: ', monthPartWidth);
    
    const setMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.currentTarget.value);
        if (newMonth !== month) {
            dispatch(setMonthAction(newMonth));
            dispatch(setQuarterAction(0));
            setTimelineX(initialTimelineX - (monthPartWidth * newMonth * monthPartCount));
        }
    }

    const setQuarter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuarter = parseInt(e.currentTarget.value);
        if (newQuarter !== quarter) {
            setTimelineX(initialTimelineX - (monthPartWidth * month * monthPartCount) - (newQuarter * monthPartWidth));
            dispatch(setQuarterAction(newQuarter));
        }
    }
    const setPrevYear = () => {
        dispatch(setYearAction(year - 1));
        dispatch(setMonthAction(0));
        dispatch(setQuarterAction(0));
        setTimelineX(initialTimelineX);
    }

    const setNextYear = () => {
        dispatch(setYearAction(year + 1));
        dispatch(setMonthAction(0));
        dispatch(setQuarterAction(0));
        setTimelineX(initialTimelineX);
    }

    const setPrevMonth = () => {
        setTimelineX(initialTimelineX - monthPartWidth * ((month - 1) * monthPartCount + (quarter)));
        dispatch(setMonthAction(month - 1));
        dispatch(setQuarterAction(0));
    }

    const setNextMonth = () => {
        setTimelineX(initialTimelineX - monthPartWidth * ((month + 1) * monthPartCount + (quarter)));
        dispatch(setMonthAction(month + 1));
        dispatch(setQuarterAction(0));
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
                const newQuarter = monthsPartShiftedCount % monthPartCount;
                dispatch(setQuarterAction(newQuarter));
                dispatch(setMonthAction(newMonth));
            }
        }
    }

    const mouseUp = (e: React.MouseEvent) => {
        setIsMouseDown(false);
        //const monthsPartShiftedCount = Math.floor((initialTimelineX - newX - halfMonthPartWidth) / monthPartWidth) + 1;
        //setTimelineX(initialTimelineX - monthPartWidth * ((month) * monthPartCount + (quarter) + halfMonthPartWidth));
        setTimelineX(initialTimelineX - (monthPartWidth * month * monthPartCount) - (quarter * monthPartWidth));
        console.log('(quarter * halfMonthPartWidth): ', (quarter * halfMonthPartWidth));
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
        <div aria-label="Calendar" css={css` 
            :before {
                content: attr(aria-label);
                font-size: 0.8rem;
                position: absolute;
                top: 3px;
                background-color: #727272;
                padding: 3px;
                border-radius: 5px
            };           
            width: ${calendarWidth}px;
            background-color: blue;    
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            width: 200px;
            height: 130px;
            background: #969696;
            border-radius: 10px;
            margin: 15px;
            padding: 15px;
        `}>
            <div css={css`
                display: flex;
                align-items: center;
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
                padding: 20px 5px;
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
                `}>
                <div css={css`
                    width: 50%;
                `}><Selectbox name="calendar-months-selectbox" options={monthsOptions} defaultValue={month} onChange={setMonth} /></div>
                <div css={css`
                    width: 50%;
                `}><Selectbox name="calendar-months-selectbox" options={quarterOptions} defaultValue={quarter} onChange={setQuarter} /></div>
            </div>
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
            `} onMouseMove={mouseMove} onMouseUp={mouseUp}>

            </div>}
        </div>
    )
}


export default Calendar;