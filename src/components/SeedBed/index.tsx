/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useState } from "react";
import { IPlant } from '../../helpers/plant-types';
import { Direction, ISeedBed } from '../../helpers/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updatePositionAction } from '../../store/reducers/SeedBedsSlice';
import { setIsMovingAppViewAction } from '../../store/reducers/ViewNavigationSlice';
import DetailIcon from './DetailIcon';
import DragPoint from './DragPoint';
import PlantDialog from './PlantDialog';
import ResizePoints from './ResizePoints';

export interface ISeedBedProps extends ISeedBed {
}

export const dragPointSize = 12;

const SeedBed: React.FC<ISeedBedProps> = (props) => {
    const dispatch = useAppDispatch();

    const resizable = true, draggable = true;
    const [clickStart, setClickStart] = useState({ diffX: 0, diffY: 0 })
    const [showDetailIcon, setShowDetailIcon] = useState(false);
    const [showPlantDialog, setShowPlantDialog] = useState(false);

    const zoomAmount = useAppSelector(selector => selector.navigation.zoom);

    const seedBedWidth = props.width * (zoomAmount / 100);
    const seedBedHeight = props.height * (zoomAmount / 100);

    const plantsInRow = 1;
    const rows = 1;
    const direction: Direction = Direction.HORIZONTAL;

    let plants;
    const 

    // HANDLERS
    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(updatePositionAction({ id: props.id, position: { x: e.clientX - clickStart.diffX, y: e.clientY - clickStart.diffY } }))
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        dispatch(setIsMovingAppViewAction(false));
        setClickStart({ diffX: e.clientX - props.x, diffY: e.clientY - props.y })
    }

    const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!showPlantDialog)
            setShowDetailIcon(true);
    }

    const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(false);
    }

    const detailClickedHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setShowDetailIcon(false);
        setShowPlantDialog(true);
    }
    

    return (
        <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} css={css`
                /*background: #686868;*/
                /*background: url("imgs/${props.plant.icon}");*/
                border: 1px solid green;
                width: ${seedBedWidth}px;
                height: ${seedBedHeight}px;
                position: absolute;
                left: ${props.x * (zoomAmount / 100)}px;
                top: ${props.y * (zoomAmount / 100)}px;
                z-index: 2000;
            `}>
            {draggable && <DragPoint id={props.id} dragHandler={dragHandler} dragStartHandler={dragStartHandler} />}
            {resizable && <ResizePoints id={props.id} /* dragHandler={dragHandler} dragStartHandler={dragStartHandler} */ />}
            {showDetailIcon && <DetailIcon seedBedWidth={seedBedWidth} detailClickedHandler={detailClickedHandler} />}
            {showPlantDialog && <PlantDialog closePlantDialogHandler={setShowPlantDialog.bind(this, false)} />}
        </div>
    )

}

const Plant: React.FC<any> = (props) =>{


    return (
        <div css={css`
        background: url("imgs/${props.plant.icon}");
        border: 1px solid blue;
        `}>

        </div>
    )
}

export default SeedBed;