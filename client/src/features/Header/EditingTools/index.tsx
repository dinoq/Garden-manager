/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setShowProjectDialogAction } from '../../../store/reducers/GUISlice';
import DBManager from '../../../helpers/DBManager';
import { setLMTAction } from '../../../store/reducers/SeedBedsSlice';
import LabeledCard from '../../GUI/LabeledCard';


export interface IEditingToolsProps {

}

//nový, uložit, uložit jako, undo/redo, copy/cut/paste, delete
const EditingTools: React.FC<IEditingToolsProps> = (props) => {
    const dispatch = useAppDispatch();
    const seedBedsReducer = useAppSelector(state => state.seedBedsReducer);


    return (
        <LabeledCard label="Editing tools" >
            <div css={css`                
                button {
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
                <button onClick={(e) => {
                    dispatch(setShowProjectDialogAction(false))
                }} css={css`
                background: url("./imgs/open.png");
                `}></button>
                <button onClick={(e) => {
                    if (seedBedsReducer.projectID === -1) {
                        dispatch(setShowProjectDialogAction(true))
                    } else {
                        const lastModified = new Date().getTime();
                        dispatch(setLMTAction(lastModified))
                        DBManager.saveProject({ ...seedBedsReducer, lastModified }); // Dekomposition is used, becauce projectID can change (few lines above) and it is not possible to wait for store change
                    }
                }} css={css`
                background: url("./imgs/save.png");
                `}></button>
                <button onClick={(e) => {
                    dispatch(setShowProjectDialogAction(true))
                }} css={css`
                background: url("./imgs/save-as.png");
                `}></button>
            </div>
        </LabeledCard>
    )
}

export default EditingTools;