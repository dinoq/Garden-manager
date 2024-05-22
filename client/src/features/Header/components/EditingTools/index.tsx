/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { setShowProjectDialogAction } from '../../../../store/reducers/GUISlice';
import DBManager from '../../../../helpers/DBManager';
import { appActions } from '../../../../store/reducers/AppSlice';
import LabeledCard from '../../../../components/UI/LabeledCard';
import { useEffect } from 'react';
import { lastModifiedSelector, projectIDSelector } from '../../../Project/selectors';


export interface IEditingToolsProps {

}

//nový, uložit, uložit jako, undo/redo, copy/cut/paste, delete
const EditingTools: React.FC<IEditingToolsProps> = (props) => {
    const dispatch = useAppDispatch();
    const lastModified = useAppSelector(lastModifiedSelector);
    const projectID = useAppSelector(projectIDSelector);

    const saveProject = () => {
        if (projectID === -1) {
            dispatch(setShowProjectDialogAction(true))
        } else {
            const lastModified = new Date().getTime();
            dispatch(appActions.setLMTAction(lastModified))
        }
    }

    useEffect(() => {
        DBManager.saveProject();
    }, [lastModified])
    
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
                <button onClick={saveProject} css={css`
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