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
import MessageBar from "./MesageBar";
import { DEPTH } from "../../helpers/constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAppSelector } from "../../hooks/useAppSelector";


interface IAppViewProps {

}

const AppView: React.FC<IAppViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const viewElement = useRef<HTMLDivElement>(null);

    const worldZoom = useAppSelector(state => state.navigation.zoom);
    const worldPosition = useAppSelector(state => state.navigation.position);
    const isMovingAppView = useAppSelector(state => state.navigation.isMovingAppView);

    const seedBeds = useAppSelector(state => state.seedBeds);

    const mouseDownPosition = useAppSelector(selector => selector.navigation.mouseDownStartPosition);

    const menuWidth = useAppSelector(state => state.gui.menuWidth);
    const toolbarHeight = useAppSelector(state => state.gui.toolbarHeight);

    const [mouseStartDiffPosition, setMouseStartDiffPosition] = useState({ diffX: 0, diffY: 0 })
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
    const [localWorldPosDiff, setLocalWorldPosDiff] = useState<IPosition>({ x: 0, y: 0 })
    const [mousePosition, setMousePosition] = useState<IPosition>({ x: 0, y: 0 })

    const movingByWorld = (isMouseDown && isMovingAppView) || isMiddleMouseDown;

    const worldX = worldPosition.x + localWorldPosDiff.x;
    const worldY = worldPosition.y + localWorldPosDiff.y;
    const worldWidth = useAppSelector(state => state.navigation.worldWidth) * worldZoom;
    const worldHeight = useAppSelector(state => state.navigation.worldHeight) * worldZoom;
    const unplacedBed = seedBeds.find(seedBed => !seedBed.isPlaced);

    const zoom = (e: any) => {
        let delta = e.deltaY || 0;
        dispatch(zoomAction({zoomDirection : delta, menuWidth}))
    }

    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - worldPosition.x, diffY: e.clientY - worldPosition.y })
        setIsMouseDown(true);
        setIsMiddleMouseDown(e.button == 1);

        if (unplacedBed) {
            var rect = (e.target as HTMLDivElement).getBoundingClientRect();

            let x = (e.clientX - rect.left) / worldZoom;
            let y = (e.clientY - rect.top) / worldZoom;


            let position: IPosition = { x: unplacedBed.x, y: unplacedBed.y };
            position = { x: (mousePosition.x - worldPosition.x) / worldZoom - unplacedBed.width / 2, y: (mousePosition.y - worldPosition.y) / worldZoom - unplacedBed.height / 2 };


            dispatch(placeSeedBedAction({ id: unplacedBed.id, position }));

        }
    }

    const { browserHeight, browserWidth } = useWindowDimensions();
    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            let newLocalPosDiffX = (e.clientX - worldPosition.x) - mouseStartDiffPosition.diffX;
            let newLocalPosDiffY = (e.clientY - worldPosition.y) - mouseStartDiffPosition.diffY;

            //Check boundaries
            if (worldX > 0 && newLocalPosDiffX > 0)
                newLocalPosDiffX = localWorldPosDiff.x;
            if (worldY > 0 && newLocalPosDiffY > 0)
                newLocalPosDiffY = localWorldPosDiff.y;

            if (browserWidth - worldWidth > worldX)
                newLocalPosDiffX = localWorldPosDiff.x;
            if (browserHeight - worldHeight > worldY)
                newLocalPosDiffY = localWorldPosDiff.y;


            setLocalWorldPosDiff({ x: newLocalPosDiffX, y: newLocalPosDiffY })
        }

        if (unplacedBed) {
            setMousePosition({ x: e.clientX, y: e.clientY });
        }
    }

    const mouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            let newX = e.clientX - mouseStartDiffPosition.diffX;
            let newY = e.clientY - mouseStartDiffPosition.diffY;
            if (newX > 0)
                newX = 0;
            if (newY > 0)
                newY = 0;

            if (browserWidth - worldWidth > newX)
                newX = browserWidth - worldWidth;

            if (browserHeight - worldHeight > newY)
                newY = browserHeight - worldHeight;
            dispatch(moveWorldByMouseAction({ x: newX, y: newY }));
            setLocalWorldPosDiff({ x: 0, y: 0 })
        }
        setIsMouseDown(false);
        setIsMiddleMouseDown(false);
    }

    const cursor = isMovingAppView ? (isMouseDown ? "grabbing" : "grab") : "default";

    return (
        <div css={css`
            background-color: #777b17;
            overflow: hidden;
            width: 100%;
            height: 100%;
            /* position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0; */
            z-index: ${DEPTH.APP_VIEW};
        `}>
            <div ref={viewElement} onDragOver={e => e.preventDefault()} onWheel={zoom} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} css={css`
                background-color: #777b77;
                border: 1px solid green;
                position: relative;
                width: ${worldWidth}px;
                height: ${worldHeight}px;
                left: ${worldX}px;
                top: ${worldY}px;
                cursor: ${cursor};
            `}>
                {seedBeds.map((seedBed, i) => {
                    let position: IPosition = { x: seedBed.x, y: seedBed.y };
                    if (!seedBed.isPlaced) {
                        position = { x: (mousePosition.x - worldPosition.x) / worldZoom - seedBed.width / 2, y: (mousePosition.y - worldPosition.y) / worldZoom - seedBed.height / 2 };
                    }
                    return <SeedBed key={"seed-bed-" + i} {...seedBed} {...position} />
                })}
                <Field x={(browserWidth-menuWidth)/2 - 200 + menuWidth} y={(browserHeight-toolbarHeight)/2 - 250 + toolbarHeight} width={400} height={500} />
                <Scale />
                <MessageBar />
            </div>
        </div>
    )
}

export default AppView;