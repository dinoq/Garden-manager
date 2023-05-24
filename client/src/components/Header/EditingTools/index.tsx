/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { useAppSelector } from '../../../hooks/useAppSelector';


export interface IEditingToolsProps {

}

//nový, uložit, uložit jako, undo/redo, copy/cut/paste, delete
const EditingTools: React.FC<IEditingToolsProps> = (props) => {
    const seedbeds = useAppSelector(state => state.seedBedsReducer.seedBeds);

    return (
        <div aria-label="Editing tools" css={css`
                :before {
                    content: attr(aria-label);
                    font-size: 0.8rem;
                    position: absolute;
                    top: 3px;
                    background-color: #727272;
                    padding: 3px;
                    border-radius: 5px
                };
                width: 200px;
                height: 100px;
                background: #969696;
                border-radius: 10px;
                margin: 15px;
                padding: 15px;

            `}>
            <button onClick={(e) => {
            }} css={css`
                background: url("./imgs/new.png");
                width: 32px;
                height: 32px;
                background-size: contain;
                border: 0;
                `}></button>
            <button onClick={(e) => {
            }} css={css`
                background: url("./imgs/open.png");
                width: 32px;
                height: 32px;
                background-size: contain;
                border: 0;
                `}></button>
            <button onClick={(e) => {
                console.log(JSON.stringify(seedbeds))
            }} css={css`
                background: url("./imgs/save.png");
                width: 32px;
                height: 32px;
                background-size: contain;
                border: 0;
                `}></button>

        </div>
    )
}

export default EditingTools;