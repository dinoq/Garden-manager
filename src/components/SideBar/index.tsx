/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { IPlant } from '../../helpers/plant-types';
import { useAppDispatch } from '../../hooks';
import { setIsPuttingSeedBedOfTypeAction } from '../../store/reducers/ViewNavigationSlice';
import { getPlantByName, getPlantsByPartName } from './plants';

const SideBar: React.FC<{}> = () => {
    const dispatch = useAppDispatch();

    const [inputSearch, setInputSearch] = useState("")
    const [plants, setPlants] = useState<Array<IPlant>>([])

    useEffect(() => {
        setPlants(getPlantsByPartName(inputSearch));
    }, [])
    
    const searchPlant = () => {
        setPlants(getPlantsByPartName(inputSearch));
    }

    const setIsPuttingSeedBedOfType = (e: React.MouseEvent<HTMLLIElement>)=>{
        let plantName = (e.target as HTMLLIElement)?.textContent;
        if(plantName != undefined && plantName.length > 0)
            dispatch(setIsPuttingSeedBedOfTypeAction(getPlantByName(plantName)));
    }
    return (
        <div css={css`
            height: 100%;
            width: 250px;
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
                    `}>
                        {plants.map((plant, i) => {
                            return <li key={"plant-" + i} draggable="true" onClick={setIsPuttingSeedBedOfType} css={css`
                                cursor: pointer;
                                padding: 15px;
                                background-color: #626262;
                                color: white;
                                text-align: center;
                                border-radius: 10px;
                                user-select: none;
                            `}>{plant.name}</li>
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}


export default SideBar;