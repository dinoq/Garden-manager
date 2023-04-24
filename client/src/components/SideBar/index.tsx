/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { IPlant } from '../../helpers/plant-types';
import { createNewSeedBedAction } from '../../store/reducers/SeedBedsSlice';
import { setMouseDownPosition } from '../../store/reducers/ViewNavigationSlice';
import SearchFilter from './SearchFilter';
import SearchList from './SearchList';
import { IAppObject } from '../../helpers/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useDB from '../../hooks/useDB';
import { DEPTH } from "../../helpers/constants";
import { processPlants } from '../../helpers/functions';
import InputField from '../GUI/InputField';
import usePlantsFromDB from '../../hooks/usePlantsFromDB';

enum SEARCH_TYPE{
    PLANTS,
    OBJECTS,
}
const SideBar: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    const menuWidth = useAppSelector(state => state.guiReducer.menuWidth);
    const toolbarHeight = useAppSelector(state => state.guiReducer.toolbarHeight);
    const [inputSearch, setInputSearch] = useState("")
    const [showFilter, setShowFilter] = useState(true);
    const [searchType, setSearchType] = useState<SEARCH_TYPE>(SEARCH_TYPE.PLANTS);
    //const [plants, setPlants] = useState<Array<IPlant>>([])
    const [objects, setObject] = useState<Array<IAppObject>>([])
    const worldPos = useAppSelector(selector => selector.navigationReducer.position);
    //const [plantsFromDB, setPlantsFromDB] = useState<IPlant[]>([]);
    const [actualPlantList, setActualPlantList] = useState<IPlant[]>([]);

    useEffect(() => {
        if (showFilter) {

        } else {

        }
    }, [showFilter])
    
    const plantsFromDB = usePlantsFromDB();
    useEffect(()=>{
        if(!plantsFromDB)
            return;
        //setPlantsFromDB([...plantsFromDB]);
        console.log('processedPlantsFromDB____ NOT IT: ', plantsFromDB);
        setActualPlantList([...plantsFromDB]);
        console.log('plantList: ', actualPlantList);
    }, [plantsFromDB])
    

    const getPlantByName = async (name: string): Promise<IPlant | undefined> => {
        return actualPlantList? actualPlantList.find((plant:any) => plant.name == name) : undefined;
    }
    
    
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
        let plants =  getPlantsByPartName(inputSearch);        
        setActualPlantList([...plants]);
    }
    console.log('plants33: ', actualPlantList);

    const getFilterToggleBtn = (label: string) => {
        return (
            <div onClick={() => { setShowFilter((prevState) => { return !prevState; }) }} css={css`
                background-color: red;
                `}>
                {label}
            </div>
        )
    }

    const setNewUplacedSeedBed = (e: React.MouseEvent<HTMLLIElement>) => {
        let plantName = (e.target as HTMLLIElement)?.textContent;
        if (plantName != undefined && plantName.length > 0)
            getPlantByName(plantName).then(plant => {
                console.log('plant: ', plant);
                dispatch(setMouseDownPosition({ x: e.clientX, y: e.clientY }));
                if (plant) {
                    dispatch(createNewSeedBedAction({ position: { x: e.clientX - worldPos.x, y: e.clientY - toolbarHeight }, plant }))
                }
            })
    }


    return (
        <div css={css`
        z-index: ${DEPTH.SIDEBAR};
        height: calc(100vh - ${toolbarHeight}px);
        width: ${menuWidth}px;
        position: absolute;
        left: 0;
    `}>

            <div css={css`
            //width: ${menuWidth}px;
            height: 100%;
            padding: 10px;
            background-color: #393946;
            //padding: 32px;
            display: flex;
            flex-direction: column;
        `}>

                <div>
                <InputField value={inputSearch} onKeyUpHandler={searchPlant} onChangeHandler={(e:any) => setInputSearch((e.target as HTMLInputElement).value)} placeholder={"..."} type="search" name="search-plant" id="search-plant"/>
                    {showFilter && getFilterToggleBtn("Zrušit a skrýt filtr")}
                    {!showFilter && getFilterToggleBtn("Zobrazit filtr")}
                    {showFilter && <SearchFilter selectionChanged={(index: number)=>{setSearchType(index)}} />}
                </div>
                <div css={css`
                    overflow: hidden;
                    `}>
                    {searchType === SEARCH_TYPE.PLANTS && actualPlantList !== undefined && actualPlantList.length > 0 &&
                        <SearchList items={searchType === SEARCH_TYPE.PLANTS? actualPlantList : objects} setNewUplacedSeedBed={setNewUplacedSeedBed} />
                    }
                </div>
            </div>
        </div>
    )
}


export default SideBar;