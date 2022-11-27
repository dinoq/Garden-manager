/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { IPlant } from '../../helpers/plant-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createNewSeedBedAction } from '../../store/reducers/SeedBedsSlice';
import { setMouseDownPosition } from '../../store/reducers/ViewNavigationSlice';
import SearchFilter from './SearchFilter';
import { getPlantByName, getPlantsByPartName } from './plants';
import SearchList from './SearchList';
import { IAppObject } from '../../helpers/types';

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
    const [plants, setPlants] = useState<Array<IPlant>>([])
    const [objects, setObject] = useState<Array<IAppObject>>([])
    const worldPos = useAppSelector(selector => selector.navigation.position);

    useEffect(() => {
        getPlantsByPartName(inputSearch).then(plants => {
            setPlants(plants);
        })
    }, [])

    useEffect(() => {
        if (showFilter) {

        } else {

        }
    }, [showFilter])

    const searchPlant = () => {
        getPlantsByPartName(inputSearch).then(plants => {
            setPlants(plants);
        })
    }

    const getFilterToggleBtn = (label: string) => {
        console.log("AAAAAAAA");
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
                    dispatch(createNewSeedBedAction({ position: { x: e.clientX - worldPos.x, y: - worldPos.y }, plant }))
                    console.log('worldPos.x: ', worldPos.x);
                }
            })
    }


    return (
        <div css={css`
        z-index: 100;
    `}>

            <div css={css`
            height: 100%;
            width: ${menuWidth}px;
            background-color: #393946;
            padding: 32px;
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
                <div>
                    {searchType === SEARCH_TYPE.PLANTS && plants !== undefined && plants.length > 0 &&
                        <SearchList items={searchType === SEARCH_TYPE.PLANTS? plants : objects} setNewUplacedSeedBed={setNewUplacedSeedBed} />
                    }
                </div>
            </div>
        </div>
    )
}


export default SideBar;