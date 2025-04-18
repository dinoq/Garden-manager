/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { IPlant } from '../../helpers/plant-types';
import { designActions } from '../../store/reducers/DesignSlice';
import SearchList from './SearchList';
import { IAppObject } from '../../helpers/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { DEPTH } from "../../helpers/constants";
import usePlantsFromDB from '../../hooks/usePlantsFromDB';
import { getArrEntryByIDAndIDName } from '../../helpers/functions';
import InputField from '../../components/UI/InputField';
import SearchFilter from './components/SearchFilter';
import { menuWidthSelector, toolbarHeightSelector, tabBarHeightSelector } from '../../store/reducers/GUISlice/selectors';
import { worldPositionSelector } from '../../store/reducers/ViewNavigationSlice/selectors';

enum SEARCH_TYPE {
    PLANTS,
    OBJECTS,
}
const SideBar: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const menuWidth = useAppSelector(menuWidthSelector);
    const toolbarHeight = useAppSelector(toolbarHeightSelector);
    const tabBarHeight = useAppSelector(tabBarHeightSelector);

    const [inputSearch, setInputSearch] = useState("")
    const [showFilter, setShowFilter] = useState(true);
    const [searchType, setSearchType] = useState<SEARCH_TYPE>(SEARCH_TYPE.PLANTS);
    //const [plants, setPlants] = useState<Array<IPlant>>([])
    const [objects] = useState<Array<IAppObject>>([])
    const worldPos = useAppSelector(worldPositionSelector);
    //const [plantsFromDB, setPlantsFromDB] = useState<IPlant[]>([]);
    const [actualPlantList, setActualPlantList] = useState<IPlant[]>([]);


    useEffect(() => {
        if (showFilter) {

        } else {

        }
    }, [showFilter])

    const plantsFromDB = usePlantsFromDB();
    useEffect(() => {
        if (!plantsFromDB)
            return;
        //setPlantsFromDB([...plantsFromDB]);
        setActualPlantList([...plantsFromDB]);
    }, [plantsFromDB])

    const getPlantsByPartName = (partName: string): Array<IPlant> => {
        if (partName === undefined || partName.length === 0)
            return plantsFromDB.sort((a: any, b: any) => (a.name > b.name ? -1 : 1))

        partName = partName.toLocaleLowerCase();
        const searchedPlants: Array<IPlant> = plantsFromDB.filter((plant: any) => { return plant.name.toLocaleLowerCase().includes(partName) }); //"exact" match first
        plantsFromDB.forEach((plant: any) => {
            let chars = [...new Set(partName)];
            if (chars.every(char => plant.name.toLocaleLowerCase().includes(char)) && !searchedPlants.includes(plant)) {
                searchedPlants.push(plant);
            }
        })
        return searchedPlants;
    }

    const searchPlant = () => {
        let plants = getPlantsByPartName(inputSearch);
        setActualPlantList([...plants]);
    }

    const getFilterToggleBtn = (label: string) => {
        return (
            <div onClick={() => { setShowFilter((prevState) => { return !prevState; }) }} css={css`
                background-color: #8a9e9e;
                `}>
                {label}
            </div>
        )
    }

    const setNewUplacedPlantSection = (e: React.MouseEvent<HTMLLIElement>) => {
        const plant = getArrEntryByIDAndIDName("id", e.currentTarget.id, actualPlantList);
        if (plant) {
            dispatch(designActions.createNewPlantSectionAction({ position: { x: e.clientX - worldPos.x, y: e.clientY - worldPos.y - toolbarHeight - tabBarHeight }, plant }))
        }
    }

    return (
        <div css={css`
        z-index: ${DEPTH.SIDEBAR};
        height: calc(100vh - ${toolbarHeight}px - ${tabBarHeight}px);
        width: ${menuWidth}px;
        position: absolute;
        left: 0;
    `}>

            <div css={css`
            height: 100%;
            padding: 10px;
            background-color: #393946;
            display: flex;
            flex-direction: column;
        `}>

                <div>
                    <InputField value={inputSearch} onKeyUpHandler={searchPlant} onChangeHandler={(e: any) => setInputSearch((e.target as HTMLInputElement).value)} placeholder={"..."} type="search" name="search-plant" id="search-plant" />
                    {showFilter && getFilterToggleBtn("Zrušit a skrýt filtr")}
                    {!showFilter && getFilterToggleBtn("Zobrazit filtr")}
                    {showFilter && <SearchFilter selectionChanged={(index: number) => { setSearchType(index) }} />}
                </div>
                <div css={css`
                    overflow: hidden;
                    `}>
                    {searchType === SEARCH_TYPE.PLANTS && actualPlantList !== undefined && actualPlantList.length > 0 &&
                        <SearchList items={searchType === SEARCH_TYPE.PLANTS ? actualPlantList : objects} setNewUplacedPlantSection={setNewUplacedPlantSection} />
                    }
                </div>
            </div>
        </div>
    )
}


export default SideBar;