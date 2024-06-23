/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from "react";
import { DEPTH } from '../../../../helpers/constants';
import { cmToPX, zoomedFactory } from '../../../../helpers/functions';
import { IDimensions, IPosition } from '../../../../helpers/types';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { designActions } from '../../../../store/reducers/DesignSlice';
import { setIsMovingDesignPanelAction } from '../../../../store/reducers/ViewNavigationSlice';
import RotateRowDirectionIcon from '../../../../components/UI/RotateRowDirectionIcon';
import ResizePoints from '../../../../components/UI/ResizePoints';
import DragPoint from '../../../../components/UI/DragPoint';
import Plant from '../Plant';
import { IPlantSection, ROWDIRECTIONS } from '../../types';
import { isPlantSectionSelectedSelector as isPlantSectionSelector, calendarSelector } from '../../../../store/reducers/DesignSlice/selectors';
import { zoomSelector } from '../../../../store/reducers/ViewNavigationSlice/selectors';
import { inRowPlantShiftSelector, plantCountSelector, plantSectionZIndexSelector, rowPlantShiftSelector } from '../../selectors';

export interface IPlantSectionProps extends IPlantSection {
}

const PlantSection: React.FC<IPlantSectionProps> = (props) => {
    const dispatch = useAppDispatch();

    const [localSize, setLocalSize] = useState<IDimensions>({ width: 0, height: 0 });
    
    const isSelected = useAppSelector(state => isPlantSectionSelector(state, props.id));
    const zoom = useAppSelector(zoomSelector);
    const calendar = useAppSelector(calendarSelector);
    const plantSectionZIndex = useAppSelector(state => plantSectionZIndexSelector(state, props.id))
    const plantsCount = useAppSelector(state => plantCountSelector(state, props.id, localSize));
    const inRowPlantShift = useAppSelector(state => inRowPlantShiftSelector(state, props.id, localSize));
    const rowPlantShift = useAppSelector(state => rowPlantShiftSelector(state, props.id, localSize));
    const [showOnHoverIcon, setShowDetailIcon] = useState(false);
    const [localPosDiff, setLocalPosDiff] = useState<IPosition>({ x: 0, y: 0 })

    const zoomed = zoomedFactory(zoom);
    const resizable = true, draggable = true;

    const width = cmToPX(zoomed((localSize.width > 0) ? localSize.width : props.width),zoom);
    const height = cmToPX(zoomed((localSize.height > 0) ? localSize.height : props.height),zoom);

    let x = zoomed((props.x + localPosDiff.x));
    let y = zoomed((props.y + localPosDiff.y));

    // HANDLERS
    const moveStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingDesignPanelAction(false));
    }

    const moveHandler = (e: React.DragEvent<HTMLDivElement>, diffX: number, diffY: number) => {
        setLocalPosDiff({ x: diffX, y: diffY });
    }

    const moveEndHandler = (e: React.DragEvent<HTMLDivElement>, position: IPosition) => {
        setLocalPosDiff({ x: 0, y: 0 });
        dispatch(designActions.updatePositionAction({ id: props.id, position }))
    }

    const resizeStartHandler = (e: React.DragEvent<HTMLDivElement>, diffX: any, diffY: any) => {
        dispatch(setIsMovingDesignPanelAction(false));
    }

    const resizeHandler = (e: React.DragEvent<HTMLDivElement>, newWidth: number, newHeight: number) => {
        setLocalSize({ width: newWidth, height: newHeight });
    }

    const resizeEndHandler = (e: React.MouseEvent<HTMLDivElement>, newWidth: number, newHeight: number) => {
        setLocalSize({ width: 0, height: 0 });
        dispatch(designActions.updateWidthAction({ id: props.id, newWidth }))
        dispatch(designActions.updateHeightAction({ id: props.id, newHeight }))
    }

    const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(true);
    }

    const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(false);
    }

    const direction = props.rowsDirection;
    const minimalWidth = (direction == ROWDIRECTIONS.LEFT_TO_RIGHT) ? props.plant.PlantSpacingMin : props.plant.RowSpacingMin;
    const minimalHeight = (direction == ROWDIRECTIONS.LEFT_TO_RIGHT) ? props.plant.RowSpacingMin : props.plant.PlantSpacingMin;

    let plants: Array<any> = [];
    if (plantsCount < 5000) {
        for (let i = 0; i < plantsCount; i++) {
            plants.push(<Plant {...props} key={"plant-section-" + i} rowDirection={props.rowsDirection} />)
        }
    } else {
        for (let i = 0; i < 4; i++) {
            plants[i] = [];
            for (let j = 0; j < 3; j++) {
                plants[i].push(<Plant {...props} key={"plant-section-" + i * 10 + j} rowDirection={props.rowsDirection} />)
            }
        }
    }

    const showAllPlants = plantsCount < 500;

    if(!props.inGround.yearRoundPlanting){
        const showInActualMonth = props.inGround.from.month <= calendar.actualMonth && props.inGround.to.month >= calendar.actualMonth;
        if(!showInActualMonth){
            return <React.Fragment>
    
            </React.Fragment>
        }

    }
    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} onClick={(e) => { dispatch(designActions.updateSelectedPlantSectionAction(props.id))}} css={css`
                border: 1px solid ${isSelected ? "#17ff00" : "green"};
                width: ${width}px;
                height: ${height}px;
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                z-index: ${plantSectionZIndex};
                box-sizing: content-box; 
            `} data-plant-section-id={props.id} data-z-index={plantSectionZIndex}>
            {showAllPlants && <div css={css`
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                padding-left: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowPlantShift : inRowPlantShift)}px;
                padding-top: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowPlantShift : rowPlantShift)}px;
                `}>
                {plants}
            </div>}

            <div css={css`
                background-color: #dddddd;
                left: ${(width - 25) / 2}px;
                top: ${(height - 70) / 2}px;
                position: absolute;
                user-select: none;
            `}>
                ({plantsCount})
            </div>
            {draggable && <DragPoint objectX={x} objectY={y} objectWidth={width} objectHeight={height} id={props.id} dragHandler={moveHandler} dragStartHandler={moveStartHandler} dragEndHandler={moveEndHandler} />}
            {resizable && <ResizePoints objectWidth={width} objectHeight={height} dragHandler={resizeHandler} dragStartHandler={resizeStartHandler} dragEndHandler={resizeEndHandler} minimalWidth={minimalWidth} minimalHeight={minimalHeight} />}
            {(showOnHoverIcon || false) && <RotateRowDirectionIcon ObjectWidth={width} IconClicked={() => { dispatch(designActions.changeRowsDirectionAction(props.id)) }} />}
        </div>
    )

}

export default PlantSection;