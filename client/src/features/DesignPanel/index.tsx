/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IPosition } from "../../helpers/types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import useLocalCoordinates from "../../hooks/useLocalCoordinates";
import { designActions } from "../../store/reducers/DesignSlice";
import { setIsMovingDesignPanelAction, zoomAction } from "../../store/reducers/ViewNavigationSlice";
import MemoFieldEditDialog from "./components/FieldEditDialog";
import MessageBar from "./components/MesageBar";
import ProjectDialog from "../Project/ProjectDialog";
import Scale from "./components/Scale";
import PlantSection from "./components/PlantSection";
import { plantSectionsSelector, selectedPlantSectionIDSelector } from "../../store/reducers/DesignSlice/selectors";
import { menuWidthSelector, projectDialogShowSelector, projectDialogStateSelector, toolbarHeightSelector, tabBarHeightSelector, hideGUISelector } from "../../store/reducers/GUISlice/selectors";
import { zoomSelector, worldPositionSelector, isMovingDesignPanelSelector, worldWidthSelector, worldHeightSelector } from "../../store/reducers/ViewNavigationSlice/selectors";
import { unplacedPlantSectionSelector } from "./selectors";
import ContextMenu from "../../components/UI/ContextMenu";
import { autosaveEnabledSelector, autosaveFrequencySelector } from "../../store/reducers/SettingsSlice/selectors";
import DBManager from "../../helpers/DBManager";
import { IOption } from "../../components/types";
import useClickOutside from "../../hooks/useClickOutside";
import PlantSections from "./components/PlantSections";


interface IDesignPanelProps {
    mouseMove: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined
}

const DesignPanel: React.FC<IDesignPanelProps> = (props) => {
    const dispatch = useAppDispatch();

    const viewElement = useRef<HTMLDivElement>(null);

    const plantSections = useAppSelector(plantSectionsSelector);
    const selectedPlantSectionID = useAppSelector(selectedPlantSectionIDSelector);

    const worldZoom = useAppSelector(zoomSelector);
    const worldPosition = useAppSelector(worldPositionSelector);
    const isMovingDesignPanel = useAppSelector(isMovingDesignPanelSelector);
    const worldWidth = useAppSelector(worldWidthSelector) * worldZoom;
    const worldHeight = useAppSelector(worldHeightSelector) * worldZoom;

    const menuWidth = useAppSelector(menuWidthSelector);
    const showProjectDialog = useAppSelector(projectDialogShowSelector);
    const projectDialogState = useAppSelector(projectDialogStateSelector);
    const toolbarHeight = useAppSelector(toolbarHeightSelector);
    const tabBarHeight = useAppSelector(tabBarHeightSelector);
    const hideGUI = useAppSelector(hideGUISelector);

    const autosaveEnabled = useAppSelector(autosaveEnabledSelector);
    const autosaveFrequency = useAppSelector(autosaveFrequencySelector);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
    const [designPanelMousePosition, setDesignPanelMousePosition] = useState<IPosition>({ x: 0, y: 0 })
    const [contextMenuPosition, setContextMenuPosition] = useState<IPosition>({ x: -1, y: -1 })
    const [autosaveIntervalTimer, setAutosaveIntervalTimer] = useState<NodeJS.Timer>();
    const [contextMenuItems, setContextMenuItems] = useState<IOption[]>([]);

    const contextMenuRef = useClickOutside((e: MouseEvent) => {
        console.log('e: ', e);
        setContextMenuPosition({ x: -1, y: -1 });
    })

    const { pos: worldPos, updateLocal, updateGlobal, setMouseStartDiffPosition } = useLocalCoordinates(worldPositionSelector);

    const movingByWorld = (isMouseDown && isMovingDesignPanel) || isMiddleMouseDown;
    const cursor = isMovingDesignPanel ? (isMouseDown ? "grabbing" : "grab") : "default";
    const unplacedBed = useAppSelector(unplacedPlantSectionSelector)
    const isContextMenuVisible = contextMenuPosition.x !== -1;

    const zoom = (e: any) => dispatch(zoomAction({ zoomDirection: e.deltaY || 0, menuWidth }))
    
    const [skipNextPlantSectionsRotation, setSkipNextPlantSectionsRotation] = useState(false); // Because after click is firstly new plant section placed so we use this helper state - without that would be plantSections rotate z-Index even when new plant section is placed (so it will automatically be put below other plant section)

    useEffect(() => {
        if (unplacedBed) {
            setDesignPanelMousePosition({ x: unplacedBed.x, y: unplacedBed.y });
        }
    }, [unplacedBed])
    
    useEffect(() => {
        if (props.mouseMove) {
            mouseMove(props.mouseMove);
        }
    }, [props.mouseMove])
    

    useEffect(() => {
        if (autosaveEnabled) {
            const intervalTimer = setInterval(() => {
                DBManager.saveProject();
            }, autosaveFrequency * 1000)
            setAutosaveIntervalTimer(intervalTimer)
        }

        return () => {
            if (autosaveIntervalTimer) {
                clearInterval(autosaveIntervalTimer);
            }
        }
    }, [autosaveEnabled, autosaveFrequency])


    const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseStartDiffPosition({ diffX: e.clientX - worldPosition.x, diffY: e.clientY - worldPosition.y })
        setIsMouseDown(true);
        setIsMiddleMouseDown(e.button === 1);

        if (unplacedBed) {
            setSkipNextPlantSectionsRotation(true);
            let position: IPosition = { x: designPanelMousePosition.x - unplacedBed.width / 2, y: designPanelMousePosition.y - unplacedBed.height / 2 };

            dispatch(designActions.placePlantSectionAction({ id: unplacedBed.id, position }));
            setDesignPanelMousePosition({ x: 0, y: 0 });
        }
    }

    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            updateLocal(e)
        }

        if (unplacedBed) {
            setDesignPanelMousePosition({ x: ((e.clientX - worldPosition.x) / worldZoom), y: (((e.clientY - worldPosition.y) - toolbarHeight - tabBarHeight) / worldZoom) });
        }
    }

    const mouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (movingByWorld) {
            updateGlobal(e)
        }
        setIsMouseDown(false);
        setIsMiddleMouseDown(false);
    }


    plantSections.map((plantSection, i) => {
        let position: IPosition = { x: plantSection.x, y: plantSection.y };
        if (!plantSection.isPlaced) {
            position = { x: designPanelMousePosition.x - plantSection.width / 2, y: designPanelMousePosition.y - plantSection.height / 2 };
        }
        return <PlantSection key={"seed-bed-" + i} {...plantSection} {...position} />
    })


    useEffect(() => { // Todo create custom hook useKeyDown? like useClickOutside
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch(setIsMovingDesignPanelAction(false));
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [dispatch]);

    const isPlantSectionElement = (element: Element) => element instanceof HTMLDivElement && element.hasAttribute('data-plant-section-id') && element.hasAttribute('data-z-index') && element.getAttribute('data-plant-section-id') !== null;

    const rotatePlantSectionsZIndexes = (e: React.MouseEvent<HTMLDivElement>) => {
        if (skipNextPlantSectionsRotation) {
            setSkipNextPlantSectionsRotation(false);
        } else {
            if(e.button === 0 || e.button === 2){
                const elements = document.elementsFromPoint(e.clientX, e.clientY);
                const plantSectionsToRotateDepthIDs: number[] = [];
                elements.forEach((element) => {
                    if (isPlantSectionElement(element)) {
                        const plantSectionID = element.getAttribute('data-plant-section-id');
                        if (plantSectionID !== null) {
                            plantSectionsToRotateDepthIDs.push(parseInt(plantSectionID));
                        }
                    }
                });
                if (e.type === 'click' && e.button === 0 && selectedPlantSectionID !== -1 && !isContextMenuVisible) {  // Event is click & was right clicked & actually already is selected plant section (so we need toggle for any other) & context menu is not visible -> rotate plant sections depth  
                    dispatch(designActions.rotatePlantSectionsDepth(plantSectionsToRotateDepthIDs));
                } else if (e.type === 'contextmenu' && e.button === 2) {
                    e.preventDefault(); // Prevent the context menu from appearing
                    setContextMenuPosition({x: e.clientX, y: e.clientY - toolbarHeight - tabBarHeight}); // ContextMEnu is common ui component, so we need to correct y (by  - toolbarHeight - tabBarHeight) here
                    setContextMenuItems(plantSectionsToRotateDepthIDs.map(plantSectionID => ({name: plantSections[plantSectionID].name, value: plantSectionID})))
                }
            }
        }
    }

    const onDesignPanelContextMenuItemClicked = useCallback((selectedItem: IOption) => {
        const selectedPlantSection = plantSections[selectedItem.value];
        const plantSectionsInContextMenu = contextMenuItems.map(item => plantSections[item.value]);
        let maxZIndexItem = plantSectionsInContextMenu.reduce((max, plantSection) => max.zIndex > plantSection.zIndex ? max : plantSection);
        if (maxZIndexItem !== selectedPlantSection) {
            const plantSectionsToRotateDepth = [maxZIndexItem.id, selectedPlantSection.id];
            dispatch(designActions.rotatePlantSectionsDepth(plantSectionsToRotateDepth));
        }
        setContextMenuPosition({ x: -1, y: -1 });
    }, [plantSections, contextMenuItems, dispatch])
    
    return (
        <div ref={viewElement} onClick={rotatePlantSectionsZIndexes} onContextMenu={rotatePlantSectionsZIndexes} onDragOver={e => e.preventDefault()} onWheel={zoom} onMouseDown={mouseDown} onMouseUp={mouseUp} css={css`
            position: relative;
            width: ${worldWidth}px;
            height: ${worldHeight}px;
            left: ${worldPos.x}px;
            top: ${worldPos.y}px;
            cursor: ${cursor};
        `}>
            {<PlantSections sections={plantSections} mouseDesignPanelPosition={designPanelMousePosition} />}
            {!hideGUI && <Scale />}
            <MessageBar />
            {selectedPlantSectionID !== -1 && <MemoFieldEditDialog />}
            {isContextMenuVisible && <ContextMenu ref={contextMenuRef} position={contextMenuPosition} name="object-selection-context-menu" items={contextMenuItems} onItemClickHandler={onDesignPanelContextMenuItemClicked} />}
            {showProjectDialog && <ProjectDialog state={projectDialogState} />}
        </div>
    )
}

export default DesignPanel;
