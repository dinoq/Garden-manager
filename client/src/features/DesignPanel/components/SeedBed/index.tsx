/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from "react";
import { DEPTH } from '../../../../helpers/constants';
import { zoomedFactory } from '../../../../helpers/functions';
import { IPosition, ISeedBed } from '../../../../helpers/types';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { designActions } from '../../../../store/reducers/DesignSlice';
import { setIsMovingDesignPanelAction } from '../../../../store/reducers/ViewNavigationSlice';
import RotateRowDirectionIcon from '../../../../components/UI/RotateRowDirectionIcon';
import ResizePoints from '../../../../components/UI/ResizePoints';
import DragPoint from '../../../../components/UI/DragPoint';
import Plant from '../Plant';
import { ROWDIRECTIONS } from '../../types';
import { isSeedBedSelectedSelector, calendarSelector } from '../../../../store/reducers/DesignSlice/selectors';
import { zoomSelector } from '../../../../store/reducers/ViewNavigationSlice/selectors';
import { plantSectionZIndexSelector } from '../../selectors';

export interface ISeedBedProps extends ISeedBed {
}

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const isSelected = useAppSelector(state => isSeedBedSelectedSelector(state, props.id));
    const zoom = useAppSelector(zoomSelector);
    const calendar = useAppSelector(calendarSelector);
    const plantSectionZIndex = useAppSelector(state => plantSectionZIndexSelector(state, props.id))
    const [showOnHoverIcon, setShowDetailIcon] = useState(false);
    const [localSeedBedPosDiff, setLocalSeedBedPosDiff] = useState<IPosition>({ x: 0, y: 0 })
    const [localSeedBedSize, setLocalSeedBedSize] = useState({ width: 0, height: 0 });


    const zoomed = zoomedFactory(zoom);
    const resizable = true, draggable = true;

    const seedBedWidth = zoomed((localSeedBedSize.width > 0) ? localSeedBedSize.width : props.width);
    const seedBedHeight = zoomed((localSeedBedSize.height > 0) ? localSeedBedSize.height : props.height);

    let seedBedX = zoomed((props.x + localSeedBedPosDiff.x));
    let seedBedY = zoomed((props.y + localSeedBedPosDiff.y));

    // HANDLERS
    const moveStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingDesignPanelAction(false));
    }

    const moveHandler = (e: React.DragEvent<HTMLDivElement>, diffX: number, diffY: number) => {
        setLocalSeedBedPosDiff({ x: diffX, y: diffY });
    }

    const moveEndHandler = (e: React.DragEvent<HTMLDivElement>, position: IPosition) => {
        setLocalSeedBedPosDiff({ x: 0, y: 0 });
        dispatch(designActions.updatePositionAction({ id: props.id, position }))
    }

    const resizeStartHandler = (e: React.DragEvent<HTMLDivElement>, diffX: any, diffY: any) => {
        dispatch(setIsMovingDesignPanelAction(false));
    }

    const resizeHandler = (e: React.DragEvent<HTMLDivElement>, newWidth: number, newHeight: number) => {
        setLocalSeedBedSize({ width: newWidth, height: newHeight });
    }

    const resizeEndHandler = (e: React.MouseEvent<HTMLDivElement>, newWidth: number, newHeight: number) => {
        setLocalSeedBedSize({ width: 0, height: 0 });
        dispatch(designActions.updateWidthAction({ id: props.id, newWidth }))
        dispatch(designActions.updateHeightAction({ id: props.id, newHeight }))
    }

    const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(true);
    }

    const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(false);
    }

    const plantSpacingMin = props.plantSpacingMin ? props.plantSpacingMin : props.plant.PlantSpacingMin;
    const seedBedWidthForCalculation = props.rowsDirection === ROWDIRECTIONS.LEFT_TO_RIGHT ? seedBedWidth : seedBedHeight;
    let inRowCountDecimal = seedBedWidthForCalculation / (zoomed(plantSpacingMin));
    let inRowCount = Math.floor(inRowCountDecimal);
    let inRowCountDecimalPart = inRowCountDecimal - inRowCount;
    const inRowSeedShift = (zoomed(plantSpacingMin) * inRowCountDecimalPart) / 2;

    const RowSpacingMin = props.rowSpacingMin ? props.rowSpacingMin : props.plant.RowSpacingMin;
    const seedBedHeightForCalculation = props.rowsDirection === ROWDIRECTIONS.LEFT_TO_RIGHT ? seedBedHeight : seedBedWidth;
    let rowsCountDecimal = seedBedHeightForCalculation / (zoomed(RowSpacingMin));
    let rowsCount = Math.floor(rowsCountDecimal);
    let rowCountDecimalPart = rowsCountDecimal - rowsCount;
    const rowSeedShift = (zoomed(RowSpacingMin) * rowCountDecimalPart) / 2;

    const plantCount = rowsCount * inRowCount;

    const seedBedDirection = props.rowsDirection;
    const minimalWidth = (seedBedDirection == ROWDIRECTIONS.LEFT_TO_RIGHT) ? props.plant.PlantSpacingMin : props.plant.RowSpacingMin;
    const minimalHeight = (seedBedDirection == ROWDIRECTIONS.LEFT_TO_RIGHT) ? props.plant.RowSpacingMin : props.plant.PlantSpacingMin;

    let seeds: Array<any> = [];
    if (plantCount < 50) {
        for (let i = 0; i < plantCount; i++) {
            seeds.push(<Plant {...props} key={"sees-bed-" + i} rowDirection={props.rowsDirection} />)
        }
    } else {
        for (let i = 0; i < 4; i++) {
            seeds[i] = [];
            for (let j = 0; j < 3; j++) {
                seeds[i].push(<Plant {...props} key={"sees-bed-" + i * 10 + j} rowDirection={props.rowsDirection} />)
            }
        }
    }

    const showAllSeeds = plantCount < 50;

    if(!props.inGround.yearRoundPlanting){
        const showInActualMonth = props.inGround.from.month <= calendar.actualMonth && props.inGround.to.month >= calendar.actualMonth;
        if(!showInActualMonth){
            return <React.Fragment>
    
            </React.Fragment>
        }

    }
    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} onClick={(e) => { dispatch(designActions.updateSelectedSeedBedAction(props.id))}} css={css`
                border: 1px solid ${isSelected ? "#17ff00" : "green"};
                width: ${seedBedWidth}px;
                height: ${seedBedHeight}px;
                position: absolute;
                left: ${seedBedX}px;
                top: ${seedBedY}px;
                z-index: ${plantSectionZIndex};
                box-sizing: content-box; 
            `} data-plant-section-id={props.id} data-z-index={plantSectionZIndex}>
            {showAllSeeds && <div css={css`
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                padding-left: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowSeedShift : inRowSeedShift)}px;
                padding-top: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowSeedShift : rowSeedShift)}px;
                `}>
                {seeds}
            </div>}
            {!showAllSeeds && <div css={css`                
                padding-left: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowSeedShift : inRowSeedShift)}px;
                //padding-top: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowSeedShift : rowSeedShift)}px;
            `}>
                <div css={css`
                    position: absolute;
                    top: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowSeedShift : rowSeedShift)}px;
                    left: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowSeedShift : inRowSeedShift)}px;
                `}>{seeds[0]}</div>
                <div css={css`
                    position: absolute;
                    bottom: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowSeedShift : rowSeedShift)}px;
                    left: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowSeedShift : inRowSeedShift)}px;
                `}>{seeds[1]}</div>
                <div css={css`
                    position: absolute;
                    top: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowSeedShift : rowSeedShift)}px;
                    right: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowSeedShift : inRowSeedShift)}px;
                `}>{seeds[2]}</div>
            </div>}

            <div css={css`
                background-color: #dddddd;
                left: ${(seedBedWidth - 25) / 2}px;
                top: ${(seedBedHeight - 70) / 2}px;
                position: absolute;
            `}>
                ({plantCount})
            </div>
            {draggable && <DragPoint objectX={seedBedX} objectY={seedBedY} objectWidth={seedBedWidth} objectHeight={seedBedHeight} id={props.id} dragHandler={moveHandler} dragStartHandler={moveStartHandler} dragEndHandler={moveEndHandler} />}
            {resizable && <ResizePoints objectWidth={seedBedWidth} objectHeight={seedBedHeight} dragHandler={resizeHandler} dragStartHandler={resizeStartHandler} dragEndHandler={resizeEndHandler} minimalWidth={minimalWidth} minimalHeight={minimalHeight} />}
            {(showOnHoverIcon || false) && <RotateRowDirectionIcon ObjectWidth={seedBedWidth} IconClicked={() => { dispatch(designActions.changeRowsDirectionAction(props.id)) }} />}
        </div>
    )

}

export default SeedBed;