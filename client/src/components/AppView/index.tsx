/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useRef, useState } from "react";
import { IPosition } from "../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createNewSeedBedAction } from "../../store/reducers/SeedBedsSlice";
import { moveWorldByMouseAction, setIsPuttingSeedBedOfTypeAction, zoomAction } from "../../store/reducers/ViewNavigationSlice";
import Field from "../Field";
import Scale from "../Scale";
import SeedBed from "../SeedBed";


interface IAppViewProps {

}

const AppView: React.FC<IAppViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const viewElement = useRef<HTMLDivElement>(null);

    const worldZoom = useAppSelector(state => state.navigation.zoom);
    const worldPosition = useAppSelector(state => state.navigation.position);
    const isMovingAppView = useAppSelector(state => state.navigation.isMovingAppView);
    const isPuttingSeedBedOfType = useAppSelector(selector => selector.navigation.isPuttingSeedBedOfType)
    
    const seedBeds = useAppSelector(state => state.seedBeds);

    const [mouseStartDiffPosition, setMouseStartDiffPosition] = useState({ diffX: 0, diffY: 0 })
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
    const [localWorldPosDiff, setLocalWorldPosDiff] = useState<IPosition>({x: 0, y: 0})

    const movingByWorld = (isMouseDown && isMovingAppView) || isMiddleMouseDown;

    const zoom = (e: any) => {
        let delta = e.deltaY || 0;
        dispatch(zoomAction(delta))
    }

    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - worldPosition.x, diffY: e.clientY - worldPosition.y })
        setIsMouseDown(true);
        setIsMiddleMouseDown(e.button == 1);

        if(isPuttingSeedBedOfType){
            dispatch(setIsPuttingSeedBedOfTypeAction(undefined));
            var rect = (e.target as HTMLDivElement).getBoundingClientRect();

            let x = (e.clientX - rect.left) / worldZoom;
            let y = (e.clientY - rect.top) / worldZoom;
            dispatch(createNewSeedBedAction({position: {x, y}, plant: isPuttingSeedBedOfType}))
        }
    }

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            let newLocalPosDiffX = (e.clientX - worldPosition.x) - mouseStartDiffPosition.diffX;
            let newLocalPosDiffY = (e.clientY - worldPosition.y) - mouseStartDiffPosition.diffY;
            setLocalWorldPosDiff({x: newLocalPosDiffX, y:newLocalPosDiffY})
        }
    }

    const mouseUp = (e: React.MouseEvent<HTMLDivElement>) => {                
        if(movingByWorld){
            dispatch(moveWorldByMouseAction({x: e.clientX - mouseStartDiffPosition.diffX,y: e.clientY - mouseStartDiffPosition.diffY}));
            setLocalWorldPosDiff({x: 0, y: 0})
        }
        setIsMouseDown(false);
        setIsMiddleMouseDown(false);
    }

    const cursor = isMovingAppView ? (isMouseDown ? "grabbing" : "grab") : "default";

    return (
        <div css={css`
            background-color: #777b17;
            overflow: hidden;
            height: 100%;
            width: 100%;
        `}>
            <div ref={viewElement} onDragOver={e => e.preventDefault()} onWheel={zoom} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} css={css`
                background-color: #777b77;
                border: 1px solid green;
                position: relative;
                height: ${2000}%;
                width: ${2000}%;
                left: ${worldPosition.x + localWorldPosDiff.x}px;
                top: ${worldPosition.y + localWorldPosDiff.y}px;
                cursor: ${cursor};
            `}>
                {seedBeds.map((seedBed, i)=>{
                    return <SeedBed key={"seed-bed-" + i} {...seedBed} />
                })}
                <Field x={1400} y={1000} width={400} height={500} />
                <Scale />
            </div>
        </div>
    )
}

export default AppView;