/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { IPosition, ISeedBed } from "../../helpers/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import useLocalCoordinates from "../../hooks/useLocalCoordinates";
import { placeSeedBedAction } from "../../store/reducers/SeedBedsSlice";
import { setIsMovingAppViewAction, zoomAction } from "../../store/reducers/ViewNavigationSlice";
import MemoFieldEditDialog from "./FieldEditDialog";
import MessageBar from "./MesageBar";
import ProjectDialog from "./ProjectDialog";
import Scale from "./Scale";
import SeedBed from "./SeedBed";
import SideBar from "../SideBar";
import Header from "../Header";


interface IAppViewProps {

}

const AppView: React.FC<IAppViewProps> = (props) => {
    const dispatch = useAppDispatch();

    const viewElement = useRef<HTMLDivElement>(null);

    const worldZoom = useAppSelector(state => state.navigationReducer.zoom);
    const worldPosition = useAppSelector(state => state.navigationReducer.position);
    const isMovingAppView = useAppSelector(state => state.navigationReducer.isMovingAppView);
    const seedBeds = useAppSelector(state => state.seedBedsReducer.seedBeds);
    const selectedSeedBed = useAppSelector(state => state.seedBedsReducer.selectedSeedBed);
    const menuWidth = useAppSelector(state => state.guiReducer.menuWidth);
    const showProjectDialog = useAppSelector(state => state.guiReducer.ProjectDialog.show);
    const projectDialogState = useAppSelector(state => state.guiReducer.ProjectDialog.state);
    const toolbarHeight = useAppSelector(state => state.guiReducer.toolbarHeight);
    const tabBarHeight = useAppSelector(state => state.guiReducer.tabBarHeight);
    const worldWidth = useAppSelector(state => state.navigationReducer.worldWidth) * worldZoom;
    const worldHeight = useAppSelector(state => state.navigationReducer.worldHeight) * worldZoom;
    const hideGUI = useAppSelector(state => state.guiReducer.hideGUI);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
    const [mouseAppViewPosition, setMouseAppViewPosition] = useState<IPosition>({ x: 0, y: 0 })


    const { pos: worldPos, updateLocal, updateGlobal, setMouseStartDiffPosition } = useLocalCoordinates(state => state.navigationReducer.position);

    const movingByWorld = (isMouseDown && isMovingAppView) || isMiddleMouseDown;
    const cursor = isMovingAppView ? (isMouseDown ? "grabbing" : "grab") : "default";
    const unplacedBed = seedBeds.find(seedBed => !seedBed.isPlaced);

    const zoom = (e: any) => dispatch(zoomAction({ zoomDirection: e.deltaY || 0, menuWidth }))


    useEffect(() => {
        if (unplacedBed) {
            setMouseAppViewPosition({ x: unplacedBed.x, y: unplacedBed.y });
        }
    }, [unplacedBed])

    useEffect(() => {
        console.log('seedBedseff: ', seedBeds);
    }, [seedBeds])

    /*
    const autoSave = setInterval(()=>{
        consoleWarn("autosave off");
        //DBManager.saveProject(seedBedsReducer);
        //dispatch(setMessage("autosave..."))
        setTimeout(()=>dispatch(setMessage("")), 5*1000)
    }, 60*1000)*/

    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - worldPosition.x, diffY: e.clientY - worldPosition.y })
        setIsMouseDown(true);
        setIsMiddleMouseDown(e.button === 1);

        if (unplacedBed) {
            let position: IPosition = { x: mouseAppViewPosition.x - unplacedBed.width / 2, y: mouseAppViewPosition.y - unplacedBed.height / 2 };

            dispatch(placeSeedBedAction({ id: unplacedBed.id, position }));
            setMouseAppViewPosition({ x: 0, y: 0 });
        }
    }

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            updateLocal(e)
        }

        if (unplacedBed) {
            setMouseAppViewPosition({ x: ((e.clientX - worldPosition.x) / worldZoom), y: (((e.clientY - worldPosition.y) - toolbarHeight - tabBarHeight) / worldZoom) });
        }
    }

    const mouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            updateGlobal(e)
        }
        setIsMouseDown(false);
        setIsMiddleMouseDown(false);
    }


    seedBeds.map((seedBed, i) => {
        let position: IPosition = { x: seedBed.x, y: seedBed.y };
        if (!seedBed.isPlaced) {
            position = { x: mouseAppViewPosition.x - seedBed.width / 2, y: mouseAppViewPosition.y - seedBed.height / 2 };
        }
        return <SeedBed key={"seed-bed-" + i} {...seedBed} {...position} />
    })


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch(setIsMovingAppViewAction(false));
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [dispatch]);
    
    return (
        <React.Fragment>
            <div css={css`
                height: ${toolbarHeight}px;
                width: 100vw;
                background-color: #00182e;
            `}>
                <Header />
            </div>
            <div css={css`
                width: 100vw;
            `} onMouseMove={mouseMove}>
                {<SideBar />}
                <div css={css`
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    left: 0;
                    top: 0;
                `}>
                    <div ref={viewElement} onDragOver={e => e.preventDefault()} onWheel={zoom} onMouseDown={mouseDown} onMouseUp={mouseUp} css={css`
                        position: relative;
                        width: ${worldWidth}px;
                        height: ${worldHeight}px;
                        left: ${worldPos.x}px;
                        top: ${worldPos.y}px;
                        cursor: ${cursor};
                    `}>
                        {<MemoSeedBeds beds={seedBeds} mouseAppViewPosition={mouseAppViewPosition} />}
                        {!hideGUI && <Scale />}
                        <MessageBar />
                        {selectedSeedBed !== -1 && <MemoFieldEditDialog />}
                        {showProjectDialog && <ProjectDialog state={projectDialogState} />}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}


const seedBeds: React.FunctionComponent<{ beds: ISeedBed[], mouseAppViewPosition: IPosition }> = ({ beds, mouseAppViewPosition }) => {
    return (
        <React.Fragment>
            {beds.map((seedBed, i) => {
                let position: IPosition = { x: seedBed.x, y: seedBed.y };
                if (!seedBed.isPlaced) {
                    position = { x: mouseAppViewPosition.x - seedBed.width / 2, y: mouseAppViewPosition.y - seedBed.height / 2 };
                }
                return <SeedBed key={"seed-bed-" + i} {...seedBed} {...position} />
            })}
        </ React.Fragment>
    )
}


const MemoSeedBeds = React.memo(seedBeds);
export default AppView;
