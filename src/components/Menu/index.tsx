/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react'
import { useState } from 'react';

const Menu: React.FC<{}> = () => {
    const plants = [
        "ASD", "FGHJ"
    ]
    const [inputSearch, setInputSearch] = useState("")
    const searchPlant = () => {
        console.log('inputSearch: ', inputSearch);
    }



    return (
        <div css={css`
            /*position: absolute;*/
            height: 100%;
            width: 250px;
            background-color: #393946;
            padding: 32px;
        `}>

            <div>
                <input value={inputSearch} onKeyUp={searchPlant} onChange={(e)=>setInputSearch((e.target as HTMLInputElement).value)} placeholder={"Hledaná rostlina"} css={css`                
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


export default Menu;