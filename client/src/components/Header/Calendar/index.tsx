/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setMonth, setQuarter, setYear } from '../../../store/reducers/CalendarSlice';
import { DEPTH } from '../../../helpers/constants';




interface ICalendarProps {

}

const Calendar: React.FC<ICalendarProps> = (props) => {
    const dispatch = useAppDispatch();
    const year = useAppSelector(state => state.calendarReducer.actualYear)
    const month = useAppSelector(state => state.calendarReducer.actualMonth)
    const quarter = useAppSelector(state => state.calendarReducer.actualQuarter)

    const calendarWidth = 150;
    const initialTimelineX = (calendarWidth / 2) + 5;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [timelineX, setTimelineX] = useState(initialTimelineX);
    const [mouseDownX, setMouseDownX] = useState(0)

    const timelineWidth = 1000;
    const linesCount = 13 * 4;

    const setPrevYear = () => {
        dispatch(setYear(year - 1));
        dispatch(setQuarter(1));
        dispatch(setMonth(1));
        setTimelineX(initialTimelineX);
    }
    const setNextYear = () => {
        dispatch(setYear(year + 1));
        dispatch(setQuarter(1));
        dispatch(setMonth(1));
        setTimelineX(initialTimelineX);
    }

    const mouseDown = (e: React.MouseEvent) => {
        setIsMouseDown(true);
        setMouseDownX(e.clientX - timelineX);
    }

    const mouseMove = (e: React.MouseEvent) => {
        if (isMouseDown) {
            const newX = e.clientX - mouseDownX;
            if (newX < initialTimelineX && newX > (-timelineWidth + calendarWidth)+10) {
                setTimelineX(newX);
                let newMonth = Math.floor((((-newX - 3) / (timelineWidth / linesCount)) + 4) / 4) + 1; // -3= tolerance kvůli nepřesnosti gui
                newMonth = newMonth == 0 ? 1 : newMonth;
                let newQuarter = (Math.floor((-newX - 3) / (timelineWidth / linesCount)) + 4) % 4 + 1;
                newQuarter = newQuarter == 0 ? 1 : newQuarter;
                dispatch(setQuarter(newQuarter));
                dispatch(setMonth(newMonth));
            }
        }
    }

    const mouseUp = (e: React.MouseEvent) => {
        setIsMouseDown(false);
        const partWidth = timelineWidth / linesCount;
        setTimelineX(initialTimelineX - partWidth * ((month - 1) * 4 + (quarter - 1) + 0.5));
    }

    let lines: Array<any> = Array();
    for (let i = 0; i < linesCount; i++) {
        const lineIsMonth = i % 4 == 0;
        let monthStr = (((Math.floor(i / 4)) % 12) + 1).toString();
        monthStr = monthStr == "0" ? "12" : monthStr;
        monthStr += i >= 48? "/"+(year+1) : "";
        if(i < 48){
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
                left: ${(timelineWidth / linesCount) * i}px;
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
                    background-color: red;
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
                    background-color: red;
                    cursor: pointer;
                    background-color: #727272;
                    border-radius: 5px;
                    `}>{">"}
                </div>
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

            <div>{month} ({quarter}. quarter)</div>
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