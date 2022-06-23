/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useRef, useState } from "react";
import { cmToPX } from '../../helpers/functions';
import { IPlant } from '../../helpers/plant-types';
import { Direction, IPosition, ISeedBed } from '../../helpers/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateHeightAction, updatePositionAction, updateWidthAction } from '../../store/reducers/SeedBedsSlice';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import DetailIcon from './DetailIcon';
import DragPoint from './DragPoint';
import PlantDialog from './PlantDialog';
import ResizePoints from './ResizePoints';
import SeedCircle from './SeedCircle';

export interface ISeedBedProps extends ISeedBed {
}

export const dragPointSize = 12;

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const resizable = true, draggable = true;
    const [showDetailIcon, setShowDetailIcon] = useState(false);
    const [showPlantDialog, setShowPlantDialog] = useState(false);
    const [localSeedBedPosDiff, setLocalSeedBedPosDiff] = useState<IPosition>({ x: 0, y: 0 })
    const [localSeedBedSize, setLocalSeedBedSize] = useState({ width: 0, height: 0 });

    const zoom = useAppSelector(selector => selector.navigation.zoom);
    const worldPos = useAppSelector(selector => selector.navigation.position);

    const seedBedWidth = (localSeedBedSize.width > 0) ? localSeedBedSize.width * (zoom) : props.width * (zoom);
    const seedBedHeight = (localSeedBedSize.height > 0) ? localSeedBedSize.height * (zoom) : props.height * (zoom);
    const seedBedX = (props.x + localSeedBedPosDiff.x) * (zoom);
    const seedBedY = (props.y + localSeedBedPosDiff.y) * (zoom);

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

    let inRowCount = Math.floor(seedBedWidth / (cmToPX(props.plant.inRowSpacing, zoom) + cmToPX(1, zoom)));
    let RowsCount = Math.floor(seedBedHeight / (cmToPX(props.plant.betweenRowSpacing, zoom) + cmToPX(1, zoom)));
    const plantCount = RowsCount * inRowCount;

    let seeds: Array<any> = Array();
    for (let i = 0; i < (RowsCount * inRowCount) && i < 10; i++) {
        seeds.push(<SeedCircle {...props} key={"sees-bed-" + i} />)
    }
    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} css={css`
                /*background: #686868;*/
                /*background: url("imgs/${props.plant.icon}");*/
                border: 1px solid green;
                width: ${seedBedWidth}px;
                height: ${seedBedHeight}px;
                position: absolute;
                left: ${seedBedX}px;
                top: ${seedBedY}px;
                z-index: 2000;
                flex-wrap: wrap;
                display: flex;
                align-content: flex-start;
            `}>

            {seeds}
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
            {showDetailIcon && <DetailIcon seedBedWidth={seedBedWidth} detailClickedHandler={detailClickedHandler} />}
            {showPlantDialog && <PlantDialog closePlantDialogHandler={setShowPlantDialog.bind(this, false)} />}
        </div>
    )

}

const Plant: React.FC<any> = (props) => {
    return (
        <div css={css`
        background: url("imgs/${props.plant.icon}");
        border: 1px solid blue;
        `}>

        </div>
    )
}

export default SeedBed;