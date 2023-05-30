/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { showProjectDialog } from '../../../store/reducers/GUISlice';
import DBManager from '../../../helpers/DBManager';
import { setLMT } from '../../../store/reducers/SeedBedsSlice';


export interface IEditingToolsProps {

}

//nový, uložit, uložit jako, undo/redo, copy/cut/paste, delete
const EditingTools: React.FC<IEditingToolsProps> = (props) => {
    const dispatch = useAppDispatch();
    const seedBedsReducer = useAppSelector(state => state.seedBedsReducer);


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

                button{
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    background-size: contain;
                    border: 0;
                }

            `}>
            <button onClick={(e) => {
            }} css={css`
                background: url("./imgs/new.png");
                `}></button>
            <button onClick={(e) => { dispatch(showProjectDialog(false))
            }} css={css`
                background: url("./imgs/open.png");
                `}></button>
            <button onClick={(e) => {
                
                let projectID = seedBedsReducer.projectID;
                if(seedBedsReducer.projectID == -1){
                    dispatch(showProjectDialog(true))
                }else{
                    const lastModified = new Date().getTime();
                    dispatch(setLMT(lastModified))
                    DBManager.saveProject({...seedBedsReducer, lastModified}); // Dekomposition is used, becauce projectID can change (few lines above) and it is not possible to wait for store change
                }
            }} css={css`
                background: url("./imgs/save.png");
                `}></button>
            <button onClick={(e) => {
                dispatch(showProjectDialog(true))
            }} css={css`
                background: url("./imgs/save-as.png");
                `}></button>

        </div>
    )
}

export default EditingTools;