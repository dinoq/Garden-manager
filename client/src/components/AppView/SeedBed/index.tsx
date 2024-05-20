/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from "react";
import { DEPTH } from '../../../helpers/constants';
import { zoomedFactory } from '../../../helpers/functions';
import { IPosition, ISeedBed } from '../../../helpers/types';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { changeRowsDirectionAction, updateHeightAction, updatePositionAction, updateSelectedSeedBedAction, updateWidthAction } from '../../../store/reducers/SeedBedsSlice';
import { setIsMovingAppViewAction } from '../../../store/reducers/ViewNavigationSlice';
import Plant, { ROWDIRECTIONS } from './Plant';
import DragPoint from '../../GUI/DragPoint';
import ResizePoints from '../../GUI/ResizePoints';
import RotateRowDirectionIcon from '../../GUI/RotateRowDirectionIcon';

export interface ISeedBedProps extends ISeedBed {
}

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const resizable = true, draggable = true;
    const [showOnHoverIcon, setShowDetailIcon] = useState(false);
    const [localSeedBedPosDiff, setLocalSeedBedPosDiff] = useState<IPosition>({ x: 0, y: 0 })
    const [localSeedBedSize, setLocalSeedBedSize] = useState({ width: 0, height: 0 });


    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);

    const isSelected = useAppSelector((selector) => selector.seedBedsReducer.selectedSeedBed === props.id);

    const seedBedWidth = zoomed((localSeedBedSize.width > 0) ? localSeedBedSize.width : props.width);
    const seedBedHeight = zoomed((localSeedBedSize.height > 0) ? localSeedBedSize.height : props.height);

    let seedBedX = zoomed((props.x + localSeedBedPosDiff.x));
    let seedBedY = zoomed((props.y + localSeedBedPosDiff.y));

    // HANDLERS
    const moveStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingAppViewAction(false));
    }

    const moveHandler = (e: React.DragEvent<HTMLDivElement>, diffX: number, diffY: number) => {
        setLocalSeedBedPosDiff({ x: diffX, y: diffY });
    }

    const moveEndHandler = (e: React.DragEvent<HTMLDivElement>, position: IPosition) => {
        setLocalSeedBedPosDiff({ x: 0, y: 0 });
        dispatch(updatePositionAction({ id: props.id, position }))
    }

    const resizeStartHandler = (e: React.DragEvent<HTMLDivElement>, diffX: any, diffY: any) => {
        dispatch(setIsMovingAppViewAction(false));
    }

    const resizeHandler = (e: React.DragEvent<HTMLDivElement>, newWidth: number, newHeight: number) => {
        setLocalSeedBedSize({ width: newWidth, height: newHeight });
    }

    const resizeEndHandler = (e: React.MouseEvent<HTMLDivElement>, newWidth: number, newHeight: number) => {
        setLocalSeedBedSize({ width: 0, height: 0 });
        dispatch(updateWidthAction({ id: props.id, newWidth }))
        dispatch(updateHeightAction({ id: props.id, newHeight }))
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
    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} onClick={() => { dispatch(updateSelectedSeedBedAction(props.id)) }} css={css`
                border: 1px solid ${isSelected ? "#17ff00" : "green"};
                width: ${seedBedWidth}px;
                height: ${seedBedHeight}px;
                position: absolute;
                left: ${seedBedX}px;
                top: ${seedBedY}px;
                z-index: ${props.isPlaced ? DEPTH.SEEDBED : DEPTH.UNPLACED_SEEDBED};
                box-sizing: content-box; 
            `}>
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
            {(showOnHoverIcon || false) && <RotateRowDirectionIcon ObjectWidth={seedBedWidth} IconClicked={() => { dispatch(changeRowsDirectionAction(props.id)) }} />}
        </div>
    )

}

export default SeedBed;