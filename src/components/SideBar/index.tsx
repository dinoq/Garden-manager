/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';

const SideBar: React.FC<{}> = () => {
    const plants = [
        "ASD", "FGHJ"
    ]
    const [inputSearch, setInputSearch] = useState("")
    const searchPlant = () => {
        console.log('inputSearch: ', inputSearch);
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
                <input value={inputSearch} onKeyUp={searchPlant} onChange={(e)=>setInputSearch((e.target as HTMLInputElement).value)} placeholder={"..."} css={css`                
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
            <nav>
            </nav>
        </div>
    )
}


export default SideBar;