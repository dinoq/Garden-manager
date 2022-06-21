/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useRef, useState } from "react";
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

    const zoom = (e: any) => {
        let delta = e.deltaY || 0;
        dispatch(zoomAction(delta))
    }

    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - worldPosition.x, diffY: e.clientY - worldPosition.y })
        setIsMouseDown(true);

        if(isPuttingSeedBedOfType){
            dispatch(setIsPuttingSeedBedOfTypeAction(undefined));
            var rect = (e.target as HTMLDivElement).getBoundingClientRect();

            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            dispatch(createNewSeedBedAction({position: {x, y}, plant: isPuttingSeedBedOfType}))
            console.log('{x, y}: ', {x, y});
        }
    }

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown && isMovingAppView) {
            let newX = e.clientX - mouseStartDiffPosition.diffX;
            newX = newX < 0 ? newX : 0;
            newX = newX + (viewElement.current?.clientWidth || 0) > window.innerWidth ? newX : worldPosition.x;

            let newY = e.clientY - mouseStartDiffPosition.diffY;
            newY = newY < 0 ? newY : 0;
            newY = newY + (viewElement.current?.clientHeight || 0) > window.innerHeight ? newY : worldPosition.y;
            dispatch(moveWorldByMouseAction({x: newX,y: newY}));
        }
    }

    const mouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseDown(false);
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
                height: ${worldZoom*3}%;
                width: ${worldZoom*3}%;
                left: ${worldPosition.x}px;
                top: ${worldPosition.y}px;
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