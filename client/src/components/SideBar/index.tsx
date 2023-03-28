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

enum SEARCH_TYPE{
    PLANTS,
    OBJECTS,
}
const SideBar: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    const menuWidth = useAppSelector(state => state.gui.menuWidth);
    const [inputSearch, setInputSearch] = useState("")
    const [showFilter, setShowFilter] = useState(true);
    const [searchType, setSearchType] = useState<SEARCH_TYPE>(SEARCH_TYPE.PLANTS);
    //const [plants, setPlants] = useState<Array<IPlant>>([])
    const [objects, setObject] = useState<Array<IAppObject>>([])
    const worldPos = useAppSelector(selector => selector.navigation.position);
    const plants = useDB("vegetable");
    /*
    useEffect(() => {
        getPlantsByPartName(inputSearch).then(plants => {
            setPlants(plants);
        })
    }, [])*/

    useEffect(() => {
        if (showFilter) {

        } else {

        }
    }, [showFilter])

    const getPlantByName = async (name: string): Promise<IPlant | undefined> => {
        return plants? plants.find((plant:any) => plant.name == name) : undefined;
    }
    
    
    const getPlantsByPartName = async (partName: string): Promise<Array<IPlant>> => {
        if (partName === undefined || partName.length === 0)
            return plants.sort((a: any, b: any) => (a.name > b.name ? -1 : 1))
    
        partName = partName.toLocaleLowerCase();
        const searchedPlants: Array<IPlant> = plants.filter((plant: any) => { return plant.name.toLocaleLowerCase().includes(partName) }); //"exact" match first
        plants.forEach((plant: any) => {
            let chars = [...new Set(partName)];
            if (chars.every(char => plant.name.toLocaleLowerCase().includes(char)) && !searchedPlants.includes(plant)) {
                searchedPlants.push(plant);
            }
        })
        return searchedPlants;
    }
    
    const searchPlant = () => {
        /*getPlantsByPartName(inputSearch).then(plants => {
            setPlants(plants);
        })*/
    }

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
                    dispatch(createNewSeedBedAction({ position: { x: e.clientX - worldPos.x+menuWidth, y: - worldPos.y }, plant }))
                    console.log('worldPos.x: ', worldPos.x);
                }
            })
    }


    return (
        <div css={css`
        z-index: 100;
        height: 100%;
    `}>

            <div css={css`
            height: 100%;
            //width: ${menuWidth}px;
            padding: 10px;
            background-color: #393946;
            //padding: 32px;
            display: flex;
            flex-direction: column;
            z-index: 100;
        `}>

                <div>
                    <input value={inputSearch} onKeyUp={searchPlant} onChange={(e) => setInputSearch((e.target as HTMLInputElement).value)} placeholder={"..."} css={css`                
                    width: 100%;
                    height: 30px;
                    border-radius: 5px;
                `} type="search" name="search-plant" id="search-plant" />
                    {showFilter && getFilterToggleBtn("Zrušit a skrýt filtr")}
                    {!showFilter && getFilterToggleBtn("Zobrazit filtr")}
                    {showFilter && <SearchFilter selectionChanged={(index: number)=>{setSearchType(index)}} />}
                </div>
                <div css={css`
                    overflow: hidden;
                    `}>
                    {searchType === SEARCH_TYPE.PLANTS && plants !== undefined && plants.length > 0 &&
                        <SearchList items={searchType === SEARCH_TYPE.PLANTS? plants : objects} setNewUplacedSeedBed={setNewUplacedSeedBed} />
                    }
                </div>
            </div>
        </div>
    )
}


export default SideBar;