/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useRef, useState } from "react";
import { IPosition } from "../../helpers/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createNewSeedBedAction, placeSeedBedAction } from "../../store/reducers/SeedBedsSlice";
import { moveWorldByMouseAction, zoomAction } from "../../store/reducers/ViewNavigationSlice";
import Field from "../Field";
import Scale from "./Scale";
import SeedBed from "../SeedBed";
import MessageBar from "../MesageBar";
import { DEPTH } from "../../helpers/constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAppSelector } from "../../hooks/useAppSelector";
import useLocalCoordinates from "../../hooks/useLocalCoordinates";


interface IAppViewProps {

}

const AppView: React.FC<IAppViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const viewElement = useRef<HTMLDivElement>(null);

    const worldZoom = useAppSelector(state => state.navigation.zoom);
    const worldPosition = useAppSelector(state => state.navigation.position);
    const isMovingAppView = useAppSelector(state => state.navigation.isMovingAppView);
    const seedBeds = useAppSelector(state => state.seedBeds);
    const menuWidth = useAppSelector(state => state.gui.menuWidth);
    const toolbarHeight = useAppSelector(state => state.gui.toolbarHeight);
    const worldWidth = useAppSelector(state => state.navigation.worldWidth) * worldZoom;
    const worldHeight = useAppSelector(state => state.navigation.worldHeight) * worldZoom;

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
    const [mouseAppViewPosition, setMouseAppViewPosition] = useState<IPosition>({ x: 0, y: 0 })

    
    const { pos: worldPos, updateLocal, updateGlobal, setMouseStartDiffPosition } = useLocalCoordinates(state => state.navigation.position);

    const movingByWorld = (isMouseDown && isMovingAppView) || isMiddleMouseDown;
    const cursor = isMovingAppView ? (isMouseDown ? "grabbing" : "grab") : "default";
    const unplacedBed = seedBeds.find(seedBed => !seedBed.isPlaced);

    const zoom = (e: any) => dispatch(zoomAction({ zoomDirection: e.deltaY || 0, menuWidth }))
    

    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - worldPosition.x, diffY: e.clientY - worldPosition.y })
        setIsMouseDown(true);
        setIsMiddleMouseDown(e.button == 1);

        if (unplacedBed) {
            let position: IPosition = { x: unplacedBed.x, y: unplacedBed.y };
            position = { x: mouseAppViewPosition.x - unplacedBed.width / 2, y: mouseAppViewPosition.y - unplacedBed.height / 2 };

            dispatch(placeSeedBedAction({ id: unplacedBed.id, position }));

        }
    }

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            updateLocal(e)
        }

        if (unplacedBed) {
            setMouseAppViewPosition({ x: ((e.clientX - worldPosition.x) / worldZoom) -  menuWidth, y: ((e.clientY - worldPosition.y) / worldZoom) - toolbarHeight });
        }
    }

    const mouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            updateGlobal(e)
        }
        setIsMouseDown(false);
        setIsMiddleMouseDown(false);
    }

    return (
        <div css={css`
            overflow: hidden;
            width: 100%;
            height: 100%;
            z-index: ${DEPTH.APP_VIEW};
        `}>
            <div ref={viewElement} onDragOver={e => e.preventDefault()} onWheel={zoom} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} css={css`
                background-color: #777b77;
                border: 1px solid green;
                position: relative;
                width: ${worldWidth}px;
                height: ${worldHeight}px;
                left: ${worldPos.x}px;
                top: ${worldPos.y}px;
                cursor: ${cursor};
            `}>
                {seedBeds.map((seedBed, i) => {
                    let position: IPosition = { x: seedBed.x, y: seedBed.y };
                    if (!seedBed.isPlaced) {
                        position = { x: mouseAppViewPosition.x - seedBed.width / 2, y: mouseAppViewPosition.y - seedBed.height / 2 };
                    }
                    return <SeedBed key={"seed-bed-" + i} {...seedBed} {...position} />
                })}
                <Field x={10/*(browserWidth-menuWidth)/2 - 200 + menuWidth*/} y={10/*(browserHeight-toolbarHeight)/2 - 250 + toolbarHeight*/} width={100} height={100} />
                <Scale />
                <MessageBar />
            </div>
        </div>
    )
}

export default AppView;