/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { IPlant } from '../../helpers/plant-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createNewSeedBedAction } from '../../store/reducers/SeedBedsSlice';
import { setMouseDownPosition } from '../../store/reducers/ViewNavigationSlice';
import { getPlantByName, getPlantsByPartName } from './plants';

const SideBar: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    const menuWidth = useAppSelector(state => state.gui.menuWidth);
    const [inputSearch, setInputSearch] = useState("")
    const [plants, setPlants] = useState<Array<IPlant>>([])
    const worldPos = useAppSelector(selector => selector.navigation.position);

    useEffect(() => {
        getPlantsByPartName(inputSearch).then(plants => {
            setPlants(plants);
        })
    }, [])

    const searchPlant = () => {
        getPlantsByPartName(inputSearch).then(plants => {
            setPlants(plants);
        })
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
                    <button css={css`                
                    width: 100%;
                    height: 30px;
                    border-radius: 5px;
                `}
                        type="submit" onClick={searchPlant}>Vyhledat</button>
                </div>
                <div>
                    {plants !== undefined && plants.length > 0 &&
                        <ul css={css`
                            list-style-type: none;
                            padding-left: 0;
                            height: 700px;
                            overflow-y: scroll;
                    `}>
                            {plants.map((plant, i) => {
                                return <li key={"plant-" + i} draggable="true" onClick={setNewUplacedSeedBed} css={css`
                                cursor: pointer;
                                padding: 15px;
                                background-color: #626262;
                                //color: white;
                                color: rgba(255, 255, 255, 0.041);
                                text-align: center;
                                border-radius: 10px;
                                user-select: none;
                            `}>{plant.name/*.substring(0,1)*/}</li>
                            })}
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}


export default SideBar;