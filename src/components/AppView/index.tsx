/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { DragEventHandler, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { zoomAction } from "../../store/reducers/ViewNavigationSlice";
import SeedBed from "../SeedBed";


interface IAppViewProps {

}

const AppView: React.FC<IAppViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const viewElement = useRef<HTMLDivElement>(null);

    const zoomAmount = useAppSelector(state => state.navigation.zoom);
    const isMovingAppView = useAppSelector(state => state.navigation.isMovingAppView);

    const [mouseStartDiffPosition, setMouseStartDiffPosition] = useState({ diffX: 0, diffY: 0 })
    const [panelPosition, setPanelPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const [isMouseDown, setIsMouseDown] = useState(false);

    const zoom = (e: any) => {
        let delta = e.deltaY || 0;
        dispatch(zoomAction(delta))
    }

    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - panelPosition.x, diffY: e.clientY - panelPosition.y })
        setIsMouseDown(true);
    }

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMouseDown && isMovingAppView) {
            setPanelPosition((prevPos) => {
                let newX = e.clientX - mouseStartDiffPosition.diffX;
                newX = newX < 0 ? newX : 0;
                newX = newX + (viewElement.current?.clientWidth || 0) > window.innerWidth ? newX : prevPos.x;

                let newY = e.clientY - mouseStartDiffPosition.diffY;
                newY = newY < 0 ? newY : 0;
                newY = newY + (viewElement.current?.clientHeight || 0) > window.innerHeight ? newY : prevPos.y;

                return { x: newX, y: newY }
            })
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
            <div ref={viewElement} onWheel={zoom} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} css={css`
                background-color: #777b77;
                border: 1px solid green;
                position: relative;
                height: ${zoomAmount}%;
                width: ${zoomAmount}%;
                left: ${panelPosition.x}px;
                top: ${panelPosition.y}px;
                cursor: ${cursor}
            `}>
                <SeedBed id={0} width={100} height={100} />
                <SeedBed id={1} width={80} height={200} />
            </div>
        </div>
    )
}

export default AppView;