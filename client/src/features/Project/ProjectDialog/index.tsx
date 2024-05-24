/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { ProjectDialogStates, hideProjectDialogAction } from '../../../store/reducers/GUISlice';
import { useState, useEffect, useCallback } from "react"
import { IDesignSlice, designActions } from '../../../store/reducers/DesignSlice';
import { useAppSelector } from '../../../hooks/useAppSelector';
import DBManager from '../../../helpers/DBManager';
import ModalWindow from '../../../components/UI/ModalWindow';
import ListPanel from '../../../components/UI/ListPanel';
import InputField from '../../../components/UI/InputField';
import Button from '../../../components/UI/Button';
import { projectNameSelector, projectIDSelector, lastModifiedSelector } from '../../../store/reducers/DesignSlice/selectors';

export interface IProjectInfos extends IDesignSlice {
    onClick?: any
}


export interface IProjectDialogProps {
    state: ProjectDialogStates
}
const ProjectDialog: React.FC<IProjectDialogProps> = (props) => {
    const dispatch = useAppDispatch();

    const projectName = useAppSelector(projectNameSelector);
    const projectID = useAppSelector(projectIDSelector);
    const lastModified = useAppSelector(lastModifiedSelector);

    const [projects, setProjects] = useState<Array<IProjectInfos>>([]);

    const header = [{ name: "Název", itemAttributeName: "projectName" }, { name: "Datum vytvoření", itemAttributeName: "createdDataTime" }, { name: "Datum změny", itemAttributeName: "lastModifiedDataTime" }]

    const projectClickedHandler = useCallback((clickedItem: IProjectInfos) => {
        if (clickedItem && clickedItem?.project.projectName?.length) {
            dispatch(hideProjectDialogAction());
            const projectData = DBManager.getProjectByID(clickedItem?.project.projectID);

            dispatch(designActions.setProjectAction(projectData));
        }

    }, [dispatch])

    useEffect(() => {
        //fetch
        const projectsFromDB = DBManager.getProjects() as IProjectInfos[];
        projectsFromDB.forEach((p) => {
            p.onClick = projectClickedHandler;
        })

        setProjects(projectsFromDB);

    }, [projectClickedHandler])


    const saveProject = () => {
        dispatch(designActions.setLMTAction(new Date().getTime()))
        dispatch(hideProjectDialogAction());
    }

    useEffect(() => {
        if (projectID === -1) {
            const projID = DBManager.getUniqueProjectID();
            dispatch(designActions.setProjectIDAction(projID))
        } else {
            DBManager.saveProject();
        }
    }, [lastModified, projectID])

    return (
        <ModalWindow position={{ left: "50%", top: "50%" }} dimension={{
            width: "500px", height
                : "500px"
        }} closeModalHandler={() => dispatch(hideProjectDialogAction())}>
            <ListPanel items={projects} header={header} />
            {props.state === ProjectDialogStates.SAVE_PROJECT && (
                <div css={css`
                    display: flex;
                `}>
                    <InputField value={projectName} placeholder='Název projektu' onChangeHandler={(e) => { dispatch(designActions.setProjectNameAction(e.target.value)) }} />
                    <div css={css`
                        max-width: 70px;
                    `}>
                        <Button text='Uložit' onClick={saveProject} />
                    </div>
                </div>
            )}
        </ModalWindow>
    )
}


export default ProjectDialog;