/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useRef, useState } from "react";
import { zoomedFactory } from '../../helpers/functions';
import { IPlant } from '../../helpers/plant-types';
import { Direction, IPosition, ISeedBed } from '../../helpers/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { changeRowsDirectionAction, updateHeightAction, updatePositionAction, updateSelectedSeedBed, updateWidthAction } from '../../store/reducers/SeedBedsSlice';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import DetailIcon from './DetailIcon';
import DragPoint from './DragPoint';
import PlantDialog from './PlantDialog';
import ResizePoints from './ResizePoints';
import Plant, { ROWDIRECTIONS } from './Plant';
import { DEPTH } from '../../helpers/constants';
import RotateRowDirectionIcon from './RotateRowDirectionIcon';

export interface ISeedBedProps extends ISeedBed {
}

export const dragPointSize = 12;

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const resizable = true, draggable = true;
    const [showOnHoverIcon, setShowDetailIcon] = useState(false);
    const [showPlantDialog, setShowPlantDialog] = useState(false);
    const [localSeedBedPosDiff, setLocalSeedBedPosDiff] = useState<IPosition>({ x: 0, y: 0 })
    const [localSeedBedSize, setLocalSeedBedSize] = useState({ width: 0, height: 0 });


    const zoom = useAppSelector(selector => selector.navigationReducer.zoom);
    const zoomed = zoomedFactory(zoom);
    const worldPos = useAppSelector(selector => selector.navigationReducer.position);
    const mouseDownStartPosition = useAppSelector(selector => selector.navigationReducer.mouseDownStartPosition);
    
    const isSelected = useAppSelector((selector)=>selector.seedBedsReducer.selectedSeedBed==props.id);

    const seedBedWidth = zoomed((localSeedBedSize.width > 0) ? localSeedBedSize.width : props.width);
    const seedBedHeight = zoomed((localSeedBedSize.height > 0) ? localSeedBedSize.height : props.height);

    let seedBedX = zoomed((props.x + localSeedBedPosDiff.x));
    let seedBedY = zoomed((props.y + localSeedBedPosDiff.y));

    const direction: Direction = Direction.HORIZONTAL;


    let plants;

    let initialSet = useRef(false);
    useEffect(() => {
        if (!props.isPlaced) {

        }

    }, [])

    // HANDLERS
    const moveStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingAppViewAction(false));
    }

    const moveHandler = (e: React.DragEvent<HTMLDivElement>, diffX: number, diffY: number) => {
        setLocalSeedBedPosDiff({ x: diffX, y: diffY });
    }

    const moveEndHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setLocalSeedBedPosDiff({ x: 0, y: 0 });
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

    const moveSeedBedIfNotPlaced = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!props.isPlaced) {

        }

    }

    const stopMoveSeedBed = (e: React.MouseEvent<HTMLDivElement>) => {

    }


    const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!showPlantDialog)
            setShowDetailIcon(true);
    }

    const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(false);
    }

    const detailClickedHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(false);
        setShowPlantDialog(true);
    }

    const seedBedWidthForCalculation = props.rowsDirection == ROWDIRECTIONS.LEFT_TO_RIGHT ? seedBedWidth : seedBedHeight;
    let inRowCountDecimal = seedBedWidthForCalculation / (zoomed(props.plant.inRowSpacingMin));
    let inRowCount = Math.floor(inRowCountDecimal);
    console.log('inRowCount: ', inRowCount);
    let inRowCountDecimalPart = inRowCountDecimal - inRowCount;
    const inRowSeedShift = (zoomed(props.plant.inRowSpacingMin) * inRowCountDecimalPart) / 2;

    const seedBedHeightForCalculation = props.rowsDirection == ROWDIRECTIONS.LEFT_TO_RIGHT ? seedBedHeight : seedBedWidth;
    let rowsCountDecimal = seedBedHeightForCalculation / (zoomed(props.plant.betweenRowSpacingMin));
    let rowsCount = Math.floor(rowsCountDecimal);
    console.log('rowsCount: ', rowsCount);
    let rowCountDecimalPart = rowsCountDecimal - rowsCount;
    const rowSeedShift = (zoomed(props.plant.betweenRowSpacingMin) * rowCountDecimalPart) / 2;

    const plantCount = rowsCount * inRowCount;


    let seeds: Array<any> = Array();
    for (let i = 0; i < plantCount; i++) {
        seeds.push(<Plant {...props} key={"sees-bed-" + i} rowDirection={props.rowsDirection} />)
    }
    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} css={css`
                /*background: #686868;*/
                /*background: url("imgs/${props.plant.icon}");*/
                border: 1px solid ${isSelected? "#17ff00": "green"};
                width: ${seedBedWidth}px;
                height: ${seedBedHeight}px;
                position: absolute;
                left: ${seedBedX}px;
                top: ${seedBedY}px;
                z-index: ${props.isPlaced ? DEPTH.SEEDBED : DEPTH.UNPLACED_SEEDBED};
                box-sizing: content-box; 
            `}>
            {(showOnHoverIcon || false) && <RotateRowDirectionIcon seedBedWidth={seedBedWidth} IconClicked={() => { dispatch(changeRowsDirectionAction(props.id)) }} />}
            <div css={css`
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: flex-start;
                padding-left: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? rowSeedShift : inRowSeedShift)}px;
                padding-top: ${zoomed(ROWDIRECTIONS.LEFT_TO_RIGHT ? inRowSeedShift : rowSeedShift)}px;
                `}>
                {seeds}

                {/*showOnHoverIcon && <DetailIcon seedBedWidth={seedBedWidth} IconClicked={detailClickedHandler} />*/}
            </div>
            <div css={css`
                background-color: #dddddd;
                left: ${(seedBedWidth - 25) / 2}px;
                top: ${(seedBedHeight - 70) / 2}px;
                position: absolute;
            `}>
                ({plantCount})
            </div>
            {draggable && <DragPoint seedBedX={seedBedX} seedBedY={seedBedY} seedBedWidth={seedBedWidth} seedBedHeight={seedBedHeight} id={props.id} dragHandler={moveHandler} dragStartHandler={moveStartHandler} dragEndHandler={moveEndHandler} />}
            {resizable && <ResizePoints id={props.id} seedBedWidth={seedBedWidth} seedBedHeight={seedBedHeight} dragHandler={resizeHandler} dragStartHandler={resizeStartHandler} dragEndHandler={resizeEndHandler} />}
            {showPlantDialog && <PlantDialog closePlantDialogHandler={setShowPlantDialog.bind(this, false)} />}
        </div>
    )

}

export default SeedBed;